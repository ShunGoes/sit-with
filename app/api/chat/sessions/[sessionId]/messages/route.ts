import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  const BACKEND_URL = process.env.BACKEND_URL;

  if (!BACKEND_URL) {
    console.error(
      "CRITICAL: BACKEND_URL is not defined in environment variables.",
    );
    return NextResponse.json(
      { success: false, message: "Backend configuration missing" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const cookies = request.headers.get("cookie") || "";
    const authHeader = request.headers.get("Authorization") || "";

    const backendResponse = await fetch(
      `${BACKEND_URL}/chat/sessions/${sessionId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(body),
      },
    );
    console.log("Backend Response Status:", backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    // Proxy the SSE stream
    // We return the backend body directly which is a ReadableStream
    return new Response(backendResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Error in messages proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
