import { createContext } from "react";
import { OverlaysType } from "./types";

export type AppContextType = {
  overlays: OverlaysType | null;
  setOverlays: (overlays: OverlaysType) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
