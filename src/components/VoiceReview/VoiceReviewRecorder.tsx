"use client";
import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Square, Loader2 } from "lucide-react";

interface VoiceReviewRecorderProps {
  placeId: string;
  token: string;
  onReviewExtracted: (
    review: ExtractedReview,
    transcription: string,
    confidence: ConfidenceInfo
  ) => void;
  onError: (message: string) => void;
}

export interface ExtractedReview {
  steps?: number | null;
  hasPermanentRamp?: boolean | null;
  hasPortableRamp?: boolean | null;
  hasWideEntrance?: boolean | null;
  hasSecondEntry?: boolean | null;
  multipleFloors?: boolean | null;
  hasAccessibleElevator?: boolean | null;
  hasWellLit?: boolean | null;
  brightLightTitle?: boolean | null;
  hasWashroom?: boolean | null;
  hasSupportAroundToilet?: boolean | null;
  hasLoweredSinks?: boolean | null;
  hasParking?: boolean | null;
  hasWheelchairParking?: boolean | null;
  comments?: string;
  [key: string]: boolean | number | string | null | undefined;
}

export interface ConfidenceInfo {
  fieldsExtracted: number;
  totalFields: number;
}

const VoiceReviewRecorder: React.FC<VoiceReviewRecorderProps> = ({
  placeId,
  token,
  onReviewExtracted,
  onError,
}) => {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const recordingTimeRef = useRef<number>(0); // Track recording time in ref to avoid stale closure

  const MAX_RECORDING_TIME = 120; // 2 minutes

  // Visualize audio levels
  const visualizeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average / 255);

    animationRef.current = requestAnimationFrame(visualizeAudio);
  }, []);

  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Set up audio analyser for visualization
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Determine supported MIME type
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/ogg";

      // Create MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleRecordingComplete;

      // Start recording
      mediaRecorderRef.current.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimeRef.current = 0;

      // Start timer
      timerRef.current = setInterval(() => {
        recordingTimeRef.current += 1;
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Start visualization
      visualizeAudio();
    } catch (err: any) {
      console.error("Failed to start recording:", err);
      if (err.name === "NotAllowedError") {
        onError(
          t("voiceReview.errors.microphoneNotAllowed") ||
            "Microphone access is required. Please enable it in your browser settings."
        );
      } else if (err.name === "NotFoundError") {
        onError(
          t("voiceReview.errors.microphoneNotFound") ||
            "No microphone found. Please connect a microphone and try again."
        );
      } else {
        onError(
          t("voiceReview.errors.recordingFailed") ||
            "Failed to start recording. Please try again."
        );
      }
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Stop visualization
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsRecording(false);
    setAudioLevel(0);
  };

  const handleRecordingComplete = async () => {
    if (audioChunksRef.current.length === 0) {
      onError(
        t("voiceReview.errors.noAudio") || "No audio recorded. Please try again."
      );
      return;
    }

    const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

    // Check if recording is too short (less than 5 seconds minimum)
    // Use ref value to avoid stale closure issue
    if (recordingTimeRef.current < 5) {
      onError(
        t("voiceReview.errors.tooShort") ||
          "Recording is too short. Please record at least 5 seconds describing the accessibility features."
      );
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      const extension = mimeType.includes("webm")
        ? "webm"
        : mimeType.includes("mp4")
        ? "m4a"
        : "ogg";
      formData.append("audio", audioBlob, `voice-review.${extension}`);
      formData.append("placeId", placeId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/voice-to-review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        onReviewExtracted(
          result.extractedReview,
          result.transcription,
          result.confidence
        );
      } else {
        throw new Error(result.error || "Failed to process recording");
      }
    } catch (err: any) {
      console.error("Failed to process recording:", err);
      onError(
        err.message ||
          t("voiceReview.errors.processingFailed") ||
          "Failed to process your voice review. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-gray-50 rounded-xl p-6 border-2 border-dashed transition-all ${
        isRecording ? "bg-red-50 border-red-400" : "border-gray-300"
      }`}
      role="region"
      aria-label="Voice Review Recorder"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Recording visualization */}
        {isRecording && (
          <div
            className="w-full h-10 flex items-center justify-center gap-1"
            aria-hidden="true"
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-red-500 to-red-300 rounded transition-transform"
                style={{
                  height: "100%",
                  transform: `scaleY(${
                    0.3 + audioLevel * Math.random() * 0.7
                  })`,
                }}
              />
            ))}
          </div>
        )}

        {/* Main button */}
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`flex items-center justify-center gap-3 min-w-[200px] min-h-[56px] px-8 py-4 text-base font-semibold text-white rounded-full cursor-pointer transition-all shadow-lg ${
            isProcessing
              ? "bg-gray-500 cursor-not-allowed"
              : isRecording
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
          }`}
          aria-label={
            isProcessing
              ? "Processing your recording"
              : isRecording
              ? "Stop recording"
              : "Start voice review recording"
          }
          aria-pressed={isRecording}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t("voiceReview.processing") || "Processing..."}</span>
            </>
          ) : isRecording ? (
            <>
              <Square className="w-5 h-5 fill-white" />
              <span>{t("voiceReview.stopRecording") || "Stop Recording"}</span>
            </>
          ) : (
            <>
              <Mic className="w-6 h-6" />
              <span>
                {t("voiceReview.startRecording") || "Record Voice Review"}
              </span>
            </>
          )}
        </button>

        {/* Timer */}
        {isRecording && (
          <div
            className="flex items-baseline gap-1 font-mono"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-2xl font-bold text-red-500">
              {formatTime(recordingTime)}
            </span>
            <span className="text-sm text-gray-500">
              / {formatTime(MAX_RECORDING_TIME)}
            </span>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center max-w-md">
          {isRecording ? (
            <p className="text-sm text-gray-600" aria-live="polite">
              <strong className="text-gray-900">
                {t("voiceReview.recordingInProgress") || "Recording..."}
              </strong>{" "}
              {t("voiceReview.recordingInstructions") ||
                "Describe the accessibility features like entrance, ramps, elevator, bathroom, parking, etc."}
            </p>
          ) : isProcessing ? (
            <p className="text-sm text-gray-600" aria-live="polite">
              <strong className="text-gray-900">
                {t("voiceReview.processingTitle") || "Processing..."}
              </strong>{" "}
              {t("voiceReview.processingDescription") ||
                "We're transcribing your recording and extracting accessibility information."}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              {t("voiceReview.instructions") ||
                "Tap the button and describe the accessibility of this location. Mention entrance, ramps, steps, bathroom, elevator, parking, and any other features."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceReviewRecorder;
