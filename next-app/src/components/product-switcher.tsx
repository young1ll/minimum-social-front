"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const products = [
  {
    label: "Personal Account",
    items: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    items: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];
type Product = (typeof products)[number]["items"][number];
type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface ProductSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

const ProductSwitcher = ({ className }: ProductSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0].items[0]);

  return (
    <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            aria-label="Choose a product"
            className={cn("tw-w-[200px] tw-justify-between", className)}
          >
            {selectedProduct.label}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="tw-w-[200px] !tw-p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>

              {products.map((product) => (
                <CommandGroup key={product.label} heading={product.label}>
                  {product.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setSelectedProduct(item);
                        setOpen(false);
                      }}
                      className="tw-text-sm"
                    >
                      {item.label}
                      <CheckIcon
                        className={cn(
                          "tw-ml-auto tw-h-4 tw-w-4",
                          selectedProduct.value === item.value ? "tw-opacity-100" : "tw-opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>

            <CommandSeparator />

            {/* NOTE: 사용하지 않음... */}
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowProductDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="tw-mr-2 tw-h-5 tw-w-5" />
                    Create Product
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* NOTE: 사용하지 않음... */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="tw-space-y-4 tw-py-2 tw-pb-4">
            <div className="tw-space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="tw-space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="tw-font-medium">Free</span> -{" "}
                    <span className="tw-text-muted-foreground">Trial for two weeks</span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="tw-font-medium">Pro</span> -{" "}
                    <span className="tw-text-muted-foreground">$9/month per user</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowProductDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSwitcher;
