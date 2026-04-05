import { Metadata } from "next";
import { redirect } from "next/navigation";

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getMapathonData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
      {
        cache: "no-store",
        headers: { "x-device-type": "web" },
      }
    );
    if (!response.ok) return null;
    const result = await response.json();
    return result.data || result;
  } catch {
    return null;
  }
}

async function getUserData(userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
      {
        cache: "no-store",
        headers: { "x-device-type": "web" },
      }
    );
    if (!response.ok) return null;
    const result = await response.json();
    return { ...result, id: result.id || result._id };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; userId: string };
}): Promise<Metadata> {
  const [mapathon, user] = await Promise.all([
    getMapathonData(params.id),
    getUserData(params.userId),
  ]);

  const userName = user
    ? `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`
    : "A participant";

  const mapathonName = mapathon?.name || "an AXS Map Mapathon";

  const title = `${userName} is participating in ${mapathonName} | AXS Map`;
  const description = `${userName} is helping map accessibility in their community. Join ${mapathonName} and make spaces more inclusive!`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://axsmap.com";
  const imageUrl = `${baseUrl}/axsmap-logo-share.png`;
  const shareUrl = `${baseUrl}/share/mapathon/${params.id}/participant/${params.userId}`;
  const actualUrl = `${baseUrl}/mapathons/${params.id}/participant/${params.userId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: shareUrl,
      siteName: "AXS Map",
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 300,
          alt: `${userName} - ${mapathonName} on AXS Map`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@axsmap",
      creator: "@axsmap",
    },
    other: {
      "og:site_name": "AXS Map",
      "og:image:width": "1024",
      "og:image:height": "300",
      "og:url": shareUrl,
      "og:type": "website",
    },
  };
}

interface PageProps {
  params: { id: string; userId: string };
}

export default async function ShareParticipantPage({ params }: PageProps) {
  const [mapathon, user] = await Promise.all([
    getMapathonData(params.id),
    getUserData(params.userId),
  ]);

  if (!mapathon || !user) {
    redirect("/");
  }

  const userName = `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;
  const actualUrl = `/mapathons/${params.id}/participant/${params.userId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center font-sans">
      <h1 className="text-2xl font-bold mb-2">{userName}</h1>
      <p className="text-gray-600 mb-4">
        is participating in {mapathon.name}
      </p>
      <p className="text-gray-500 mb-2">Redirecting to participant page...</p>
      <a href={actualUrl} className="text-blue-600 hover:underline">
        Click here if you&apos;re not redirected automatically
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.href = '${actualUrl}';
            }, 1000);
          `,
        }}
      />
    </div>
  );
}
