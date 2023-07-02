import type { Hit } from "@/types/api";
import { createContext, useContext } from "react";

const HitContext = createContext<Hit | null>(null);

export const useHit = () => {
  const context = useContext(HitContext);
  if (!context) {
    throw new Error("useHit must be used within a HitProvider");
  }
  return context;
};

export const HitProvider = HitContext.Provider;
