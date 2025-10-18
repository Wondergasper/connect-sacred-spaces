import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  type?: "audio" | "video";
  thumbnail?: string;
  className?: string;
}

export const MediaPlayer = ({ 
  src, 
  title, 
  subtitle, 
  type = "audio",
  thumbnail,
  className 
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);
    const handleEnded = () => setIsPlaying(false);

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("loadedmetadata", updateDuration);
    media.addEventListener("ended", handleEnded);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("loadedmetadata", updateDuration);
      media.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (mediaRef.current) {
      const newVolume = value[0];
      mediaRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      if (isMuted) {
        mediaRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        mediaRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skip = (seconds: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "bg-card rounded-lg border shadow-soft overflow-hidden",
        className
      )}
    >
      {type === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          className="w-full aspect-video bg-black"
          poster={thumbnail}
        />
      ) : (
        <>
          {thumbnail && (
            <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={src} />
        </>
      )}

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold truncate">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => skip(-10)}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={() => skip(10)}>
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Button size="icon" variant="ghost" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>

          {type === "video" && (
            <Button size="icon" variant="ghost" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
