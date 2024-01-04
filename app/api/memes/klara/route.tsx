import { type NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

import { SITE_URL } from "~/src/env";

export async function GET(request: NextRequest) {
  const question =
    request.nextUrl.searchParams.get("question") ??
    "Systém varující před nebezpečím";
  const answer =
    request.nextUrl.searchParams.get("answer") ??
    "Na to nejsem odborník, ale bylo to na Slacku.";

  const fontBold = await fetch(
    `${SITE_URL}/memes/fonts/tv_sans_screen_bold.ttf`,
  ).then((res) => res.arrayBuffer());

  const fontRegular = await fetch(
    `${SITE_URL}/memes/fonts/RobotoSlab-Regular.ttf`,
  ).then((res) => res.arrayBuffer());

  const image = new ImageResponse(
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
          src={`${SITE_URL}/memes/images/klara-2.png`}
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
            bottom: "80px",
            fontFamily: "TVSansScreenBold",
            fontSize: "50px",
            backgroundImage: "linear-gradient(90deg, #102d91, #367ac2)",
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
            left: "645px",
            top: "25px",
            width: "380px",
            height: "280px",
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
  return image;
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
