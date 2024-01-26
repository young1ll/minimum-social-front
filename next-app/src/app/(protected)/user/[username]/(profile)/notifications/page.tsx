"use client";
import { Box } from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";

const NotificationsPage = () => {
  const notifications = [];

  return (
    <Box>
      <Separator />
      {notifications.length === 0 ? (
        <h1 className="tw-text-xl tw-font-bold">No notifications yet.</h1>
      ) : (
        ""
      )}
    </Box>
  );
};

export default NotificationsPage;
