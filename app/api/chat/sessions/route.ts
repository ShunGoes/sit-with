import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL;

  if (!BACKEND_URL) {
    return NextResponse.json(
      { success: false, message: "Backend URL not configured" },
      { status: 500 },
    );
  }
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/chat/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    const data = await backendResponse.json();
    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    // Forward the Set-Cookie headers from the backend to the client
    const setCookies = backendResponse.headers.getSetCookie();
    console.log("Backend Set-Cookie headers:", setCookies);
    setCookies.forEach((cookie) => {
      // Remove Domain attribute so the browser associates the cookie with the current domain
      const cleanedCookie = cookie.replace(/Domain=[^;]+;?/i, "").trim();
      console.log("Setting cleaned cookie:", cleanedCookie);
      response.headers.append("Set-Cookie", cleanedCookie);
    });

    return response;
  } catch (error: any) {
    console.error("Error in sessions proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
