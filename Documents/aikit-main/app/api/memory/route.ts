import { MemoryClient } from "mem0ai";

export const runtime = "edge";

const GLOBAL_USER_ID = "global";

// Initialize Mem0 client
const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY,
});

interface SearchMemoryRequest {
  query: string;
  limit?: number;
}

interface AddMemoryRequest {
  content: string;
  metadata?: Record<string, any>;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const mem0ApiKey = process.env.MEM0_API_KEY;
    if (!mem0ApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing MEM0_API_KEY environment variable" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const url = new URL(request.url);
    const action = url.searchParams.get("action");

    if (!action) {
      return new Response(
        JSON.stringify({ error: "Missing action parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();

    if (action === "search") {
      const { query, limit = 5 }: SearchMemoryRequest = body;
      
      if (!query) {
        return new Response(
          JSON.stringify({ error: "Missing query parameter" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const memories = await mem0.search(query, {
        user_id: GLOBAL_USER_ID,
        limit,
      });

      return new Response(
        JSON.stringify({
          success: true,
          memories: memories || [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (action === "add") {
      const { content, metadata }: AddMemoryRequest = body;
      
      if (!content) {
        return new Response(
          JSON.stringify({ error: "Missing content parameter" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const result = await mem0.add([
        {
          role: "user",
          content: content,
        }
      ], {
        user_id: GLOBAL_USER_ID,
        metadata,
      });

      return new Response(
        JSON.stringify({
          success: true,
          memory: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'search' or 'add'" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Memory API error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request: Request): Promise<Response> {
  try {
    const mem0ApiKey = process.env.MEM0_API_KEY;
    if (!mem0ApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing MEM0_API_KEY environment variable" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const url = new URL(request.url);
    const action = url.searchParams.get("action");

    if (action === "all") {
      // Get all memories for debugging - search with a general query to get all
      const memories = await mem0.search("memory", {
        user_id: GLOBAL_USER_ID,
        limit: 100,
      });

      return new Response(
        JSON.stringify({
          success: true,
          memories: memories || [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'all' for GET requests" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Memory API error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
