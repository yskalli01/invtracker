import 'src/global.css';
import 'src/App.css';

import { useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';
// ----------------------------------------------------------------------

type AppProps = {
  children?: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  // useEffect(()=>{
  //   const start = performance.now();
  //   return(()=>{
  //     const end = performance.now();
  //     console.log(`App took ${end - start}ms`)
  //   })
  // },[])

  return (
    <>
    {/* <ThemeProvider> */}
      {children}
    {/* </ThemeProvider> */}
    </>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
