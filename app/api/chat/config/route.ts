import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL;


  if (!BACKEND_URL) {
    return NextResponse.json(
      { success: false, message: "Backend URL not configured" },
      { status: 500 },
    );
  }
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/chat/config`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error: any) {
    console.error("Error in config proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
