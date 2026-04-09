import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default function EvaluationResultsEmail({
  studentName = 'Aluno',
  courseName = 'Curso',
  projectName = 'Projeto',
  evaluationDate = new Date().toLocaleDateString('pt-BR'),
  score = 0,
  feedback = '',
}) {
  const getScoreColor = (score) => {
    if (score >= 85) return '#04AA6D'; // green - site palette
    if (score >= 70) return '#FFBE15'; // yellow - site palette
    return '#F34C61'; // red - site palette
  };

  const getScoreMessage = (score) => {
    if (score >= 85) return 'Excelente envio! 🎉';
    if (score >= 70) return 'Bom trabalho! 👍';
    return 'Há pontos a melhorar. Revise o feedback! 📝';
  };

  const resultsUrl = `${baseUrl}/submissions`;
  const scoreColor = getScoreColor(score);

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Sua avaliação está disponível!</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>📊 Sua Avaliação Está Disponível!</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Olá {studentName},</Text>

            <Text style={paragraph}>
              A avaliação do seu projeto <strong>"{projectName}"</strong> foi concluída! O resultado
              agora está disponível em sua conta na plataforma.
            </Text>

            {/* Score Card */}
            <Section style={{ ...scoreCard, borderColor: scoreColor }}>
              <Text style={scoreLabel}>Sua Nota</Text>
              <Text style={{ ...scoreNumber, color: scoreColor }}>{score}</Text>
              <Text style={scoreDescription}>{getScoreMessage(score)}</Text>
            </Section>

            {/* Info Box */}
            <Section style={infoBox}>
              <Row>
                <Column style={infoColumn}>
                  <Text style={infoLabel}>Curso:</Text>
                </Column>
                <Column style={infoColumn}>
                  <Text style={infoValue}>{courseName}</Text>
                </Column>
              </Row>

              <Row>
                <Column style={infoColumn}>
                  <Text style={infoLabel}>Projeto:</Text>
                </Column>
                <Column style={infoColumn}>
                  <Text style={infoValue}>{projectName}</Text>
                </Column>
              </Row>

              <Row>
                <Column style={infoColumn}>
                  <Text style={infoLabel}>Data da Avaliação:</Text>
                </Column>
                <Column style={infoColumn}>
                  <Text style={infoValue}>{evaluationDate}</Text>
                </Column>
              </Row>
            </Section>

            {/* Feedback Section */}
            {feedback && (
              <Section style={feedbackSection}>
                <Text style={feedbackTitle}>💬 Comentários do Avaliador</Text>
                <Text style={feedbackText}>{feedback}</Text>
              </Section>
            )}

            <Text style={paragraph}>
              Clique no botão abaixo para acessar o detalhamento completo da sua avaliação,
              incluindo feedback adicional e sugestões de melhoria.
            </Text>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href={resultsUrl}>
                Ver Resultado Completo
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerContent}>
              © 2024 Prof. Diego Pinho. Todos os direitos reservados.
            </Text>
            <Text style={footerLinks}>
              <Link href={baseUrl} style={link}>
                Voltar à Plataforma
              </Link>
              {' • '}
              <Link href={`${baseUrl}/ajuda`} style={link}>
                Ajuda
              </Link>
              {' • '}
              <Link href={`${baseUrl}/privacidade`} style={link}>
                Privacidade
              </Link>
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

const scoreCard = {
  backgroundColor: '#f9fafb',
  border: '2px solid',
  padding: '32px',
  borderRadius: '12px',
  textAlign: 'center',
  marginTop: '24px',
  marginBottom: '24px',
};

const scoreLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#F34C61',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '12px',
};

const scoreNumber = {
  fontSize: '48px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1',
};

const scoreDescription = {
  fontSize: '14px',
  color: '#666666',
  marginTop: '12px',
};

const infoBox = {
  backgroundColor: '#F6F6FD',
  borderLeft: '4px solid #F34C61',
  padding: '20px',
  borderRadius: '4px',
  marginTop: '24px',
  marginBottom: '24px',
};

const infoColumn = {
  paddingRight: '12px',
};

const infoLabel = {
  fontSize: '12px',
  color: '#F34C61',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  margin: '0',
};

const infoValue = {
  fontSize: '14px',
  color: '#333333',
  fontWeight: '500',
  margin: '0',
};

const feedbackSection = {
  backgroundColor: '#fafafa',
  border: '1px dashed #ddd',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '24px',
  marginBottom: '24px',
};

const feedbackTitle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#333333',
  marginBottom: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const feedbackText = {
  fontSize: '14px',
  color: '#555555',
  margin: '0',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
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
  color: '#667eea',
  textDecoration: 'underline',
};
