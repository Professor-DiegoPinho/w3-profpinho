import EvaluationCompletedEmail from '@/components/emails/EvaluationCompletedEmail';
import ProjectSubmissionEmail from '@/components/emails/ProjectSubmissionEmail';
import { render } from '@react-email/components';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'noreply@profpinho.com',
  FROM_NAME:  process.env.RESEND_FROM_NAME || 'Prof. Diego Pinho',
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
      subject: `Projeto entregue com sucesso!`,
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
 * Send evaluation completed notification email
 * @param {Object} params - Email parameters
 * @param {string} params.recipientEmail - Recipient email address
 * @param {string} params.studentName - Student name
 * @param {string} params.courseName - Course name
 * @param {string} params.completionDate - Completion date
 * @returns {Promise<Object>} Resend response
 */
export async function sendEvaluationCompletedEmail({
  recipientEmail,
  studentName,
  courseName,
  completionDate,
}) {
  try {
    if (!recipientEmail) {
      throw new Error('Recipient email is required');
    }

    // Render React Email component to HTML
    const emailHtml = await render(
      <EvaluationCompletedEmail
        studentName={studentName}
        courseName={courseName}
        completionDate={completionDate}
      />,
      {
        pretty: true,
      }
    );

    const response = await resend.emails.send({
      from: `${EMAIL_CONFIG.FROM_NAME} <${EMAIL_CONFIG.FROM_EMAIL}>`,
      to: recipientEmail,
      subject: `Avaliação finalizada - ${courseName}`,
      html: emailHtml,
      replyTo: 'support@profpinho.com',
    });

    if (response.error) {
      console.error('Email sending error:', response.error);
      throw new Error(`Failed to send email: ${response.error.message}`);
    }

    console.log(`✓ Evaluation completed email sent to ${recipientEmail}`, {
      emailId: response.data.id,
      studentName,
      courseName,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('❌ Error sending evaluation completed email:', {
      recipientEmail,
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
  sendEvaluationCompletedEmail,
  sendBatchEmails,
};

export default emailExports;
