import { useMediaQuery } from '@mui/material';

const useResponsiveStyles = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1200px)'
  );
  const isLCD = useMediaQuery('(min-width: 1200px)');

  return { isMobile, isTablet, isDesktop, isLCD };
};

export default useResponsiveStyles;
