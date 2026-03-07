"use client";

import { Target, Users } from "lucide-react";
import { useEventDetailsQuery } from "@/Services/modules/mapathon";

interface EventDetailsData {
  reviewsAmount?: number;
  reviewsGoal?: number;
  participantsGoal?: number;
  participants?: Array<{ id: string }>;
}

interface MapathonEventProgressProps {
  mapathonId: string;
  initialReviewsAmount: number;
  initialReviewsGoal: number;
  initialParticipantsCount: number;
  initialParticipantsGoal: number;
}

export default function MapathonEventProgress({
  mapathonId,
  initialReviewsAmount,
  initialReviewsGoal,
  initialParticipantsCount,
  initialParticipantsGoal,
}: MapathonEventProgressProps) {
  const { data } = useEventDetailsQuery(mapathonId, {
    pollingInterval: 30000, // Poll every 30 seconds as a fallback
  });

  const eventDetails = data as EventDetailsData | undefined;

  // Use live data from RTK Query if available, otherwise fall back to server-provided initial values
  const reviewsAmount = eventDetails?.reviewsAmount ?? initialReviewsAmount;
  const reviewsGoal = eventDetails?.reviewsGoal ?? initialReviewsGoal;
  const participantsCount =
    eventDetails?.participants?.length ?? initialParticipantsCount;
  const participantsGoal =
    eventDetails?.participantsGoal ?? initialParticipantsGoal;

  const reviewsPercentage = Math.min(
    (reviewsAmount / (reviewsGoal || 1)) * 100,
    100
  );
  const participantsPercentage = Math.min(
    (participantsCount / (participantsGoal || 1)) * 100,
    100
  );

  return (
    <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
      <p className="text-2xl sm:text-xl font-bold">Event Progress</p>

      {/* Participants Progress */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <Users />
            <p>Participants</p>
          </div>
          <p>
            {participantsCount}/{participantsGoal}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${participantsPercentage}%` }}
          />
        </div>
      </div>

      {/* Reviews Progress */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <Target />
            <p>Reviews</p>
          </div>
          <p>
            {reviewsAmount}/{reviewsGoal}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${reviewsPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
