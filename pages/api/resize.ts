/*
 *
 * Image resizing service using https://sharp.pixelplumbing.com/
 * Inspired by https://github.com/Ohlasy/web/blob/master/api/resize.ts
 *
 * Basic features:
 *
 * + Resize source URL to given width, keeping aspect ratio
 * + Keep the image in the source format (PNG or JPEG)
 *
 * Security:
 *
 * + Check for reasonable input image size
 * + Check for reasonable output image size
 * + Process only images from constant origin
 *
 * Bonus features:
 *
 * + Output progressive PNGs and JPEGs
 */
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import sharp from "sharp";

const maxInputFileSize = 30_000_000;
const maxInputPixelSize = 7_000;
const maxOutputPixelSize = 7_000;

const imageAllowedOrigin = "https://data.cesko.digital";

class ValidationError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
  }
}

interface ProcessedQueryParams {
  srcUrl: string;
  width: number;
  strWidth: string;
}

interface processedImage {
  contentType: string;
  processedImage: Buffer;
}

// Request validation
function prepareDataFromRequest(request: NextApiRequest): ProcessedQueryParams {
  // Validate request method - not worth extracting to a separate function
  if (request.method !== "GET" && request.method !== "HEAD") {
    throw new ValidationError("Only GET/HEAD supported", 400);
  }

  return handleQueryParams(request);
}

// Type check required parameters
function handleQueryParams(request: NextApiRequest): ProcessedQueryParams {
  const { src: srcUrl, width: strWidth } = request.query;

  if (typeof srcUrl !== "string" || typeof strWidth !== "string") {
    throw new ValidationError(
      'Arguments "src" and "width" are missing or invalid',
      400
    );
  }

  const fullUrl = imageAllowedOrigin + srcUrl;

  // Validation of URL format and origin
  const url = new URL(fullUrl);

  const width = parseInt(strWidth);

  if (isNaN(width) || width <= 0 || width > maxOutputPixelSize) {
    throw new ValidationError("Invalid output width", 400);
  }

  return { srcUrl: url.href, width, strWidth };
}

// Loads, validates and prepares source image
async function prepareImageFromSource(
  data: ProcessedQueryParams
): Promise<processedImage> {
  const src = await fetch(data.srcUrl);
  let img = sharp(Buffer.from(await src.arrayBuffer()));
  const metadata = await img.metadata();
  const contentType = src.headers.get("Content-Type");

  if (!contentType) {
    throw new ValidationError(
      "Error: No content type reported by source image",
      500
    );
  }

  if (!metadata.size || metadata.size > maxInputFileSize) {
    throw new ValidationError(
      "Error: Source image size unknown or too big",
      500
    );
  }

  if (
    !metadata.width ||
    metadata.width > maxInputPixelSize ||
    !metadata.height ||
    metadata.height > maxInputPixelSize
  ) {
    throw new ValidationError(
      "Error: Source image dimensions unknown or too big",
      500
    );
  }

  // Downscale if needed
  if (metadata.width > data.width) {
    img = img.resize(data.width);
  }

  const processedImage = await img
    .png({ force: false, progressive: true })
    .jpeg({ force: false, quality: 90, progressive: true })
    .toBuffer();

  return { processedImage, contentType };
}

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    // Prepare and validate request type and query parameters
    const data = prepareDataFromRequest(request);

    // Attempt to fetch and transform provided image
    const preparedImageData = await prepareImageFromSource(data);

    response.setHeader("Cache-Control", "max-age=86400, s-maxage=86400");
    response.setHeader("Content-Type", preparedImageData.contentType);
    response.status(200).send(preparedImageData.processedImage);
  } catch (e) {
    const [code, msg] =
      e instanceof ValidationError
        ? [e.statusCode, e.message]
        : [500, "Unexpected error, pull requests welcome :)"];
    console.error(e);
    response.status(code).send(msg);
  }
};

export default handler;
