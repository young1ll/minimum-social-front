import React from "react";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";

interface PollTypeContentProps {
  id: string;
  description: string;
  media?: {
    url: string;
    alt: string;
    type: string;
  };
}

const PollTypeContent = ({ id, description, media }: PollTypeContentProps) => {
  return (
    <Box className="-tw-mt-2">
      {media && (
        <Card className="tw-overflow-hidden">
          <Image
            src={media.url}
            alt={media.alt}
            width={700}
            height={700}
            className="tw-w-auto tw-h-auto tw-object-cover"
          />
        </Card>
      )}
      <p className="tw-text-sm">{description}</p>

      <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-2">
        <Button
          variant={"outline"}
          className="hover:tw-bg-primary hover:tw-text-primary-foreground"
        >
          Support
        </Button>
        <Button
          variant={"outline"}
          className="hover:tw-bg-primary hover:tw-text-primary-foreground"
        >
          Oppose
        </Button>
      </div>
    </Box>
  );
};

export default PollTypeContent;
