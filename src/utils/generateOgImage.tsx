import satori, { SatoriOptions } from "satori";
import { SITE } from "@config";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const ogImage = (text: string) => {
  return (
    <div
      style={{
        background: "#fefbfb",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          background: "#fefbfb",
          boxShadow:
            " 0px 30px 60px -12px inset rgba(50, 50, 93, 0.25), 0px 18px 36px -18px inset rgba(0, 0, 0, 0.3)",
          // boxShadow:
          //   "3px 3px 6px 0px inset rgb(204, 219, 232) ,  -3px -3px 6px 1px inset rgba(255, 255, 255, 0.5)",
          // boxShadow:
          //   "0px 2px 4px rgba(0, 0, 0, 0.4) ,  0px 7px 13px -3px rgba(0, 0, 0, 0.3),  0px -3px 0px inset rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "85%",
          height: "75%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "85%",
            height: "90%",
          }}
        >
          <p
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#006cac",
              maxHeight: "84%",
              overflow: "hidden",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "#fefbfb",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                {SITE.author}
              </span>
            </span>

            <span style={{ overflow: "hidden", fontWeight: "bold" }}>
              {SITE.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  // debug: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

const generateOgImage = async (mytext = SITE.title) =>
  await satori(ogImage(mytext), options);

export default generateOgImage;
