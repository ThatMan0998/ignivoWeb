"use client";

import { createContext, useContext, useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';

const ConsultationContext = createContext(null);

export function useConsultation() {
  const context = useContext(ConsultationContext);
  return context;
}

export default function LandingExperience({ children }) {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const selectPackage = useCallback((pkg) => {
    setSelectedPackage(pkg);
  }, []);

  const clearPackage = useCallback(() => {
    setSelectedPackage(null);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ConsultationContext.Provider
        value={{
          selectedPackage,
          setSelectedPackage: selectPackage,
          clearPackage,
        }}
      >
        {children}
      </ConsultationContext.Provider>
    </MotionConfig>
  );
}
