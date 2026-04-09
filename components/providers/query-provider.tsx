"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { makeQueryClient } from "@/lib/react-query";


let browserQueryClient: QueryClient | undefined = undefined

// this functions helps with distinction between the server and the browser. the server needs a new instance created
// for evrry query while  the browser maintains its already established instance
function getQueryClient() {
  if(typeof window === "undefined"){
    return makeQueryClient()
  }

  if(!browserQueryClient){
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const queryClient = useRef(getQueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
  );
}
