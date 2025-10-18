import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  illustration?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  illustration,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {illustration ? (
        <div className="mb-6 w-full max-w-xs">
          <img src={illustration} alt={title} className="w-full h-auto opacity-60" />
        </div>
      ) : Icon ? (
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-muted-foreground" />
        </div>
      ) : null}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      {description && (
        <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      )}
      
      {actionLabel && onAction && (
        <Button onClick={onAction} className="animate-fade-in">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
