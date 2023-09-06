import { cn } from "@/lib/utils";
import { ChatCompletionRequestMessage } from "openai";
import { UserAvatar } from "./User-avatar";
import { BotAvatar } from "./Bot-avatar";

interface messageCardProps {
  message: ChatCompletionRequestMessage;
}

export const MessageCard = ({ message }: messageCardProps) => {
  return (
    <div
      key={message.content}
      className={cn(
        "p-8 w-full flex items-start gap-x-8 rounded-lg",
        message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
      )}
    >
      {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
      {message.content}
    </div>
  );
};
