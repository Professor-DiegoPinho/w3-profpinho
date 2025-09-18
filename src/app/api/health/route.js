import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aqui você pode adicionar verificações mais específicas se necessário
    // Como verificar conexões com banco de dados, APIs externas, etc.

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);

    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    };

    return NextResponse.json(errorData, { status: 503 });
  }
}

// Permitir apenas GET requests
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}