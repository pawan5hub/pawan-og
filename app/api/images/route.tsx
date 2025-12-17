import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Theme configurations matching your CSS
const themes = {
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
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get parameters
    const title = searchParams.get("title") || "Welcome to My Blog";
    const subtitle = searchParams.get("subtitle") || "";
    const themeName = (searchParams.get("theme") || "charcoal") as keyof typeof themes;
    const author = searchParams.get("author") || "Your Name";
    const date = searchParams.get("date") || "";

    // Get theme colors
    const theme = themes[themeName] || themes.charcoal;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background: `linear-gradient(135deg, ${theme.bgGradientStart} 0%, ${theme.bgGradientMid} 50%, ${theme.bgGradientEnd} 100%)`,
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/* Animated background elements */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.primary}33 0%, transparent 70%)`,
              filter: "blur(60px)",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              right: "-150px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.accent}33 0%, transparent 70%)`,
              filter: "blur(80px)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              right: "10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.secondary}44 0%, transparent 70%)`,
              filter: "blur(70px)",
              opacity: 0.4,
            }}
          />

          {/* Decorative grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(${theme.primary}11 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}11 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              opacity: 0.15,
            }}
          />

          {/* Main content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "80px 100px",
              height: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                width: "120px",
                height: "6px",
                background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                marginBottom: "40px",
                borderRadius: "3px",
                boxShadow: `0 0 20px ${theme.glowColor}`,
              }}
            />

            {/* Title */}
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: theme.textPrimary,
                lineHeight: 1.1,
                marginBottom: subtitle ? 30 : 50,
                maxWidth: "900px",
                display: "flex",
                textShadow: `0 4px 20px ${theme.shadowColor}, 0 0 40px ${theme.glowColor}`,
                letterSpacing: "-2px",
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 400,
                  color: theme.textSecondary,
                  lineHeight: 1.4,
                  maxWidth: "850px",
                  display: "flex",
                  marginBottom: "50px",
                  letterSpacing: "-0.5px",
                }}
              >
                {subtitle}
              </div>
            )}

            {/* Author and date section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "auto",
                gap: "20px",
              }}
            >
              {/* Author avatar */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: theme.background,
                  boxShadow: `0 0 30px ${theme.glowColor}`,
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>

              {/* Author info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: theme.textPrimary,
                    display: "flex",
                  }}
                >
                  {author}
                </div>
                {date && (
                  <div
                    style={{
                      fontSize: 20,
                      color: theme.textMuted,
                      display: "flex",
                    }}
                  >
                    {date}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 50%, ${theme.secondary} 100%)`,
              boxShadow: `0 -2px 30px ${theme.glowColor}`,
            }}
          />

          {/* Corner decoration */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "100px",
              display: "flex",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: theme.primary,
                boxShadow: `0 0 15px ${theme.primary}`,
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: theme.accent,
                boxShadow: `0 0 15px ${theme.accent}`,
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: theme.secondary,
                boxShadow: `0 0 15px ${theme.secondary}`,
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}