"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const RedirectHandler = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard/purchased");
    } else {
      setTimeout(() => {
        router.push("/dashboard/purchased");
      }, 1000);
    }
  }, [isSignedIn, router]);

  return (
    <p className="w-screen h-screen flex justify-center items-center text-xl">
      Redirecting...
    </p>
  );
};

export default RedirectHandler;
