"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FilterItemProps {
  title: string;
  options: {
    name: string;
    id: string;
  }[];
}

const FilterItem = (
  props: FilterItemProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { title, options, className, ...rest } = props;
  const [select, setSelect] = useState<string>(options[0].id);

  const handleCheckedValue = (id: string) => {
    setSelect(id);
    //TODO: api call
  };

  return (
    <div className={cn("tw-w-full tw-flex tw-flex-col", className)} {...rest}>
      <div className="tw-w-full tw-mb-2">
        <h3 className="tw-text-lg tw-font-semibold">{title}</h3>
      </div>

      <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={cn(
              "tw-flex tw-flex-row tw-justify-between tw-items-center",
              "tw-w-full",
            )}
          >
            <Label
              key={opt.id}
              htmlFor={opt.id}
              className={cn(
                "tw-flex-1",
                "tw-text-lg",
                "hover:tw-cursor-pointer",
              )}
            >
              {opt.name}
            </Label>
            <Checkbox
              id={opt.id}
              checked={select === opt.id}
              className="tw-h-5 tw-w-5"
              onCheckedChange={() => handleCheckedValue(opt.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
