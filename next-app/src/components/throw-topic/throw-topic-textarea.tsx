import { Dispatch } from "react";
import { Textarea } from "../ui/textarea";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";
import { cn } from "@/lib/utils";

interface ThrowTopicTextarea {
  startWrite: boolean;
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const ThrowTopicTextarea = (
  props: ThrowTopicTextarea & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { startWrite, state, dispatch, className, textareaProps, ...rest } =
    props;
  return (
    <div className={cn("tw-relative tw-w-full", className)} {...rest}>
      <Textarea
        className={cn(
          startWrite
            ? "tw-h-[140px] tw-opacity-100 tw-mt-2"
            : "!tw-h-0 !tw-min-h-0 tw-py-0 tw-opacity-0",
          "tw-transition-all tw-duration-300",
          "tw-resize-none",
          "tw-leading-5",
          textareaProps?.className,
        )}
        maxLength={200}
        value={state.description}
        onChange={(e) =>
          dispatch({
            type: "set",
            payload: { description: e.target.value },
          })
        }
        placeholder="Topic description..."
      />
      <span
        className={cn(
          "tw-absolute tw-bottom-4 tw-right-4 tw-translate-y-1/2",
          "tw-text-sm tw-text-secondary-foreground",
          "tw-transition-opacity",
          startWrite ? "tw-opacity-100" : "tw-opacity-0",
        )}
      >
        {state.description.length}/{200}
      </span>
    </div>
  );
};

export default ThrowTopicTextarea;
