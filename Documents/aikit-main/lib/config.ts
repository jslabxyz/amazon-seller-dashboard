import { StartScreenPrompt } from "@openai/chatkit";

export const WORKFLOW_ID = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "What can you do?",
    prompt: "What can you do?",
    icon: "circle-question",
  },
  {
    label: "Tell me about yourself",
    prompt: "Tell me about yourself and what you remember from our previous conversations",
    icon: "brain",
  },
  {
    label: "Remember this",
    prompt: "Please remember that I love Italian food and I'm planning a trip to Rome next month",
    icon: "bookmark",
  },
  {
    label: "What do you remember?",
    prompt: "What important information do you have stored in your memory about me?",
    icon: "database",
  },
];

export const PLACEHOLDER_INPUT = "Ask anything...";

export const GREETING = "Hello! I'm your AI assistant with memory capabilities. I can remember our conversations and help you with information from previous chats. How can I help you today?";
