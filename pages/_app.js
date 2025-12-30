// pages/_app.js
import '../styles/global/globals.css';
import '../styles/SmoothScroll.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import { ThemeProvider } from '../components/ThemeContext';
import DarkVeil from '../components/DarkVeil';

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:11',message:'MyApp component initialized',data:{loading,isInitialLoad},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    // Only show loader on initial page load
    // The PageLoader component will handle its own completion and call onLoadComplete
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:17',message:'useEffect for isInitialLoad executed',data:{isInitialLoad},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D'})}).catch(()=>{});
    // #endregion
    if (isInitialLoad) {
      // Preload critical images
      const preloadImages = [
        '/profile-image.png',
        '/portfolioIcon.png'
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

  // Handle route changes - show minimal loading if needed
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Optional: Add route change loading indicator here if needed
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:39',message:'Route change started',data:{isInitialLoad,loading},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    };

    const handleRouteChangeComplete = () => {
      // Route change complete
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:44',message:'Route change completed',data:{isInitialLoad,loading},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    };

    router.events?.on('routeChangeStart', handleRouteChangeStart);
    router.events?.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChangeStart);
      router.events?.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:76',message:'Rendering check - loading and isInitialLoad',data:{loading,isInitialLoad,shouldShowLoader:loading&&isInitialLoad},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,D'})}).catch(()=>{});
  // #endregion
  if (loading && isInitialLoad) {
    return <PageLoader onLoadComplete={() => {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:78',message:'onLoadComplete called - BEFORE setLoading',data:{isInitialLoad,loading},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      setLoading(false);
      setIsInitialLoad(false);
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/bf8c3d40-ef3f-42c0-bd4e-f5999ecb5154',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'_app.js:81',message:'onLoadComplete called - AFTER setLoading and setIsInitialLoad',data:{isInitialLoad:false,loading:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    }} />;
  }

  return (
    <ThemeProvider>
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <DarkVeil
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
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