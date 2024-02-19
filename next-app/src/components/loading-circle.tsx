import { Loader2 } from "lucide-react";

const LoadingCircle = () => {
  return (
    <div className="tw-flex tw-justify-center tw-w-full tw-my-4">
      <Loader2 className="tw-animate-spin" />
    </div>
  );
};

export default LoadingCircle;
