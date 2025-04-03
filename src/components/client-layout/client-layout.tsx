"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Spinner from "../Spinner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );
}
