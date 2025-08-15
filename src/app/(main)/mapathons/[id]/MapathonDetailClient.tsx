"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import { useAppSelector } from "@/Store";
import { useTranslation } from "react-i18next";

interface MapathonDetails {
  id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  startDate: string;
  endDate: string;
  address: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  managers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
}

interface Props {
  mapathonDetails: MapathonDetails;
}

export default function MapathonClientComponent({ mapathonDetails }: Props) {
  const [url, setUrl] = useState("");
  const userId = useAppSelector((state) => state.user.user?.id);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  const handleGetMapping = () => {
    if (mapathonDetails?.location?.coordinates) {
      const [lng, lat] = mapathonDetails.location.coordinates;
      window.location.href = `https://www.google.com/maps?q=${lat},${lng}`;
    } else {
      alert("Map URL not available");
    }
  };

  const shareToFacebook = () => {
    // const modifiedUrl = url.replace(
    //   /http:\/\/localhost:\d+/,
    //   "https://d397465eaf9d.ngrok-free.app"
    // );

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareToWhatsApp = () => {

    const shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };

  const shareToTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=Check%20out%20this%20Mapathon%20event!`;
    window.open(shareUrl, "_blank", "width=600,height=400");

  };

  const isUserParticipant = [
    ...(mapathonDetails?.participants ?? []),
    ...(mapathonDetails?.managers ?? []),
  ]?.some((participant) => participant?.id === userId);

  return (
    <>
      {/* Social Sharing */}
      <div className="flex items-center mt-3 gap-6">
        <button
          onClick={shareToFacebook}
          className="hover:text-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <FacebookIcon />
        </button>
        <button
          onClick={shareToWhatsApp}
          className="hover:text-green-600 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp style={{ color: "#25D366", fontSize: "36px" }} />
        </button>
        <button
          onClick={shareToTwitter}
          className="hover:text-blue-400 transition-colors"
          aria-label="Share on Twitter"
        >
          <TwitterIcon />
        </button>
      </div>

      {/* Join Button */}
      {!isUserParticipant && (
        <div className="flex items-center mt-4">
          <button
            onClick={handleGetMapping}
            className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            {t ? t("getMappingButton") : "Join Mapathon"}
          </button>
        </div>
      )}
    </>
  );
}
