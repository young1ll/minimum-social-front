import React from "react";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

interface VersusTypeContentProps {
  id: string;
  media?: {
    url: string;
    alt: string;
    type: string;
  };
  description: string;
  versusId: string[];
}
const VersusTypeContent = ({
  id,
  description,
  media,
  versusId,
}: VersusTypeContentProps) => {
  return (
    <Box className="-tw-mt-2">
      {media && (
        <Card className="tw-overflow-hidden">
          <Image
            src={media?.url}
            alt={media?.alt}
            width={700}
            height={700}
            className="tw-w-auto tw-h-auto tw-object-cover"
          />
        </Card>
      )}
      <p className="tw-text-sm">{description}</p>

      <div className="tw-mt-4 tw-grid tw-grid-cols-1 tw-gap-2">
        <Button
          variant={"outline"}
          className="hover:tw-bg-primary hover:tw-text-primary-foreground"
        >
          {versusId[0]}
        </Button>
        <Button
          variant={"outline"}
          className="hover:tw-bg-primary hover:tw-text-primary-foreground"
        >
          {versusId[1]}
        </Button>
      </div>
    </Box>
  );
};

export default VersusTypeContent;
