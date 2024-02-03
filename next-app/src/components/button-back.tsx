"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface BackButtonProps {}
const BackButton = (
  props: BackButtonProps & React.HTMLAttributes<HTMLButtonElement>,
) => {
  const { className } = props;
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      size={"icon"}
      variant={"ghost"}
      className={cn(className)}
      {...props}
    >
      <ArrowLeftIcon className="tw-h-6 tw-w-6" />
    </Button>
  );
};

export default BackButton;
