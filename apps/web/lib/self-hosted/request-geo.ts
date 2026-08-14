import { LOCALHOST_GEO_DATA, LOCALHOST_IP } from "@dub/utils";
import { geolocation, ipAddress } from "@vercel/functions";

export function getRequestGeo(req: Request) {
  if (process.env.NEXT_PUBLIC_SELF_HOSTED !== "true") {
    return process.env.VERCEL === "1" ? geolocation(req) : LOCALHOST_GEO_DATA;
  }

  return {
    city: req.headers.get("cf-ipcity") || "Unknown",
    country: req.headers.get("cf-ipcountry") || "Unknown",
    region: req.headers.get("cf-region-code") || "Unknown",
    latitude: req.headers.get("cf-iplatitude") || "Unknown",
    longitude: req.headers.get("cf-iplongitude") || "Unknown",
  };
}

export function getRequestContinent(req: Request) {
  return process.env.NEXT_PUBLIC_SELF_HOSTED === "true"
    ? req.headers.get("cf-ipcontinent")
    : process.env.VERCEL === "1"
      ? req.headers.get("x-vercel-ip-continent")
      : LOCALHOST_GEO_DATA.continent;
}

export function getRequestRegion(req: Request) {
  return process.env.NEXT_PUBLIC_SELF_HOSTED === "true"
    ? req.headers.get("cf-region-code")
    : process.env.VERCEL === "1"
      ? req.headers.get("x-vercel-ip-country-region")
      : LOCALHOST_GEO_DATA.region;
}

export function getRequestIp(req: Request) {
  if (process.env.NEXT_PUBLIC_SELF_HOSTED === "true") {
    return (
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      LOCALHOST_IP
    );
  }
  return process.env.VERCEL === "1" ? ipAddress(req) : LOCALHOST_IP;
}
