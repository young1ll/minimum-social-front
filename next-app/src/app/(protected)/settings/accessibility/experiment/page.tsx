"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import SettingsItem from "../../setting-item";

const ExpSettingsPage = () => {
  const router = useRouter();

  return (
    <>
      <H2 backButton>Accessibility, display and languages</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          Manage aspects of your X experience such as limiting color contrast
          and motion. These settings affect all the X accounts on this browser.
        </p>
      </div>

      <H2>Vision</H2>
      <SettingsItem
        id="color-contrast"
        name="Increase color contrast"
        description="Improves legibility by increasing the contrast between text and
              background colors."
        endItem={<Checkbox id="color-contrast" className="tw-h-6 tw-w-6" />}
      />

      <Separator />
      <H2>Motion</H2>
      <SettingsItem
        id="reduce-motion"
        name="Reduce motion"
        description="Limits the amount of in-app animations, including live engagement counts."
        endItem={<Checkbox id="reduce-motion" className="tw-h-6 tw-w-6" />}
      />

      <Separator />
      <H2>Media</H2>
      <SettingsItem
        id="image-reminder"
        name="Receive image description reminder"
        description="Enables a reminder to add image descriptions before a post can be sent."
        endItem={<Checkbox id="image-reminder" className="tw-h-6 tw-w-6" />}
      />

      {/* <div className="tw-flex tw-basis-auto tw-items-stretch hover:tw-bg-accent">
          <Link
            href={item.href}
            className="tw-flex tw-justify-between tw-w-full tw-p-4 tw-min-h-12"
          >
            <div className="tw-flex tw-flex-row tw-grow tw-items-center">
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-mr-2">
                <item.startIcon className="tw-h-4 tw-w-4" />
              </div>
              <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-items-stretch">
                <span className="">{item.name}</span>
                <span className="tw-text-xs tw-text-zinc-500">
                  {item.description}
                </span>
              </div>
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12">
                <item.endIcon className="tw-h-4 tw-w-4" />
              </div>
            </div>
          </Link>
        </div> */}
    </>
  );
};

export default ExpSettingsPage;
