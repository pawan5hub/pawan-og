import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string }> | { slug?: string } }
) {
  try {
    const resolvedParams = context.params instanceof Promise 
      ? await context.params 
      : context.params;
    
    const slug = resolvedParams?.slug || 'default';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1f2d2d 0%, #1a1a1a 100%)',
            fontFamily: 'system-ui, sans-serif',
            flexDirection: 'column',
            gap: '40px',
            position: 'relative',
          }}
        >
          <div style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#00ffcc',
            display: 'flex'
          }}>
            Testing External Images
          </div>
          
          {/* Test 1: Icon image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src="https://pawan.net.in/assets/images/icons/charcoal_32x32.png"
              width="32"
              height="32"
              alt="icon"
            />
            <div style={{ fontSize: '24px', color: '#e6e6e6', display: 'flex' }}>
              Icon Test
            </div>
          </div>

          {/* Test 2: Profile image */}
          <img
            src="https://pawan.net.in/assets/images/profile-wbg2.png"
            width="200"
            height="220"
            style={{
              objectFit: 'cover',
            }}
            alt="profile"
          />

          <div style={{ 
            fontSize: '20px', 
            color: '#888888',
            display: 'flex'
          }}>
            Slug: {slug}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed', 
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}