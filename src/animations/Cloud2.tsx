import { useEffect, useRef, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';
import { Box } from '@chakra-ui/react';


export const Cloud2 = () => {
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
        path: '/cloud.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <Box top="-5%" right="-60px" width="272px"  position={"absolute"}  ref={ref} />
  );
};