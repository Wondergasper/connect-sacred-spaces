import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
  avatars: {
    src?: string;
    fallback: string;
    name?: string;
  }[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AvatarGroup = ({ avatars, max = 5, size = "md", className }: AvatarGroupProps) => {
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayedAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          className={cn(
            sizeClasses[size],
            "border-2 border-background ring-2 ring-background hover:z-10 transition-transform hover:scale-110"
          )}
          title={avatar.name}
        >
          {avatar.src && <AvatarImage src={avatar.src} alt={avatar.name} />}
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
            {avatar.fallback}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "rounded-full border-2 border-background bg-muted flex items-center justify-center font-semibold text-muted-foreground"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
