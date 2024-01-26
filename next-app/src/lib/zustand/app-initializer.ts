import { ReactNode } from "react";
import { useAuthStore } from "./store";

const AppInitializer = ({
  user,
  children,
}: {
  user: any;
  children: ReactNode;
}) => {
  useAuthStore((set) => set.setUser(user));

  return children;
};

export default AppInitializer;
