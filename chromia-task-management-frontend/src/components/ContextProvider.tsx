"use client";

import { useTAppStore } from "@/store/appStore";
import { Session } from "@chromia/ft4";
import { createClient } from "postchain-client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

// Create context for Chromia session
const ChromiaContext = createContext<Session | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  // Initialize session and EVM address states
  const { session: sessionSetup, setClient } = useTAppStore();
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    const handleClientSetup = (client: any) => {
      setClient(client);
    };

    const initSession = async () => {
      const nodeUrl = process.env.NEXT_PUBLIC_CHROMIA_NODE_URL;
      const blockchainIid = process.env.NEXT_PUBLIC_BLOCKCHAIN_IID
        ? parseInt(process.env.NEXT_PUBLIC_BLOCKCHAIN_IID, 10)
        : 0;

      if (!nodeUrl) {
        console.error(
          "NEXT_PUBLIC_CHROMIA_NODE_URL is not defined in .env.local"
        );
        return;
      }

      if (blockchainIid === undefined || isNaN(blockchainIid)) {
        console.error(
          "NEXT_PUBLIC_BLOCKCHAIN_IID is not a valid number or is missing."
        );
        return;
      }

      // 1. Initialize Client
      const client = await createClient({
        nodeUrlPool: nodeUrl,
        blockchainIid,
      });

      handleClientSetup(client);

      if (sessionSetup) {
        setSession(sessionSetup);
      }
    };

    initSession().catch(console.error);
  }, [sessionSetup, setClient]);

  return (
    <ChromiaContext.Provider value={session}>
      {children}
    </ChromiaContext.Provider>
  );
}

// Define hooks for accessing context
export function useSessionContext() {
  return useContext(ChromiaContext);
}
export function useSession() {
  const session = useContext(ChromiaContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
}
