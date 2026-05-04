import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default function ProjectSubmissionEmail({
  studentName = 'Aluno',
  courseName = 'Curso',
  submissionDate = new Date().toLocaleDateString('pt-BR'),
}) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Seu projeto foi entregue com sucesso!</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>✅ Projeto Entregue com Sucesso!</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Olá {studentName},</Text>

            <Text style={paragraph}>
              Sua submissão foi recebida com sucesso. Seu projeto agora está em avaliação e você será
              notificado assim que o resultado estiver pronto.
            </Text>

            {/* Status Badge */}
            <Section style={badgeSection}>
              <Text style={statusBadge}>EM AVALIAÇÃO</Text>
            </Section>

            {/* Info Box */}
            <Section style={infoBox}>
              <Text style={infoText}><strong>Aluno:</strong> {studentName}</Text>
              <Text style={infoText}><strong>Curso:</strong> {courseName}</Text>
              <Text style={infoText}><strong>Data de Entrega:</strong> {submissionDate}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href={baseUrl}>
                Acessar plataforma
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerContent}>
              © 2026 Prof. Diego Pinho. Todos os direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Inline Styles
const main = {
  backgroundColor: '#f7fafc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginTop: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#F34C61',
  padding: '40px 20px',
  textAlign: 'center',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '600',
  margin: '0',
  letterSpacing: '-0.5px',
};

const content = {
  padding: '40px 20px',
};

const greeting = {
  fontSize: '16px',
  color: '#333333',
  marginTop: '0',
  marginBottom: '16px',
  fontWeight: '500',
};

const paragraph = {
  fontSize: '14px',
  color: '#4b5563',
  lineHeight: '1.6',
  marginTop: '12px',
  marginBottom: '12px',
};

const badgeSection = {
  textAlign: 'center',
  marginTop: '24px',
  marginBottom: '24px',
};

const statusBadge = {
  backgroundColor: '#FFF176',
  color: '#2A2836',
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  display: 'inline-block',
  letterSpacing: '0.5px',
};

const infoBox = {
  backgroundColor: '#F6F6FD',
  borderLeft: '4px solid #F34C61',
  padding: '20px',
  borderRadius: '4px',
  marginTop: '24px',
  marginBottom: '24px',
};

const infoText = {
  fontSize: '14px',
  color: '#2A2836',
  margin: '8px 0',
  lineHeight: '1.5',
};

const buttonSection = {
  textAlign: 'center',
  marginTop: '32px',
  marginBottom: '32px',
};

const button = {
  backgroundColor: '#F34C61',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 32px',
  border: '1px solid #F34C61',
};

const footerText = {
  fontSize: '13px',
  color: '#718096',
  lineHeight: '1.6',
  marginTop: '16px',
  marginBottom: '16px',
};

const footer = {
  backgroundColor: '#f7fafc',
  padding: '24px 20px',
  textAlign: 'center',
  borderTop: '1px solid #e2e8f0',
};

const footerContent = {
  fontSize: '12px',
  color: '#718096',
  margin: '0',
  marginBottom: '8px',
};

const footerLinks = {
  fontSize: '12px',
  color: '#718096',
  margin: '0',
};

const link = {
  color: '#F34C61',
  textDecoration: 'underline',
};
