import { Cloud1 } from "@/animations/Cloud1";
import { Cloud2 } from "@/animations/Cloud2";
import { Tree } from "@/animations/Tree";
import { Flex } from "@chakra-ui/layout";
import { ReactNode } from "react";

const Background = ({ children }: { children: ReactNode }) => {
  return ( 
      <Flex
        maxH="800px"
        height="100vh"
        bgColor={"#DAF6FF"}
        w="full"
        maxW={"420px"}
        position="relative"
        overflow={"hidden"}
      >
        <Cloud2 />
        <Cloud1 />
        <Tree />
        {children}
      </Flex> 
  );
};

export default Background;
