import { NextResponse } from "next/server";
import { queryPublishedPosts } from "@/services/posts.server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || "20";
  const cursorDocId = searchParams.get("cursor") || undefined;
  const category = searchParams.get("category") || undefined;
  
  const tagsParam = searchParams.get("tags") || "";
  const tags =
    tagsParam.length > 0
      ? tagsParam.split(",").map((tag) => tag.trim().filter(Boolean))
      : undefined;

  const data = await queryPublishedPosts({
    limit,
    cursorDocId,
    category,
    tags,
  });

  return NextResponse.json(data);
}
