"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthWallpaper = () => {
  const router = useRouter();
  return (
    <Box className="tw-w-0 md:tw-w-full tw-bg-black tw-overflow-hidden tw-p-4 tw-justify-between">
      <Box direction={"row"}>
        <Button className="tw-aspect-square tw-w-8 tw-h-8 !tw-p-2" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        sdaf
      </Box>

      <div>
        <p className="tw-text-gray-400">
          Embrace the minimum, experience the maximum, and let curiosity be your guide in your journey by
          minimum-social!
        </p>
      </div>
    </Box>
  );
};

export default AuthWallpaper;
