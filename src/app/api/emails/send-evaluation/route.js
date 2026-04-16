import { getCourse } from '@/lib/courseAccess';
import { sendEvaluationResultsEmail } from '@/lib/emails';
import { NextResponse } from 'next/server';

/**
 * POST /api/emails/send-evaluation
 * Sends an evaluation results email
 * 
 * Request body:
 * {
 *   "recipientEmail": "student@example.com",
 *   "studentName": "John Doe",
 *   "courseName": "Web Development 101",
 *   "projectName": "Portfolio Website",
 *   "evaluationDate": "2024-04-09",
 *   "score": 92,
 *   "feedback": "Great work! Your code is clean and well-organized..."
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
    const { 
      recipientEmail, 
      studentName, 
      courseName,
      courseSlug,
      projectName, 
      evaluationDate, 
      score, 
      feedback 
    } = body;

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

    if (!evaluationDate) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'evaluationDate'
        },
        { status: 400 }
      );
    }

    if (score === undefined || score === null) {
      return NextResponse.json(
        { 
          error: 'Missing required field',
          field: 'score'
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

    // Validate score is a number between 0 and 100
    const scoreNum = Number(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      return NextResponse.json(
        { 
          error: 'Invalid score value. Must be between 0 and 100',
          field: 'score'
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

    // Get correct course name from courseSlug if provided
    let finalCourseName = courseName;
    if (courseSlug) {
      const course = getCourse(courseSlug);
      if (course?.title) {
        finalCourseName = course.title;
      }
    }

    // Send the email
    const result = await sendEvaluationResultsEmail({
      recipientEmail,
      studentName,
      courseName: finalCourseName,
      projectName,
      evaluationDate,
      score: scoreNum,
      feedback: feedback || null,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Evaluation results email sent successfully',
        emailId: result.data.id,
        recipient: recipientEmail,
        score: scoreNum,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in send-evaluation endpoint:', error);

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
    { error: 'Method not allowed. Use POST to send evaluation email.' },
    { status: 405 }
  );
}
