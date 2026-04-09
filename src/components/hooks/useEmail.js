/**
 * useEmail Hook
 * 
 * Custom React hook for sending emails from the client side
 * 
 * Usage:
 * const { sendSubmissionEmail, sendEvaluationEmail, loading, error } = useEmail();
 * 
 * // Send submission email
 * await sendSubmissionEmail({
 *   recipientEmail: 'student@example.com',
 *   studentName: 'John Doe',
 *   courseName: 'Web Dev 101',
 *   projectName: 'Portfolio',
 *   submissionDate: '2024-04-09'
 * });
 */

'use client';

import { useState } from 'react';

export function useEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [lastEmailId, setLastEmailId] = useState(null);

  /**
   * Send project submission confirmation email
   */
  const sendSubmissionEmail = async (params) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!params.recipientEmail) throw new Error('recipientEmail is required');
      if (!params.studentName) throw new Error('studentName is required');
      if (!params.courseName) throw new Error('courseName is required');
      if (!params.projectName) throw new Error('projectName is required');
      if (!params.submissionDate) throw new Error('submissionDate is required');

      const response = await fetch('/api/emails/send-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await response.json();
      setLastEmailId(data.emailId);
      setSuccess(true);

      return {
        success: true,
        emailId: data.emailId,
        message: data.message,
      };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while sending email';
      setError(errorMessage);
      console.error('Error sending submission email:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send evaluation results email
   */
  const sendEvaluationEmail = async (params) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!params.recipientEmail) throw new Error('recipientEmail is required');
      if (!params.studentName) throw new Error('studentName is required');
      if (!params.courseName) throw new Error('courseName is required');
      if (!params.projectName) throw new Error('projectName is required');
      if (!params.evaluationDate) throw new Error('evaluationDate is required');
      if (params.score === undefined || params.score === null) {
        throw new Error('score is required');
      }

      // Validate score
      const scoreNum = Number(params.score);
      if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        throw new Error('score must be a number between 0 and 100');
      }

      const response = await fetch('/api/emails/send-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await response.json();
      setLastEmailId(data.emailId);
      setSuccess(true);

      return {
        success: true,
        emailId: data.emailId,
        message: data.message,
        score: data.score,
      };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while sending email';
      setError(errorMessage);
      console.error('Error sending evaluation email:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset state
   */
  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setLastEmailId(null);
  };

  return {
    sendSubmissionEmail,
    sendEvaluationEmail,
    loading,
    error,
    success,
    lastEmailId,
    reset,
  };
}

export default useEmail;
