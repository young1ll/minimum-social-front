"use client";
import { redirect } from "next/navigation";
import { userSettingMenu } from "./settings-menu";

const SettingsPage = () => {
  redirect(userSettingMenu[0].href);
};

export default SettingsPage;
