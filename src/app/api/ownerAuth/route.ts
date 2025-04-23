import { ConvexHttpClient } from "convex/browser";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("false", { status: 401 });
  }

  const { room } = await req.json();

  try {
    const isOwner = await convex.query(api.documents.isDocumentOwner, {
      id: room,
      userId: user.id,
    });

    return new Response(isOwner ? "true" : "false", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error checking document ownership:", error);
    return new Response("false", { status: 500 });
  }
}
