"use client";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import {
  CalendarIcon,
  ImageIcon,
  SpaceBetweenHorizontallyIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "../user-avatar";

const ThrowTopicCard = () => {
  return (
    <Card className="tw-w-full tw-flex xl:tw-flex-row tw-overflow-hidden tw-bg-secondary">
      <CardContent className="tw-w-full !tw-p-4">
        <Box className="tw-items-center tw-w-full" direction={"row"} gap={2}>
          <UserAvatar />
          {/* TODO: 포커스 시, 제한 글자 수 표시 */}
          <Input placeholder="Throw new topic!" />
        </Box>

        <Box
          className="tw-justify-between tw-items-center tw-w-full tw-mt-4 tw-px-2"
          direction={"row"}
          gap={2}
        >
          <div className="tw-flex tw-gap-4">
            <Button
              variant={"outline"}
              className="tw-gap-2 tw-h-8 hover:tw-bg-primary hover:tw-text-primary-foreground"
            >
              <ImageIcon />
              Media
            </Button>

            <Button
              variant={"outline"}
              className="tw-gap-2 tw-h-8 hover:tw-bg-primary hover:tw-text-primary-foregroundi"
            >
              <CalendarIcon />
              Event
            </Button>

            <Button
              variant={"outline"}
              className="tw-gap-2 tw-h-8 hover:tw-bg-primary hover:tw-text-primary-foreground"
            >
              <SpaceBetweenHorizontallyIcon />
              Versus
            </Button>
          </div>

          <Button
            variant={"outline"}
            className="tw-gap-2 tw-h-8 hover:tw-bg-primary hover:tw-text-primary-foreground"
          >
            Throw
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThrowTopicCard;
