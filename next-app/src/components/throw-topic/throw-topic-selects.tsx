import { Dispatch } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CheckCircledIcon,
  CircleIcon,
} from "@radix-ui/react-icons";
import ThrowDateRangePicker from "./throw-topic-date";

const statusMap = [
  {
    name: "pending",
    color: "orange",
  },
  {
    name: "open",
    color: "green",
  },
  {
    name: "close",
    color: "red",
  },
];

const typeMap = [
  {
    name: "poll",
    icon: <CheckCircledIcon />,
  },
  {
    name: "event",
    icon: <CalendarIcon />,
  },
];

interface ThrowTopicSelectsAreaProps {
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
}

const ThrowTopicSelectsArea = (
  props: ThrowTopicSelectsAreaProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { state, dispatch, className, ...rest } = props;
  return (
    <div
      className={cn("tw-w-full tw-flex tw-justify-between", className)}
      {...rest}
    >
      <div className="tw-flex tw-gap-2">
        <Select
          defaultValue={state.status}
          onValueChange={() =>
            dispatch({ type: "set", payload: { status: state.status } })
          }
        >
          <SelectTrigger className="!tw-w-[130px] tw-h-8">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {statusMap.map((status) => (
              <SelectItem key={status.name} value={status.name}>
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <CircleIcon color={status.color} />
                  <span
                    className={cn(
                      status.color === "green"
                        ? "tw-text-green-500"
                        : status.color === "orange"
                          ? "tw-text-orange-500"
                          : "tw-text-red-500",
                    )}
                  >
                    {status.name.toLocaleUpperCase()}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={state.type}
          onValueChange={() =>
            dispatch({ type: "set", payload: { type: state.type } })
          }
        >
          <SelectTrigger className="!tw-w-[120px] tw-h-8">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {typeMap.map((type) => (
              <SelectItem key={type.name} value={type.name}>
                <div className="tw-flex tw-gap-2 tw-items-center">
                  {type.icon}
                  <span>{type.name.toLocaleUpperCase()}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ThrowDateRangePicker state={state} dispatch={dispatch} />
    </div>
  );
};

export default ThrowTopicSelectsArea;
