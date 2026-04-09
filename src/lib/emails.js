import EvaluationResultsEmail from '@/components/emails/EvaluationResultsEmail';
import ProjectSubmissionEmail from '@/components/emails/ProjectSubmissionEmail';
import { render } from '@react-email/components';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'noreply@profpinho.com',
  FROM_NAME: 'Prof. Diego Pinho',
};

/**
 * Send project submission confirmation email
 * @param {Object} params - Email parameters
 * @param {string} params.recipientEmail - Recipient email address
 * @param {string} params.studentName - Student name
 * @param {string} params.courseName - Course name
 * @param {string} params.submissionDate - Submission date
 * @returns {Promise<Object>} Resend response
 */
export async function sendProjectSubmissionEmail({
  recipientEmail,
  studentName,
  courseName,
  submissionDate,
}) {
  try {
    if (!recipientEmail) {
      throw new Error('Recipient email is required');
    }

    // Render React Email component to HTML
    const emailHtml = await render(
      <ProjectSubmissionEmail
        studentName={studentName}
        courseName={courseName}
        submissionDate={submissionDate}
      />,
      {
        pretty: true,
      }
    );

    const response = await resend.emails.send({
      from: `${EMAIL_CONFIG.FROM_NAME} <${EMAIL_CONFIG.FROM_EMAIL}>`,
      to: recipientEmail,
      subject: `✓ Projeto entregue com sucesso!`,
      html: emailHtml,
      replyTo: 'support@profpinho.com',
    });

    if (response.error) {
      console.error('Email sending error:', response.error);
      throw new Error(`Failed to send email: ${response.error.message}`);
    }

    console.log(`✓ Project submission email sent to ${recipientEmail}`, {
      emailId: response.data.id,
      studentName,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('❌ Error sending project submission email:', {
      recipientEmail,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

/**
 * Send evaluation results email
 * @param {Object} params - Email parameters
 * @param {string} params.recipientEmail - Recipient email address
 * @param {string} params.studentName - Student name
 * @param {string} params.courseName - Course name
 * @param {string} params.projectName - Project name
 * @param {string} params.evaluationDate - Evaluation date
 * @param {number} params.score - Score/grade (0-100)
 * @param {string} params.feedback - Feedback from evaluator
 * @returns {Promise<Object>} Resend response
 */
export async function sendEvaluationResultsEmail({
  recipientEmail,
  studentName,
  courseName,
  projectName,
  evaluationDate,
  score,
  feedback,
}) {
  try {
    if (!recipientEmail) {
      throw new Error('Recipient email is required');
    }

    if (score === undefined || score === null) {
      throw new Error('Score is required');
    }

    // Validate score is between 0-100
    if (score < 0 || score > 100) {
      throw new Error('Score must be between 0 and 100');
    }

    // Render React Email component to HTML
    const emailHtml = await render(
      <EvaluationResultsEmail
        studentName={studentName}
        courseName={courseName}
        projectName={projectName}
        evaluationDate={evaluationDate}
        score={score}
        feedback={feedback}
      />,
      {
        pretty: true,
      }
    );

    const response = await resend.emails.send({
      from: `${EMAIL_CONFIG.FROM_NAME} <${EMAIL_CONFIG.FROM_EMAIL}>`,
      to: recipientEmail,
      subject: `📊 Resultado da avaliação disponível - ${projectName}`,
      html: emailHtml,
      replyTo: 'support@profpinho.com',
    });

    if (response.error) {
      console.error('Email sending error:', response.error);
      throw new Error(`Failed to send email: ${response.error.message}`);
    }

    console.log(`✓ Evaluation email sent to ${recipientEmail}`, {
      emailId: response.data.id,
      studentName,
      projectName,
      score,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('❌ Error sending evaluation results email:', {
      recipientEmail,
      score,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

/**
 * Send batch emails (for administrative purposes)
 * @param {Array<Object>} emails - Array of email objects with type and params
 * @returns {Promise<Array>} Array of responses
 * @example
 * sendBatchEmails([
 *   { type: 'submission', params: { recipientEmail, studentName, ... } },
 *   { type: 'evaluation', params: { recipientEmail, studentName, score, ... } }
 * ])
 */
export async function sendBatchEmails(emails) {
  try {
    const responses = await Promise.all(
      emails.map((email) => {
        if (email.type === 'submission') {
          return sendProjectSubmissionEmail(email.params);
        } else if (email.type === 'evaluation') {
          return sendEvaluationResultsEmail(email.params);
        } else {
          throw new Error(`Unknown email type: ${email.type}`);
        }
      })
    );

    console.log(`✓ Batch emails sent successfully`, {
      total: emails.length,
      timestamp: new Date().toISOString(),
    });

    return responses;
  } catch (error) {
    console.error(`❌ Error sending batch emails:`, {
      total: emails.length,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

const emailExports = {
  sendProjectSubmissionEmail,
  sendEvaluationResultsEmail,
  sendBatchEmails,
};

export default emailExports;
