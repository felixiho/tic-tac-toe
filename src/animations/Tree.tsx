import { useEffect, useRef, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';
import { Box } from '@chakra-ui/react';


export const Tree = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg', 
        loop: true,
        autoplay: true, 
        path: '/tree.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <Box left="-300px" bottom={'-16%'}   position={"absolute"}  ref={ref} />
  );
};