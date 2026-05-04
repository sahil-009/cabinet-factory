import { createContext, useContext, useState, type ReactNode } from "react";

interface SiteCtxValue {
  introReady: boolean;
  markIntroReady: () => void;
}

const SiteCtx = createContext<SiteCtxValue>({ introReady: true, markIntroReady: () => {} });

export const SiteProvider = ({
  children,
  initialReady,
}: {
  children: ReactNode;
  initialReady: boolean;
}) => {
  const [introReady, setIntroReady] = useState(initialReady);
  return (
    <SiteCtx.Provider value={{ introReady, markIntroReady: () => setIntroReady(true) }}>
      {children}
    </SiteCtx.Provider>
  );
};

export const useSiteContext = () => useContext(SiteCtx);
