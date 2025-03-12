import { AppShell } from '@mantine/core';
import { ErrorBoundary, MedplumProvider, useMedplum } from '@medplum/react';
import { MedplumClient } from '@medplum/core';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Router } from './Router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { RegisterPage } from './pages/RegisterPage';
import { SignInPage } from './pages/SignInPage';
import { LandingPage } from './pages/landing';
import { MEDPLUM_SERVER_URL, MEDPLUM_PROJECT_ID } from './config';

// Erstellen einer neuen MedplumClient-Instanz
const medplumClient = new MedplumClient({
  baseUrl: MEDPLUM_SERVER_URL,
  clientId: MEDPLUM_PROJECT_ID,
});

export function App(): JSX.Element {
  return (
    <MedplumProvider medplum={medplumClient}>
      <AppContent />
    </MedplumProvider>
  );
}

function AppContent(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return <Loading />;
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
}
