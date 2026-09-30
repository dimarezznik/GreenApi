import type { ChatMessage } from "../../../shared/types/chat";
import { timestampToTime } from "../../../shared/utils/dataConvert";

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isOutgoing = message.direction === "outgoing";
  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "relative max-w-[min(75%,520px)]",
          "px-3.5 py-2.5",
          "text-sm leading-5",
          "shadow-sm",
          isOutgoing
            ? "rounded-2xl rounded-br-md bg-blue-100 text-slate-800"
            : "rounded-2xl rounded-bl-md bg-white text-slate-800",
        ].join(" ")}
      >
        <div className="pr-8">{message.text}</div>

        <div className="absolute bottom-1.5 right-2.5 flex items-center gap-1">
          <span className="text-[10px] text-slate-400">
            {timestampToTime(+message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
