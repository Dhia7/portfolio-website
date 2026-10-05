// pages/_app.js
import '../styles/global/globals.css';
import '../styles/SmoothScroll.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Plus_Jakarta_Sans } from 'next/font/google';
import PageLoader from '../components/PageLoader';
import { ThemeProvider } from '../components/ThemeContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      // Preload critical images
      const preloadImages = [
        '/profile-image.png',
        '/favicon.png'
      ];
      
      preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Don't set loading to false here - let PageLoader handle it
      // This ensures the loader always shows until 100%
    }
  }, [isInitialLoad]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  const iconHead = (
    <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );

  if (loading && isInitialLoad) {
    return (
      <div className={`${jakarta.variable} ${jakarta.className}`}>
        {iconHead}
        <PageLoader onLoadComplete={() => {
          setLoading(false);
          setIsInitialLoad(false);
        }} />
      </div>
    );
  }

  return (
    <ThemeProvider>
      {iconHead}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
          className={`${jakarta.variable} ${jakarta.className}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;