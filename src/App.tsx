import { AppShell } from '@mantine/core';
import { ErrorBoundary, useMedplum } from '@medplum/react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Router } from './Router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { RegisterPage } from './pages/RegisterPage';
import { SignInPage } from './pages/SignInPage';
import { LandingPage } from './pages/landing';

export function App(): JSX.Element {
  // Bypass Medplum temporär, um die Anwendung zu zeigen
  try {
    const medplum = useMedplum();
    
    console.log('Medplum Status:', {
      loading: medplum.isLoading(),
      hasProfile: !!medplum.getProfile()
    });

    if (medplum.isLoading()) {
      return <div>Lädt...</div>;
    }

    if (!medplum.getProfile()) {
      return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      );
    }

    return (
      <AppShell header={{ height: 80 }}>
        <Header />
        <AppShell.Main>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        </AppShell.Main>
        <Footer />
      </AppShell>
    );
  } catch (error) {
    console.error('Fehler in App:', error);
    
    // Fallback, wenn Medplum Fehler verursacht
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
}