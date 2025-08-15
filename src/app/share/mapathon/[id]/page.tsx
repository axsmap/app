import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    };
  }

  const title = `${mapathonData.name} | AXS Map`;
  const description =
    mapathonData.description ||
    "Join our accessibility mapping event to help make the world more accessible.";
  const imageUrl = "https://axsmap.com/axs-map.jpg";
  const shareUrl = `https://axsmap.com/share/mapathon/${params.id}`;
  const actualUrl = `https://axsmap.com/mapathons/${params.id}`;

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
          width: 1200,
          height: 630,
          alt: "AXS Map Logo",
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
    },
    other: {
      "fb:app_id": process.env.FACEBOOK_APP_ID || "",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:url": shareUrl,
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

  // This page will redirect users to the actual mapathon page
  // but provides clean metadata for social sharing
  return (
    <html>
      <head>
        <meta property="og:title" content={`${mapathonData.name} | AXS Map`} />
        <meta
          property="og:description"
          content={
            mapathonData.description ||
            "Join our accessibility mapping event to help make the world more accessible."
          }
        />
        <meta property="og:image" content="https://axsmap.com/axs-map.jpg" />
        <meta property="og:url" content={`https://axsmap.com/share/mapathon/${params.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AXS Map" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_APP_ID || ""} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${mapathonData.name} | AXS Map`} />
        <meta
          name="twitter:description"
          content={
            mapathonData.description ||
            "Join our accessibility mapping event to help make the world more accessible."
          }
        />
        <meta name="twitter:image" content="https://axsmap.com/axs-map.jpg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Redirect users to the actual page after a brief delay
              setTimeout(function() {
                window.location.href = '/mapathons/${params.id}';
              }, 1000);
            `,
          }}
        />
      </head>
      <body>
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <h1>{mapathonData.name}</h1>
          <p>{mapathonData.description}</p>
          <p>Redirecting to event page...</p>
          <a href={`/mapathons/${params.id}`}>Click here if you're not redirected automatically</a>
        </div>
      </body>
    </html>
  );
}