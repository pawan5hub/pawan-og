import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Default values
const DEFAULT_VALUES = {
  title: "I'm Pawan — Explore My Portfolio",
  subtitle: '[.Net Core · Cloud AWS · Microservices · Angular · React]',
  desc: '11+ years of experience designing, developing, and deploying enterprise-grade web applications and now advancing towards AI & ML based solutions.',
  author: 'https://pawan.net.in',
  date: '',
  readtime: '',
  theme: 'charcoal',
  status: 'Open to Opportunities',
  msg: 'Turning Concepts Into Code & Creations'
};

// Theme configurations
const THEMES = {
  charcoal: {
    primary: "#00ffcc",
    secondary: "#1a2f2f",
    accent: "#c1ff90",
    background: "#1a1a1a",
    surface: "#151b23",
    textPrimary: "#e6e6e6",
    textSecondary: "#888888",
    textMuted: "#8a8a8a",
    bgGradientStart: "#1f2d2d",
    bgGradientMid: "#1a2424",
    bgGradientEnd: "#1a1a1a",
    glowColor: "rgba(0, 255, 204, 0.4)",
    shadowColor: "rgba(0, 255, 204, 0.3)",
    icon: "https://pawan.net.in/assets/images/icons/charcoal_32x32.png",
  },
  lavender: {
    primary: "#c084fc",
    secondary: "#6b21a8",
    accent: "#f14fff",
    background: "#1a0f2e",
    surface: "#241738",
    textPrimary: "#f3e8ff",
    textSecondary: "#c4b5fd",
    textMuted: "#9ca3af",
    bgGradientStart: "#2d1f47",
    bgGradientMid: "#241b32",
    bgGradientEnd: "#1a0f2e",
    glowColor: "rgba(192, 132, 252, 0.4)",
    shadowColor: "rgba(192, 132, 252, 0.3)",
    icon: "https://pawan.net.in/assets/images/icons/lavender_32x32.png",
  },
  pearl: {
    primary: "#f59e0b",
    secondary: "#d97706",
    accent: "#b94d26",
    background: "#f0f4f8",
    surface: "#f8fafb",
    textPrimary: "#2c3e50",
    textSecondary: "#546e7a",
    textMuted: "#90a4ae",
    bgGradientStart: "#e8ecf0",
    bgGradientMid: "#f0f4f8",
    bgGradientEnd: "#f8fafb",
    glowColor: "rgba(245, 158, 11, 0.3)",
    shadowColor: "rgba(245, 158, 11, 0.2)",
    icon: "https://pawan.net.in/assets/images/icons/pearl_32x32.png",
  },
};

function decodeBase64Url(token: string): Record<string, string> {
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decoded = atob(base64);
    
    const params: Record<string, string> = {};
    decoded.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    return params;
  } catch (error) {
    console.error('Failed to decode base64:', error);
    return {};
  }
}

function isBase64Url(str: string): boolean {
  return /^[A-Za-z0-9\-_]+$/.test(str) && str.length > 20;
}

type Params = Promise<{ slug?: string }> | { slug?: string };

export async function GET(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Handle both Next.js 15+ (async params) and Next.js 14 (sync params)
    const resolvedParams = context.params instanceof Promise 
      ? await context.params 
      : context.params;
    
    const rawSlug = resolvedParams?.slug;
    const slug = rawSlug?.replace(/\.png$/, '') || 'default';

    let ogData = { ...DEFAULT_VALUES };
    let isBase64Slug = false;

    // Check if slug is base64 and decode it first
    if (slug !== 'default' && isBase64Url(slug)) {
      const decodedParams = decodeBase64Url(slug);
      isBase64Slug = true;
      
      ogData = {
        title: decodedParams.title || ogData.title,
        subtitle: decodedParams.subtitle || ogData.subtitle,
        desc: decodedParams.desc || ogData.desc,
        author: decodedParams.author || 'https://pawan.net.in',
        date: decodedParams.date || '',
        readtime: decodedParams.readtime || '',
        theme: decodedParams.theme || ogData.theme,
        status: 'Open to Opportunities',
        msg: decodedParams.msg || 'https://pawan.net.in'
      };
    }

    // Priority: Query param theme overrides everything (including base64 theme)
    const themeParam = searchParams.get('theme');
    if (themeParam && THEMES[themeParam as keyof typeof THEMES]) {
      ogData.theme = themeParam;
    }

    const theme = THEMES[ogData.theme as keyof typeof THEMES] || THEMES.charcoal;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
            background: `linear-gradient(135deg, ${theme.bgGradientStart} 0%, ${theme.bgGradientMid} 50%, ${theme.bgGradientEnd} 100%)`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Decorative line - top left with gradient and glow */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              width: '120px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
              borderRadius: '2px',
              display: 'flex',
              boxShadow: `0 0 20px ${theme.glowColor}, 0 0 40px ${theme.glowColor}`,
            }}
          />
          
          {/* Decorative dots - top right with glow */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '60px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: theme.primary,
                display: 'flex',
                boxShadow: `0 0 15px ${theme.glowColor}, 0 0 30px ${theme.glowColor}`,
              }}
            />
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: theme.accent,
                display: 'flex',
                boxShadow: `0 0 15px ${theme.shadowColor}, 0 0 30px ${theme.shadowColor}`,
              }}
            />
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: theme.textMuted,
                display: 'flex',
                boxShadow: `0 0 10px ${theme.textMuted}80`,
              }}
            />
          </div>

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: '80px 60px 60px 60px',
            }}
          >
            {/* Left Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'space-between',
                paddingRight: '20px',
                maxWidth: isBase64Slug ? '100%' : '750px',
              }}
            >
              {/* Top Content */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <div
                  style={{
                    fontSize: '58px',
                    fontWeight: '700',
                    color: theme.textPrimary,
                    lineHeight: 1.1,
                    marginBottom: '20px',
                    display: 'flex',
                  }}
                >
                  {ogData.title}
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    fontSize: '26px',
                    color: theme.textSecondary,
                    marginBottom: '30px',
                    fontWeight: '400',
                    display: 'flex',
                  }}
                >
                  {ogData.subtitle || ' '}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: '22px',
                    color: theme.textMuted,
                    lineHeight: 1.6,
                    display: 'flex',
                  }}
                >
                  {ogData.desc || ' '}
                </div>
              </div>

              {/* Bottom Content - Footer */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Author and Status/DateTime Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Author Info */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    {/* Logo Icon */}
                    <img
                      src={theme.icon}
                      width="32"
                      height="32"
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          fontSize: '20px',
                          color: theme.textPrimary,
                          fontWeight: '600',
                          display: 'flex',
                        }}
                      >
                        {ogData.author}
                      </div>
                      <div
                        style={{
                          fontSize: '16px',
                          color: theme.textMuted,
                          display: 'flex',
                        }}
                      >
                        {ogData.msg}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Date/Reading Time only for base64 */}
                  {isBase64Slug && (ogData.date || ogData.readtime) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                      {ogData.date && (
                        <div
                          style={{
                            fontSize: '18px',
                            color: theme.textMuted,
                            display: 'flex',
                          }}
                        >
                          📆 Published: {ogData.date}
                        </div>
                      )}
                      {ogData.readtime && (
                        <div
                          style={{
                            fontSize: '18px',
                            color: theme.textMuted,
                            display: 'flex',
                          }}
                        >
                          🕒 {ogData.readtime} read
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Profile Image Container - Only show for default/non-base64 slugs */}
            {!isBase64Slug && (
              <div
                style={{
                  position: 'absolute',
                  right: '1px',
                  bottom: '0',
                  height: '630px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Inner container for image and gradients */}
                <div
                  style={{
                    position: 'relative',
                    height: '630px',
                    width: '350px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Profile Image */}
                  <img
                    src="https://pawan.net.in/assets/images/profile-wbg2.png"
                    width="300"
                    height="330"
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      objectFit: 'cover',
                      objectPosition: 'center bottom',
                    }}
                  />
                  
                  {/* Bottom gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '280px',
                      background: `linear-gradient(to top, ${theme.bgGradientEnd} 0%, ${theme.bgGradientEnd}f8 15%, ${theme.bgGradientEnd}e6 30%, ${theme.bgGradientEnd}b8 50%, ${theme.bgGradientEnd}80 70%, ${theme.bgGradientEnd}40 85%, transparent 100%)`,
                      display: 'flex',
                    }}
                  />
                  
                  {/* Left gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      top: '0',
                      width: '200px',
                      background: `linear-gradient(to right, ${theme.bgGradientEnd} 0%, ${theme.bgGradientEnd}f0 20%, ${theme.bgGradientEnd}c0 40%, ${theme.bgGradientEnd}80 60%, ${theme.bgGradientEnd}40 80%, transparent 100%)`,
                      display: 'flex',
                    }}
                  />
                  
                  {/* HIRE READY badge centered at bottom of image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '18px',
                      color: theme.primary,
                      background: `${theme.primary}15`,
                      padding: '10px 24px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      border: `2px solid ${theme.primary}40`,
                      display: 'flex',
                      boxShadow: `0 0 20px ${theme.glowColor}`,
                    }}
                  >
                    {ogData.status}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            fontSize: '40px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          ⧉ EXplore PaWaN's Portfolio
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}