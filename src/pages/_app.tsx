import { useState, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import Pusher, { Channel } from "pusher-js";
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
  if (process.env.NODE_ENV !== "production") {
    // Enable pusher logging - isn't included in production
    Pusher.logToConsole = true;
  }
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "f36e58b2595918694280";
  pusher = new Pusher(pusherKey, {
    cluster: "mt1",
    forceTLS: false,
    channelAuthorization: {
      endpoint: process.env.NEXT_PUBLIC_PUSHER_AUTH_URL|| "http://localhost:5400/pusher/user-auth",
      transport: "ajax",
      params: {},
      headersProvider: () => ({
        Authorization: `Bearer ${localStorage.getItem("tickToken")}`,
      }),
    },
    userAuthentication: {
      endpoint: process.env.NEXT_PUBLIC_PUSHER_AUTH_URL|| "http://localhost:5400/pusher/user-auth",
      transport: "ajax",
      params: {},
      headersProvider: () => ({
        Authorization: `Bearer ${localStorage.getItem("tickToken")}`,
      }),
    },
  });
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [code, setCode] = useState("");
  const [startName, setStartName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [startId, setStartId] = useState(0);
  const [joinId, setJoinId] = useState(0);
  const [userId, setUserId] = useState(0);

  const [channel, setChannel] = useState<Channel>();
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
          channel,
          setChannel,
          startId,
          joinId,
          setStartId,
          setJoinId,
          userId,
          setUserId,
        }}
      >
        <Component {...pageProps} />
      </PusherContext.Provider>
    </ChakraProvider>
  );
}
