import { useState, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import Pusher from "pusher-js";
import theme from "@/config/chakra";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/pacifico/400.css";
import "@fontsource/love-ya-like-a-sister/400.css";
import "@fontsource/roboto/400.css";
import "../styles/globals.css";
import { PusherContext } from "@/modules/multiplayer/Pusher";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

let pusher: Pusher;

if (typeof window !== "undefined") {
  // window.addEventListener("beforeunload", (e) => {
  //   e.returnValue = "Are you sure you want to leave? You will lose your state";
  // });

  if (process.env.NODE_ENV !== "production") {
    // Enable pusher logging - isn't included in production
    Pusher.logToConsole = true;
  }
  const pusherKey = process.env.PUSHER_KEY || "f36e58b2595918694280";
  pusher = new Pusher(pusherKey, {
    cluster: "mt1",
    forceTLS: false,
    channelAuthorization: {
      endpoint: "http://localhost:5400/pusher/user-auth",
      transport: "ajax",
      params: {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tickToken")}`,
      },
    },
    userAuthentication: {
      endpoint: "http://localhost:5400/pusher/user-auth",
      transport: "ajax",
      params: {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tickToken")}`,
      },
    },
  });
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [code, setCode] = useState("");
  const [startName, setStartName] = useState("");
  const [joinName, setJoinName] = useState("");
  return (
    <ChakraProvider theme={theme}>
      <PusherContext.Provider
        value={{
          pusher,
          code,
          setCode,
          startName,
          setStartName,
          joinName,
          setJoinName,
        }}
      >
        <Component {...pageProps} />
      </PusherContext.Provider>
    </ChakraProvider>
  );
}
