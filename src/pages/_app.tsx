import {  type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import theme from "@/config/chakra";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app"; 
import '@fontsource/pacifico/400.css'
import '@fontsource/love-ya-like-a-sister/400.css'
import '@fontsource/roboto/400.css'
import '../styles/globals.css'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) { 

  return (
    <ChakraProvider theme={theme}> 
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
