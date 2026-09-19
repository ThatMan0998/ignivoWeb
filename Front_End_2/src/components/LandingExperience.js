"use client";

import { createContext, useContext, useState } from 'react';
import { MotionConfig } from 'framer-motion';

const ConsultationContext = createContext(null);

export function useConsultation() {
  return useContext(ConsultationContext);
}

export default function LandingExperience({ children }) {
  const [selectedPlan, setSelectedPlan] = useState('');
  return (
    <MotionConfig reducedMotion="user">
      <ConsultationContext.Provider value={{ selectedPlan, setSelectedPlan }}>
        {children}
      </ConsultationContext.Provider>
    </MotionConfig>
  );
}
