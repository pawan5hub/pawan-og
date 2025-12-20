export const runtime = 'edge';

export async function GET() {
  return Response.json({ 
    message: 'API is working',
    env: process.env.NODE_ENV,
    vercel: process.env.VERCEL === '1' ? 'yes' : 'no'
  });
}