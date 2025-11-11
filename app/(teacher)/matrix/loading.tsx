import { Card } from "@/components/ui/card";

export default function MatrixLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-10 bg-muted rounded-lg w-48 animate-pulse" />
      <Card className="p-4 bg-card border-border">
        <div className="space-y-3">
          <div className="h-10 bg-muted rounded-lg w-full animate-pulse" />
          <div className="h-10 bg-muted rounded-lg w-full animate-pulse" />
        </div>
      </Card>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4 bg-card border-border">
            <div className="h-8 bg-muted rounded-lg w-12 animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded-lg w-20 animate-pulse" />
          </Card>
        ))}
      </div>
      <Card className="p-6 bg-card border-border">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-muted rounded-lg w-full animate-pulse"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
