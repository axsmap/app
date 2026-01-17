import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | AXS Map",
  description: "Create your free AXS Map account to rate and review the accessibility of places around the world. Join our community making the world more accessible for everyone.",
  openGraph: {
    title: "Sign Up | AXS Map",
    description: "Create your free AXS Map account to rate and review the accessibility of places around the world.",
    url: "https://www.axsmap.com/sign-up",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
