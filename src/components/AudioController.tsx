import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const AudioController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/audio/voiceover.wav");
    audioRef.current.onended = () => setIsPlaying(false);

    // Function to try playing audio
    const attemptPlay = async () => {
      try {
        if (audioRef.current && !isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay blocked. Waiting for interaction.");
      }
    };

    // Try immediately (will likely fail on new tabs)
    attemptPlay();

    // Add a one-time click listener to the whole document
    const handleInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        attemptPlay();
        // Remove listeners after first interaction
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keydown", handleInteraction);
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/20 backdrop-blur-md border-white/10 hover:bg-white/10 text-white w-12 h-12 transition-all duration-300 hover:scale-105"
        onClick={(e) => {
          e.stopPropagation(); // Prevent double-triggering the document listener
          toggleAudio();
        }}
        aria-label={isPlaying ? "Mute voiceover" : "Play voiceover"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default AudioController;
