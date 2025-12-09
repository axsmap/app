import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Fetch mapathon data for metadata generation
async function getMapathonData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
      {
        cache: "no-store",
        headers: {
          "x-device-type": "web",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching mapathon data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const mapathonData = await getMapathonData(params.id);

  if (!mapathonData) {
    return {
      title: "Mapathon Event | AXS Map",
      description: "Join our accessibility mapping event",
      openGraph: {
        siteName: "AXS Map",
      },
    };
  }

  const title = `${mapathonData.name} | AXS Map`;
  const description =
    mapathonData.description ||
    "Join our accessibility mapping event to help make the world more accessible.";
  
  // Use the deployment URL for images (works on Amplify and production)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://axsmap.com";
  const imageUrl = `${baseUrl}/axsmap-logo-share.png`;
  const shareUrl = `${baseUrl}/share/mapathon/${params.id}`;
  const actualUrl = `${baseUrl}/mapathons/${params.id}`;

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
          alt: "AXS Map - Accessibility Mapping",
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
      "fb:app_id": process.env.FACEBOOK_APP_ID || "",
      "og:site_name": "AXS Map",
      "og:image:width": "1024",
      "og:image:height": "300",
      "og:image:alt": "AXS Map - Accessibility Mapping",
      "og:url": shareUrl,
      "og:type": "website",
      "og:locale": "en_US",
    },
  };
}

interface PageProps {
  params: { id: string };
}

export default async function ShareMapathonPage({ params }: PageProps) {
  const mapathonData = await getMapathonData(params.id);

  if (!mapathonData) {
    redirect('/');
  }

  // This page provides clean metadata for social sharing
  // and redirects users to the actual mapathon page
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center font-sans">
      <h1 className="text-2xl font-bold mb-4">{mapathonData.name}</h1>
      <p className="text-gray-600 mb-4">{mapathonData.description}</p>
      <p className="text-gray-500 mb-2">Redirecting to event page...</p>
      <a 
        href={`/mapathons/${params.id}`}
        className="text-blue-600 hover:underline"
      >
        Click here if you&apos;re not redirected automatically
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.href = '/mapathons/${params.id}';
            }, 1000);
          `,
        }}
      />
    </div>
  );
}