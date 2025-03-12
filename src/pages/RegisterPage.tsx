import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { RegisterForm } from '@medplum/react';
import { useNavigate } from 'react-router';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  
  // Test-Key für recaptcha
  // Dieser Schlüssel wird von Google für Testzwecke bereitgestellt
  const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Box pt={100} pb={200} p="2rem">
        <RegisterForm
          type="patient"
          projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          recaptchaSiteKey={TEST_SITE_KEY} // Test-Schlüssel verwenden
          onSuccess={() => navigate('/')?.catch(console.error)}
        >
          <h2>Register with My Health Pass</h2>
        </RegisterForm>
      </Box>
      <div className="background-image-container">
        <BackgroundImage 
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80"
        />
      </div>
    </SimpleGrid>
  );
}
