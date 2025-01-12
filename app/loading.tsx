import { Music, Music2, Music3, Music4 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex gap-4">
        <Music className="animate-bounce w-6 h-6+ rounded-full" />
        <Music2 className="animate-bounce w-6 h-6+ rounded-full [animation-delay:0.1s]" />
        <Music3 className="animate-bounce w-6 h-6+ rounded-full [animation-delay:0.2s]" />
        <Music4 className="animate-bounce w-6 h-6+ rounded-full [animation-delay:0.3s]" />
      </div>
    </div>
  );
}
