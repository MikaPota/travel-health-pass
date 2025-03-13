import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
import '@medplum/react/styles.css';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/responsive.css';
import './styles/header.css';
import './styles/forms.css';
import './styles/cards.css';
import './styles/qrcode.css';
import { AppWrapperDebug } from './AppWrapperDebug';

// Erstelle einen neuen MedplumClient mit expliziten Optionen für besseres Debugging
const medplum = new MedplumClient({
  onUnauthenticated: () => {
    console.log('Medplum: Nicht authentifiziert');
    // Keine Weiterleitung, um Debug-Modus zu ermöglichen
  },
  // Die debug-Eigenschaft entfernen, da sie nicht Teil von MedplumClientOptions ist
});

const theme = createTheme({
  primaryColor: 'teal',
  primaryShade: 8,
  fontSizes: {
    xs: '0.6875rem',
    sm: '0.875rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
  },
  components: {
    Container: {
      defaultProps: {
        size: 1200,
      },
    },
  },
});

const container = document.getElementById('root');

// Überprüfe, ob das Element existiert
if (!container) {
  throw new Error('Root element not found');
}

// Root erstellen und App rendern
const root = createRoot(container);

// Debug-Komponente mit vereinfachter Struktur verwenden
root.render(
  <StrictMode>
    <BrowserRouter>
      <MedplumProvider medplum={medplum}>
        <MantineProvider theme={theme}>
          <Notifications />
          <AppWrapperDebug />
        </MantineProvider>
      </MedplumProvider>
    </BrowserRouter>
  </StrictMode>
);

// Füge Debug-Info zur Konsole hinzu
console.log('Debug-Modus aktiv', {
  zeit: new Date().toISOString(),
  environment: process.env.NODE_ENV
});
