"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const GloblaProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "99px",
            background: "#000",
            color: "#fff",
          },
        }}
      />
      <Sonner />
    </>
  );
};

export default GloblaProvider;
