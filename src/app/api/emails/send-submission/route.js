import { sendProjectSubmissionEmail } from '@/lib/emails';
import { NextResponse } from 'next/server';

/**
 * POST /api/emails/send-submission
 * Sends a project submission confirmation email
 * 
 * Request body:
 * {
 *   "recipientEmail": "student@example.com",
 *   "studentName": "John Doe",
 *   "courseName": "Web Development 101",
 *   "projectName": "Portfolio Website",
 *   "submissionDate": "2024-04-09"
 * }
 */
export async function POST(request) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const { recipientEmail, studentName, courseName, projectName, submissionDate } = body;

    if (!recipientEmail) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'recipientEmail'
        },
        { status: 400 }
      );
    }

    if (!studentName) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'studentName'
        },
        { status: 400 }
      );
    }

    if (!courseName) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'courseName'
        },
        { status: 400 }
      );
    }

    if (!projectName) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'projectName'
        },
        { status: 400 }
      );
    }

    if (!submissionDate) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'submissionDate'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          field: 'recipientEmail'
        },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send the email
    const result = await sendProjectSubmissionEmail({
      recipientEmail,
      studentName,
      courseName,
      projectName,
      submissionDate,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Submission confirmation email sent successfully',
        emailId: result.data.id,
        recipient: recipientEmail,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in send-submission endpoint:', error);

    // Handle Resend-specific errors
    if (error.message && error.message.includes('Resend')) {
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: error.message
        },
        { status: 500 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send submission email.' },
    { status: 405 }
  );
}
