import type { Metadata } from "next";
import { headers } from "next/headers";
import { Calendar, MapPin, Target, Users } from "lucide-react";
import MapathonClientComponent from "./MapathonDetailClient";

interface MapathonDetails {
  id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  startingPoint: string;
  donationEnabled: boolean;
  donationAmounts: { value: number }[];
  donationGoal: number;
  endDate: string;
  isOpen: boolean;
  participantsGoal: number;
  reviewsGoal: number;
  startDate: string;
  teamManager: string;
  address: string;
  reviewsAmount: number;
  ranking: number;
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
  eventName: string;
  eventLocation: string;
  mapUrl: string;
  reviewCount: number;
}

// Helper functions
function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
}

function getDateStatus(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "unknown";

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
}

type Props = {
  params: Promise<{ id: string }>;
};

// Server-side data fetching
async function getMapathonDetails(id: string): Promise<MapathonDetails | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(`${apiUrl}/events/${id}`, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mapathon details:", error);
    return null;
  }
}

// Generate dynamic metadata for social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  console.log("=== GENERATING DYNAMIC METADATA ===");
  console.log("Mapathon ID:", id);

  // Fetch mapathon details for metadata
  const mapathonDetails = await getMapathonDetails(id);

  console.log("Mapathon Details:", mapathonDetails ? "Found" : "Not Found");
  console.log("Mapathon Name:", mapathonDetails?.name);
  console.log("Mapathon Description:", mapathonDetails?.description);

  // Create dynamic title and description
  const title = mapathonDetails?.name
    ? `${mapathonDetails.name} - AXS Map Mapathon`
    : "AXS Map Mapathon - Join Our Accessibility Mapping Event";

  const description = mapathonDetails?.description ||
    "Join our accessibility mapping event and help make the world more accessible. Participate in community-driven mapping to improve accessibility data.";

  // Get current URL from headers for dynamic domain detection
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  // Use dynamic URL for the social media optimized AXS Map image (1200x630)
  const imageUrl = `${baseUrl}/axs-map-v6.svg`;
  const pageUrl = `${baseUrl}/mapathons/${id}`;


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
          width: 1200,
          height: 630,
          alt: mapathonDetails?.name || "AXS Map Mapathon Event",
          type: "image/svg+xml",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Main Server Component
export default async function MapathonDetailPage({ params }: Props) {
  const { id } = await params;
  const mapathonDetails = await getMapathonDetails(id);

  if (!mapathonDetails) {
    return (
      <div className="max-w-4xl p-6 mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Mapathon Not Found</h1>
        <p className="mt-4">The requested mapathon could not be found.</p>
        <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 mx-auto sm:ml-4 md:ml-8 lg:ml-12">
      <p className="mb-3 text-2xl font-bold">Location</p>

      {/* Map Section */}
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="w-full">
          <iframe
            width="100%"
            height="252"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapathonDetails?.location?.coordinates?.[1] || 0
              },${mapathonDetails?.location?.coordinates?.[0] || 0
              }&z=15&output=embed`}
          />
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <div className="flex gap-x-2 mb-2">
          <div className="bg-black px-3 rounded-lg capitalize text-sm text-white">
            {getDateStatus(
              mapathonDetails?.startDate,
              mapathonDetails?.endDate
            )}
          </div>
          <div className="border-[1px] rounded-lg text-sm px-3">
            Rank# {mapathonDetails?.ranking || "N/A"}
          </div>
        </div>

        <p className="text-2xl sm:text-xl font-bold">{mapathonDetails?.name}</p>
        <p className="text-base mt-2 text-gray-900">
          {mapathonDetails?.description}
        </p>

        {/* Date Information */}
        <div className="flex gap-x-20 my-3">
          <div className="flex mt-2 items-center gap-x-2">
            <Calendar className="h-6 w-6 text-black" />
            <div>
              <p className="text-sm text-black font-bold">Start Date</p>
              <p className="text-sm text-gray-500">
                {formatDate(mapathonDetails?.startDate)}
              </p>
            </div>
          </div>
          <div className="flex mt-2 items-center gap-x-2">
            <Calendar className="h-6 w-6 text-black" />
            <div>
              <p className="text-sm text-black font-bold">End Date</p>
              <p className="text-sm text-gray-500">
                {formatDate(mapathonDetails?.endDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex mt-2 items-center gap-x-2">
          <MapPin className="h-6 w-6 text-black" />
          <div>
            <p className="text-sm text-black font-bold">Location</p>
            <p className="text-sm text-gray-500">{mapathonDetails?.address}</p>
          </div>
        </div>

        {/* Client Component for Interactive Features */}
        <MapathonClientComponent mapathonDetails={mapathonDetails} />
      </div>

      {/* Event Progress Section */}
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
              {mapathonDetails?.participants?.length || 0}/
              {mapathonDetails?.participantsGoal || 0}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  ((mapathonDetails?.participants?.length || 0) /
                    (mapathonDetails?.participantsGoal || 1)) *
                  100,
                  100
                )}%`,
              }}
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
              {mapathonDetails?.reviewsAmount || 0}/
              {mapathonDetails?.reviewsGoal || 0}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  ((mapathonDetails?.reviewsAmount || 0) /
                    (mapathonDetails?.reviewsGoal || 1)) *
                  100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Managers Section */}
      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <h3 className="font-bold text-xl">
        Organizers ({mapathonDetails?.managers?.length || 0})
        </h3>
        {mapathonDetails?.managers?.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
            {mapathonDetails.managers.map((manager) => (
              <div
                key={manager?.id}
                className="flex items-center gap-x-2 border-[1px] py-2 px-2 rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-base text-black font-[500]">
                    {capitalizeFirstLetter(manager?.firstName)}{" "}
                    {capitalizeFirstLetter(manager?.lastName)}
                  </p>
                  <p className="text-sm text-gray-500">Manager</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="font-medium text-gray-800 mt-2">
            No managers found
          </span>
        )}
      </div>

      {/* Participants Section */}
      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <h3 className="font-bold text-xl">
          Participants ({mapathonDetails?.participants?.length || 0})
        </h3>
        {mapathonDetails?.participants?.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
            {mapathonDetails.participants.map((participant) => (
              <div
                key={participant?.id}
                className="flex items-center gap-x-2 border-[1px] py-2 px-2 rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-base text-black font-[500]">
                    {capitalizeFirstLetter(participant?.firstName)}{" "}
                    {capitalizeFirstLetter(participant?.lastName)}
                  </p>
                  <p className="text-sm text-gray-500">Participant</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="font-medium text-gray-800 mt-2">
            No participants found
          </span>
        )}
      </div>
    </div>
  );
}