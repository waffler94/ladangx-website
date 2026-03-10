import { NextResponse } from "next/server";
import nextConfig from "@/next.config.mjs";

const allowedHosts = nextConfig.images?.remotePatterns?.map((p) => p.hostname) ?? [];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const name = searchParams.get("name") || "artwork";

    if (!url) {
        return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    if (!allowedHosts.includes(parsedUrl.hostname)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const response = await fetch(parsedUrl.toString());
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    const extFromUrl = parsedUrl.pathname.match(/\.(\w+)$/)?.[1]?.toLowerCase();
    const mimeToExt = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
        "image/svg+xml": "svg",
    };
    const ext = extFromUrl || mimeToExt[contentType.split(";")[0].trim()] || "jpg";
    const baseName = name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.${ext}`;

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        },
    });
}
