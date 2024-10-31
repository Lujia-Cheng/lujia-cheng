import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";

import { ChatMessage } from "./page";

export default function ChatMessages({
  chatHistory,
}: {
  chatHistory: ChatMessage[];
}) {
  return (
    <>
      <Separator />
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          style={{
            textAlign: msg.role === "user" ? "right" : "left",
            margin: "10px",
            backgroundColor: msg.role === "user" ? "pink" : "paleturquoise",
            maxWidth: "85%",
            borderRadius: "10px",
          }}
        >
          <Markdown>{msg.text}</Markdown>
        </div>
      ))}
    </>
  );
}
