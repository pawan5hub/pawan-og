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

// Helper function to calculate dynamic font sizes
function calculateFontSizes(
  title: string,
  subtitle: string,
  desc: string,
  hasImage: boolean
) {
  const titleLength = title.length;
  const subtitleLength = subtitle.length;
  const descLength = desc.length;

  // Calculate title size (base: 80, min: 48, max: 80)
  let titleSize = 80;
  if (titleLength > 50) titleSize = 48;
  else if (titleLength > 30) titleSize = 60;
  else if (titleLength > 20) titleSize = 70;

  // Calculate subtitle size (base: 38, min: 24, max: 38)
  let subtitleSize = 38;
  if (subtitleLength > 80) subtitleSize = 24;
  else if (subtitleLength > 50) subtitleSize = 28;
  else if (subtitleLength > 30) subtitleSize = 32;

  // Calculate description size (base: 24, min: 18, max: 24)
  let descSize = 24;
  if (descLength > 150) descSize = 18;
  else if (descLength > 100) descSize = 20;
  else if (descLength > 80) descSize = 22;

  // Adjust max widths based on whether image is present
  const maxWidth = hasImage ? "650px" : "950px";

  return {
    titleSize,
    subtitleSize,
    descSize,
    maxWidth,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if any query params other than 'theme' are provided
    const paramsWithoutTheme = Array.from(searchParams.keys()).filter(
      (key) => key !== "theme"
    );
    const hasQueryParams = paramsWithoutTheme.length > 0;

    // Get parameters with conditional defaults
    const title =
      searchParams.get("title") ||
      (hasQueryParams ? "Welcome to My Blog" : "Welcome to My Portfolio");
    const subtitle =
      searchParams.get("subtitle") ||
      (hasQueryParams ? "" : "I'm Pawan — Lead .NET Full-Stack Developer");
    const desc =
      searchParams.get("desc") ||
      (hasQueryParams
        ? ""
        : "11+ years of experience designing, developing, and deploying enterprise-grade web applications and now advancing towards AI & ML based solutions.");
    const themeName = (searchParams.get("theme") || "charcoal") as keyof typeof themes;
    const author = searchParams.get("author") || "Pawan Pandey";
    const date =
      searchParams.get("date") ||
      (hasQueryParams
        ? ""
        : new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }));

    // Get theme colors
    const theme = themes[themeName] || themes.charcoal;

    // Calculate dynamic sizes
    const { titleSize, subtitleSize, descSize, maxWidth } = calculateFontSizes(
      title,
      subtitle,
      desc,
      !hasQueryParams
    );

    // Calculate total content height to determine if we need to hide image
    const estimatedContentHeight =
      titleSize * 1.3 + // title with line height
      (subtitle ? subtitleSize * 1.5 : 0) + // subtitle with spacing
      (desc ? descSize * 1.8 : 0) + // description with spacing
      120 + // author section
      180; // padding and margins

    const shouldShowImage = !hasQueryParams && estimatedContentHeight < 500;

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

          {/* Profile Image - Only when no params and content fits */}
          {shouldShowImage && (
            <div
              style={{
                position: "absolute",
                right: "1px",
                bottom: "0",
                height: "630px",
                width: "350px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                zIndex: 0,
                overflow: "visible",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "630px",
                  width: "350px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src="https://pawan.net.in/assets/images/profile-wbg2.png"
                  width="300"
                  height="330"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    objectFit: "cover",
                    objectPosition: "center bottom",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    height: "280px",
                    background: `linear-gradient(to top, ${theme.bgGradientEnd} 0%, ${theme.bgGradientEnd}f8 15%, ${theme.bgGradientEnd}e6 30%, ${theme.bgGradientEnd}b8 50%, ${theme.bgGradientEnd}80 70%, ${theme.bgGradientEnd}40 85%, transparent 100%)`,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    top: "0",
                    width: "200px",
                    background: `linear-gradient(to right, ${theme.bgGradientEnd} 0%, ${theme.bgGradientEnd}f0 20%, ${theme.bgGradientEnd}c0 40%, ${theme.bgGradientEnd}80 60%, ${theme.bgGradientEnd}40 80%, transparent 100%)`,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Main content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "80px 100px",
              paddingTop: "100px",
              height: "100%",
              position: "relative",
              zIndex: 2,
              maxWidth: "100%",
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
                fontSize: titleSize,
                fontWeight: 900,
                color: theme.textPrimary,
                lineHeight: 1.1,
                marginBottom: subtitle ? 30 : 50,
                maxWidth: maxWidth,
                display: "flex",
                textShadow: `0 4px 20px ${theme.shadowColor}, 0 0 40px ${theme.glowColor}`,
                letterSpacing: titleSize > 60 ? "-2px" : "-1px",
                flexWrap: "wrap",
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  fontSize: subtitleSize,
                  fontWeight: 400,
                  color: theme.textSecondary,
                  lineHeight: 1.4,
                  maxWidth: maxWidth,
                  display: "flex",
                  marginBottom: desc ? "30px" : "50px",
                  letterSpacing: "-0.5px",
                  flexWrap: "wrap",
                }}
              >
                {subtitle}
              </div>
            )}

            {/* Description */}
            {desc && (
              <div
                style={{
                  fontSize: descSize,
                  fontWeight: 300,
                  color: theme.textMuted,
                  lineHeight: 1.5,
                  maxWidth: maxWidth,
                  display: "flex",
                  marginBottom: "50px",
                  letterSpacing: "0px",
                  flexWrap: "wrap",
                }}
              >
                {desc}
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