import { type NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

import { SITE_URL } from "~/src/env";

export async function GET(request: NextRequest) {
  const question =
    request.nextUrl.searchParams.get("question") ??
    "Jsme už digitálním státem?";
  const answer =
    request.nextUrl.searchParams.get("answer") ?? "Bylo to na Slacku.";

  const fontBold: ArrayBuffer = await fetch(
    `${SITE_URL}/memes/fonts/tv_sans_screen_bold.ttf`,
  ).then((res) => res.arrayBuffer());

  const fontRegular: ArrayBuffer = await fetch(
    `${SITE_URL}/memes/fonts/RobotoSlab-Regular.ttf`,
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <img
          src={`${SITE_URL}/memes/images/yen.png`}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          width={1675}
          height={900}
          alt=""
        />
        <h1
          style={{
            position: "absolute",
            left: "105px",
            bottom: "100px",
            fontFamily: "TVSansScreenBold",
            fontSize: "50px",
            backgroundImage: "linear-gradient(90deg, #020076, #0e1fae)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {question}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "305px",
            top: "105px",
            width: "400px",
            height: "300px",
            transform: "rotate(-20deg)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "RobotoSlab",
              fontSize: lengthToSize(answer.length),
              color: "#020320",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    ),
    {
      width: 1675,
      height: 900,
      fonts: [
        {
          name: "TVSansScreenBold",
          data: fontBold,
        },
        {
          name: "RobotoSlab",
          data: fontRegular,
        },
      ],
    },
  );
}

function lengthToSize(length: number): string {
  if (length < 20) {
    return "60px";
  }
  if (length < 40) {
    return "45px";
  }
  if (length < 55) {
    return "40px";
  }
  if (length < 75) {
    return "35px";
  }
  if (length < 95) {
    return "30px";
  }
  if (length < 170) {
    return "20px";
  }
  return "16px";
}
