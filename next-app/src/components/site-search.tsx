"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const Search = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleInputFocusOn = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="tw-flex-1">
      <Input
        onFocus={handleInputFocusOn}
        onBlur={handleInputBlur}
        type="search"
        placeholder="Search..."
        className={`tw-hidden md:tw-flex tw-h-8 ${isFocused ? "md:tw-w-[300px] lg:tw-w-[500px]" : "md:tw-w-[200px] lg:tw-w-[400px]"} tw-transition-all hover:tw-bg-accent hover:tw-text-accent-foreground`}
      />

      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogTrigger asChild>
          <Button className="tw-inline-block md:tw-hidden" variant={"outline"} size="icon">
            <MagnifyingGlassIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Search;
