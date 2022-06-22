import { XIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { toast, TypeOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import "../styles/globals.css";

import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import MetaData from "components/MetaData";
import { AnimatePresence } from "framer-motion";
import tw from "lib/tw";

const contextClass: Record<TypeOptions, string> = {
  success: tw`ring-2 ring-blue-600 text-blue-600 bg-blue-50`,
  error: tw`ring-2 ring-red-600 text-red-600 bg-red-50`,
  info: tw`ring-2 ring-gray-600 text-gray-600 bg-gray-50`,
  warning: tw`ring-2 ring-orange-600 text-orange-600 bg-orange-50`,
  default: tw`ring-2 ring-indigo-600 text-indigo-600 bg-indigo-50`,
};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    toast.configure({
      style: { padding: "1rem", display: "grid", gap: ".75rem" },
      hideProgressBar: true,
      closeButton: <XIcon className="h-6 w-6 p-1" />,
      toastClassName: (ctx) =>
        clsx(
          contextClass[ctx?.type || "default"],
          "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        ),
    });
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaData />
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </Web3ReactProvider>
  );
}

export default MyApp;
