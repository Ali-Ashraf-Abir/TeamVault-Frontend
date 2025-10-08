import { Hash, PlusCircle } from "lucide-react";

export default function ServerLandingPage({ onCreateLobby }: any) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      {/* Icon */}
      <div className="bg-accent/10 p-6 rounded-full mb-6 shadow-md animate-bounce">
        <Hash className="w-14 h-14 text-accent" />
      </div>

      {/* Welcome Text */}
      <h2 className="text-3xl font-extrabold text-primary mb-2">
        Welcome to your server!
      </h2>
      <p className="text-secondary mb-6 max-w-md">
        This is where conversations begin. Select a lobby from the sidebar 
        or create your very first one to get started.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={()=>onCreateLobby(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Create Lobby
        </button>
        <button className="px-4 py-2 border rounded-lg text-secondary hover:bg-secondary/20 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}
