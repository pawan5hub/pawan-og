import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string }> | { slug?: string } }
) {
  try {
    // Step 1: Test params resolution
    let slug: string;
    try {
      const resolvedParams = context.params instanceof Promise 
        ? await context.params 
        : context.params;
      slug = resolvedParams?.slug || 'default';
    } catch (e) {
      return Response.json({ 
        error: 'Params resolution failed', 
        details: e instanceof Error ? e.message : String(e) 
      }, { status: 500 });
    }

    // Step 2: Test basic ImageResponse (no external images)
    try {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1f2d2d 0%, #1a2424 50%, #1a1a1a 100%)',
              fontFamily: 'system-ui, sans-serif',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ 
              fontSize: '60px', 
              fontWeight: 'bold', 
              color: '#00ffcc',
              display: 'flex'
            }}>
              ✓ Test Successful
            </div>
            <div style={{ 
              fontSize: '30px', 
              color: '#e6e6e6',
              display: 'flex'
            }}>
              Slug: {slug}
            </div>
            <div style={{ 
              fontSize: '20px', 
              color: '#888888',
              display: 'flex'
            }}>
              Pawan's OG Image Generator
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    } catch (e) {
      return Response.json({ 
        error: 'ImageResponse generation failed', 
        details: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined
      }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ 
      error: 'Outer catch - Unknown error', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}