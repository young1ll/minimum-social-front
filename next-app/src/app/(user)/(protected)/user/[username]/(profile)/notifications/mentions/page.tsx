"use client";
import { Box } from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";

const MentionsPage = () => {
  const mentions = [];

  return (
    <Box>
      <Separator />
      {mentions.length === 0 ? (
        <h1 className="tw-text-xl tw-font-bold">No notifications yet.</h1>
      ) : (
        ""
      )}
    </Box>
  );
};

export default MentionsPage;
