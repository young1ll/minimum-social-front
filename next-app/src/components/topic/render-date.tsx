import { Skeleton } from "../ui/skeleton";

export const renderDate = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt?: string;
}) => {
  const renderCreatedAt = new Date("2024-02-04T03:52:49.000Z");
  const renderUpdatedAt = updatedAt
    ? new Date("2024-02-04T03:52:50.000Z")
    : undefined;

  const timeDifference = renderUpdatedAt
    ? Math.abs(renderUpdatedAt.getTime() - renderCreatedAt.getTime())
    : 0;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (!createdAt) {
    return <Skeleton className="tw-h-full tw-w-32" />;
  }
  return (
    <span className="tw-text-xs tw-text-zinc-500">
      {renderUpdatedAt && minutesDifference >= 5
        ? renderUpdatedAt.toLocaleString("ko-KR") + " (수정됨)"
        : renderCreatedAt.toLocaleString("ko-KR")}
    </span>
  );
};
