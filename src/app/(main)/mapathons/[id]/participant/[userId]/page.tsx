import type { Metadata } from "next";
import { headers } from "next/headers";
import ParticipantPageClient from "./ParticipantPageClient";

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
  reviewsGoal: number;
  reviewsAmount: number;
  participantsGoal: number;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    reviewsAmount?: number;
  }>;
  managers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  reviewsAmount?: number;
  reviewFieldsAmount?: number;
}

interface ParticipantInfo {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  reviewsAmount: number;
  personalMessage: string;
}

// Helper
function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Fetch mapathon details
async function getMapathonDetails(id: string): Promise<MapathonDetails | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(`${apiUrl}/events/${id}`, {
      next: { revalidate: 10 },
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// Fetch user profile
async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      next: { revalidate: 10 },
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return { ...data, id: data.id || data._id };
  } catch {
    return null;
  }
}

// Fetch participant info (per-event reviewsAmount + personalMessage)
async function getParticipantInfo(
  eventId: string,
  userId: string
): Promise<ParticipantInfo | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(
      `${apiUrl}/events/${eventId}/participants/${userId}`,
      {
        next: { revalidate: 10 },
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ id: string; userId: string }>;
};

// Dynamic social sharing metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, userId } = await params;
  const [mapathon, user] = await Promise.all([
    getMapathonDetails(id),
    getUserProfile(userId),
  ]);

  const userName = user
    ? `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`
    : "Participant";

  const mapathonName = mapathon?.name || "Mapathon";

  const title = `${userName} - ${mapathonName} | AXS Map`;
  const description = `${userName} is participating in ${mapathonName}. Join the accessibility Mapathon and help map your community!`;

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  const imageUrl = `${baseUrl}/axsmap-logo-share.png`;
  const pageUrl = `${baseUrl}/mapathons/${id}/participant/${userId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "AXS Map",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 300,
          alt: `${userName} - ${mapathonName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@axsmap",
    },
  };
}

// Server Component
export default async function ParticipantPage({ params }: Props) {
  const { id, userId } = await params;

  const [mapathon, user, participant] = await Promise.all([
    getMapathonDetails(id),
    getUserProfile(userId),
    getParticipantInfo(id, userId),
  ]);

  if (!mapathon) {
    return (
      <div className="max-w-2xl p-6 mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Mapathon Not Found</h1>
        <p className="mt-4 text-gray-600">
          The requested mapathon could not be found.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl p-6 mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Participant Not Found
        </h1>
        <p className="mt-4 text-gray-600">
          The requested participant could not be found.
        </p>
      </div>
    );
  }

  // Check if user is actually a participant or manager
  const isParticipant =
    mapathon.participants?.some((p) => p.id === userId) ||
    mapathon.managers?.some((m) => m.id === userId);

  if (!isParticipant) {
    return (
      <div className="max-w-2xl p-6 mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800">Not a Participant</h1>
        <p className="mt-4 text-gray-600">
          This user is not a participant of this mapathon.
        </p>
        <a
          href={`/mapathons/${id}`}
          className="inline-block mt-6 bg-primary text-black font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Mapathon
        </a>
      </div>
    );
  }

  const userName = `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;

  // Prefer the dedicated participant endpoint (per-event review count),
  // fall back to the embedded mapathon.participants entry.
  const participantData = mapathon.participants?.find((p) => p.id === userId);
  const placesMapped =
    participant?.reviewsAmount ?? participantData?.reviewsAmount ?? 0;
  const initialPersonalMessage = participant?.personalMessage ?? "";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Header / Hero Section */}
      <div className="bg-black rounded-t-2xl p-6 text-center relative overflow-hidden">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={userName}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-primary bg-gray-700 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.firstName?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-white">{userName}</h1>

        {/* Participation badge */}
        <p className="text-sm text-gray-300 mt-1">
          I&apos;m participating in the{" "}
          <a
            href={`/mapathons/${id}`}
            className="text-primary font-semibold hover:underline"
          >
            {mapathon.name}
          </a>
          .
        </p>
      </div>

      {/* Personal Message Section */}
      <div className="bg-white border-x border-gray-200 p-6">
        <ParticipantPageClient
          mapathonId={id}
          userId={userId}
          mapathonName={mapathon.name}
          mapathonAddress={mapathon.address}
          mapathonStartDate={mapathon.startDate}
          mapathonEndDate={mapathon.endDate}
          mapathonReviewsGoal={mapathon.reviewsGoal}
          placesMapped={placesMapped}
          userName={userName}
          initialPersonalMessage={initialPersonalMessage}
        />
      </div>

      {/* Mapathon Details */}
      <div className="bg-gray-50 border-x border-gray-200 px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Mapathon Details
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary text-lg">●</span>
            <span className="text-gray-800 font-medium">{mapathon.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500 text-lg">●</span>
            <span className="text-gray-700">
              {mapathon.address || "Location TBD"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 text-lg">📅</span>
            <span className="text-gray-700">
              {formatDate(mapathon.startDate)}
              {mapathon.endDate && mapathon.endDate !== mapathon.startDate
                ? ` – ${formatDate(mapathon.endDate)}`
                : ""}
            </span>
          </div>
        </div>
        <a
          href={`/mapathons/${id}`}
          className="inline-block mt-3 text-sm text-secondary font-medium hover:underline"
        >
          View Full Mapathon Details →
        </a>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-x border-gray-200 px-6 py-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-900">My Progress</h2>
          {mapathon.reviewsGoal > 0 && (
            <span className="text-sm text-gray-500">
              Goal: {mapathon.reviewsGoal} places
            </span>
          )}
        </div>
        <p className="text-gray-800 mb-3">
          <span className="text-2xl font-bold text-primary">
            {placesMapped}
          </span>{" "}
          places mapped
        </p>
        {mapathon.reviewsGoal > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  (placesMapped / (mapathon.reviewsGoal || 1)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-black rounded-b-2xl p-5 space-y-3">
        <a
          href={`/mapathons/${id}`}
          className="block w-full text-center bg-primary text-black font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-colors"
        >
          Join This Mapathon
        </a>
        <a
          href="/"
          className="block w-full text-center bg-transparent text-primary border-2 border-primary font-bold py-4 rounded-xl text-lg hover:bg-primary hover:text-black transition-colors"
        >
          Start Mapping
        </a>
      </div>
    </div>
  );
}
