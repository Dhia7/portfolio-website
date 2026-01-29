// components/PageLoader.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../styles/PageLoader.module.css';
import DarkVeil from './DarkVeil';
import Image from 'next/image';

export default function PageLoader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let progressValue = 0;
    let stageIndex = 0;
    let isCompleted = false;
    
    const stages = [
      { text: 'Initializing...', progress: 10 },
      { text: 'Loading assets...', progress: 30 },
      { text: 'Preparing content...', progress: 50 },
      { text: 'Optimizing performance...', progress: 70 },
      { text: 'Almost ready...', progress: 90 },
      { text: 'Complete!', progress: 100 }
    ];

    // Check if resources are actually loaded
    const checkResourcesLoaded = () => {
      if (typeof window === 'undefined') {
        return { resourceProgress: 0, docReady: false, loadedImages: 0, totalImages: 0 };
      }
      
      const images = document.querySelectorAll('img');
      const loadedImages = Array.from(images).filter(img => img.complete).length;
      const totalImages = images.length;
      
      // Check if document is ready
      const docReady = document.readyState === 'complete';
      
      return { docReady, loadedImages, totalImages };
    };

    // Function to complete loading - ensures it always reaches 100%
    const completeLoading = () => {
      if (isCompleted) return;
      isCompleted = true;
      
      // Ensure progress reaches 100%
      setProgress(100);
      setLoadingStage('Complete!');
      setIsComplete(true);
      
      // Wait a moment to show "Complete!" at 100%, then fade out
      setTimeout(() => {
        onLoadComplete();
      }, 800);
    };

    // Simulate initial progress through stages
    const initialTimer = setInterval(() => {
      if (isCompleted) {
        clearInterval(initialTimer);
        return;
      }

      progressValue += 1.5;
      
      // Update stage when reaching milestone
      if (stageIndex < stages.length && progressValue >= stages[stageIndex].progress) {
        setLoadingStage(stages[stageIndex].text);
        setProgress(stages[stageIndex].progress);
        stageIndex++;
      } else {
        setProgress(Math.min(progressValue, 99));
      }
      
      // When we've gone through all stages, wait for resources and complete
      if (stageIndex >= stages.length && progressValue >= 100) {
        clearInterval(initialTimer);
        
        // Check if resources are loaded
        const resourceCheck = checkResourcesLoaded();
        
        if (resourceCheck.docReady && resourceCheck.loadedImages === resourceCheck.totalImages) {
          // Resources already loaded, complete immediately
          completeLoading();
        } else {
          // Wait for resources with polling
          const waitForResources = setInterval(() => {
            const check = checkResourcesLoaded();
            if (check.docReady && check.loadedImages === check.totalImages) {
              clearInterval(waitForResources);
              completeLoading();
            }
          }, 100);
          
          // Maximum wait time fallback - always complete after max wait
          setTimeout(() => {
            clearInterval(waitForResources);
            completeLoading();
          }, 2500);
        }
      }
    }, 40);

    // Listen for actual page load events to speed up if possible
    if (typeof window !== 'undefined') {
      const handleLoad = () => {
        if (isCompleted) return;
        const resourceCheck = checkResourcesLoaded();
        if (resourceCheck.docReady && progressValue >= 90) {
          // If page is loaded and we're past 90%, ensure we complete
          if (progressValue < 100) {
            progressValue = 100;
          }
        }
      };

      window.addEventListener('load', handleLoad);
      
      // Check images loading
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.complete) {
          handleLoad();
        } else {
          img.addEventListener('load', handleLoad);
          img.addEventListener('error', handleLoad);
        }
      });

      return () => {
        clearInterval(initialTimer);
        window.removeEventListener('load', handleLoad);
      };
    }

    return () => clearInterval(initialTimer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.loaderContainer}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className={styles.loaderBackground}>
          <DarkVeil
            speed={3}
            scanlineFrequency={0.5}
            warpAmount={5}
          />
        </div>
        <div className={styles.loaderContent}>
          <motion.div
            className={styles.profileWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className={styles.profileImage}
              animate={isComplete ? { 
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/profile-image.png"
                alt="Loading"
                width={150}
                height={150}
                className={styles.profileImg}
                unoptimized
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.logoWrapper}
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span 
              className={styles.logoText}
              animate={isComplete ? { 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              Dhia Eddine Naija
            </motion.span>
          </motion.div>
          
          <motion.div
            className={styles.progressSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.progressGlow}
                  animate={{ 
                    x: ['-100%', '200%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            
            <motion.div
              className={styles.progressInfo}
              key={loadingStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className={styles.loadingText}>{loadingStage}</p>
              <p className={styles.progressPercent}>{Math.round(progress)}%</p>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.loadingDots}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={styles.dot}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}





