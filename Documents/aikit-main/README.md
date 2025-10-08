# ChatKit with Mem0 Memory Integration

This repository is the simplest way to bootstrap a [ChatKit](http://openai.github.io/chatkit-js/) application with persistent memory capabilities using [Mem0](https://docs.mem0.ai/). It ships with a minimal Next.js UI, the ChatKit web component, a ready-to-use session endpoint, and integrated memory functionality so you can experiment with OpenAI-hosted workflows that remember past conversations.

## What You Get

- Next.js app with `<openai-chatkit>` web component and theming controls
- API endpoint for creating a session at [`app/api/create-session/route.ts`](app/api/create-session/route.ts)
- **Mem0 memory integration** with automatic context injection and agent memory tools
- Memory API endpoints at [`app/api/memory/route.ts`](app/api/memory/route.ts)
- Quick examples for starter prompts that showcase memory capabilities
- Persistent memory across all users and conversations

## Getting Started

Follow every step below to run the app locally and configure it for your preferred backend.

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy the example file and fill in the required values:

```bash
cp .env.example .env.local
```

### 3. Configure ChatKit credentials

Update `.env.local` with the variables that match your setup.

- `OPENAI_API_KEY` — API key created **within the same org & project as your Agent Builder**
- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` — the workflow you created in [Agent Builder](https://platform.openai.com/agent-builder)
- `MEM0_API_KEY` — API key from [Mem0 Platform](https://platform.mem0.ai/) for memory functionality
- (optional) `CHATKIT_API_BASE` - customizable base URL for the ChatKit API endpoint

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` and start chatting. Use the prompts on the start screen to verify your workflow connection and test memory capabilities, then customize the UI or prompt list in [`lib/config.ts`](lib/config.ts) and [`components/ChatKitPanel.tsx`](components/ChatKitPanel.tsx).

### 4.5. Configure Agent Builder for Memory Tools

To enable memory functionality, you need to add memory tools to your Agent Builder workflow:

1. Go to [Agent Builder](https://platform.openai.com/agent-builder)
2. Select your workflow
3. Add these two function tools:

**search_memory tool:**
```json
{
  "name": "search_memory",
  "description": "Search through past conversations and retrieve relevant memories",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "What to search for in memory"
      }
    },
    "required": ["query"]
  }
}
```

**save_memory tool:**
```json
{
  "name": "save_memory",
  "description": "Save important information to long-term memory",
  "parameters": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "The information to remember"
      }
    },
    "required": ["content"]
  }
}
```

4. Update your agent's instructions to include:
   > "You have access to a persistent memory system. Use search_memory to recall relevant past conversations. Use save_memory to store important user preferences, facts, or information for future reference. All users share the same memory pool."

### 5. Build for production (optional)

```bash
npm run build
npm start
```

## Memory Features

This ChatKit app includes integrated memory capabilities:

- **Automatic Context Injection**: Recent memories are automatically injected as context when starting new chat sessions
- **Agent Memory Tools**: The agent can explicitly search and save memories using `search_memory` and `save_memory` tools
- **Persistent Storage**: All memories are stored in Mem0 cloud and persist across sessions and users
- **Shared Memory Pool**: All users share the same memory pool, allowing for collective knowledge building

### Testing Memory Features

Use the starter prompts to test memory functionality:
- "Tell me about yourself" - Tests memory retrieval
- "Remember this" - Tests memory saving
- "What do you remember?" - Shows stored memories

## Customization Tips

- Adjust starter prompts, greeting text, and placeholder copy in [`lib/config.ts`](lib/config.ts).
- Update the theme defaults or event handlers inside[`components/ChatKitPanel.tsx`](components/ChatKitPanel.tsx) to integrate with your product analytics or storage.
- Modify memory behavior in [`app/api/memory/route.ts`](app/api/memory/route.ts) for custom memory operations.

## ⚠️ Known Issues & TODO

### Current Status: ✅ Backend Complete, 🔧 Agent Builder Configuration Needed

**✅ Completed:**
- Mem0 memory API integration working
- Memory storage and search functionality tested
- ChatKit interface with memory tools implemented
- Environment configuration complete
- Hydration issues resolved

**🔧 Still Needs Configuration:**

1. **Agent Builder Workflow Setup** (Required for full functionality)
   - Go to [Agent Builder](https://platform.openai.com/agent-builder)
   - Add the two memory function tools (see configuration section above)
   - Update agent instructions to use memory system
   - Without this step, memory tools won't be available in the chat interface

2. **Testing Memory Tools**
   - Once Agent Builder is configured, test with starter prompts
   - Verify `search_memory` and `save_memory` tools work in chat
   - Test memory persistence across sessions

3. **Optional Enhancements**
   - Add memory management UI (view/edit/delete memories)
   - Implement user-specific memory pools (currently global)
   - Add memory analytics and insights
   - Implement memory expiration policies

### Troubleshooting

**If memory tools don't work:**
1. Verify Agent Builder configuration
2. Check browser console for errors
3. Test memory API directly: `curl -X POST "http://localhost:3000/api/memory?action=search" -H "Content-Type: application/json" -d '{"query": "test"}'`
4. Ensure all environment variables are set correctly

**If ChatKit doesn't load:**
1. Check that `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` is set correctly
2. Verify OpenAI API key has access to the workflow
3. Check browser console for ChatKit script loading errors

## References

- [ChatKit JavaScript Library](http://openai.github.io/chatkit-js/)
- [Advanced Self-Hosting Examples](https://github.com/openai/openai-chatkit-advanced-samples)
- [Mem0 Documentation](https://docs.mem0.ai/)
- [OpenAI Agent Builder](https://platform.openai.com/agent-builder)
- [Mem0 Platform](https://platform.mem0.ai/)
