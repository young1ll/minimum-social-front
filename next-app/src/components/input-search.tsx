"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {}

const SearchInput = (
  props: SearchInputProps & React.HTMLAttributes<HTMLInputElement>,
) => {
  const { className, defaultValue, ...rest } = props;
  const [searchQuery, setSearchQuery] = useState<string>();
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      router.push("/explore/search?q=" + searchQuery);
    }
  };

  return (
    <Input
      className={cn(className)}
      placeholder="Search"
      value={searchQuery}
      defaultValue={defaultValue}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
      {...rest}
    />
  );
};

export default SearchInput;
