import { MedplumClient } from '@medplum/core';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { LandingPage } from './pages/landing';
import { useMedplum } from '@medplum/react';

export function AppWrapperDebug(): JSX.Element {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const medplum = useMedplum(); // Verwende den übergeordneten MedplumProvider
  
  useEffect(() => {
    console.log('AppWrapperDebug mounted');
    console.log('Medplum Status:', {
      isLoading: medplum.isLoading(),
      hasProfile: !!medplum.getProfile()
    });
    
    // Zeitverzögert den Zustand ändern
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, [medplum]);
  
  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Fehler</h1>
        <p>{error.message}</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h2>Debug-Modus wird geladen...</h2>
        <p>Bitte warten, während wir die Anwendung initialisieren</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Health Pass Debug-Modus</h1>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        marginBottom: '2rem', 
        borderRadius: '4px' 
      }}>
        <h3>Medplum Status:</h3>
        <p>Loading: {medplum.isLoading() ? 'Ja' : 'Nein'}</p>
        <p>Authenticated: {medplum.getProfile() ? 'Ja' : 'Nein'}</p>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}