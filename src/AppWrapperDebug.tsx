import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
import { MEDPLUM_SERVER_URL, MEDPLUM_PROJECT_ID } from './config';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router'; // Geändert von react-router-dom zu react-router
import { LandingPage } from './pages/landing';

// Erstelle einen neuen MedplumClient
const medplumClient = new MedplumClient({
  baseUrl: MEDPLUM_SERVER_URL,
  clientId: MEDPLUM_PROJECT_ID,
});

export function AppWrapperDebug(): JSX.Element {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log('AppWrapperDebug mounted');
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <MedplumProvider medplum={medplumClient}>
      <div>
        <h1>Debug Mode</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </MedplumProvider>
  );
}