"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * GitHub Pages can't run Next.js middleware. We redirect from `/` to the
 * default locale on the client so `/<repo>/` works on Pages.
 */
export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    router.replace("/en-ZA");
  }, [pathname, router]);

  return null;
}

