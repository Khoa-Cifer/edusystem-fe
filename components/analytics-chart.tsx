"use client"

interface AnalyticsChartProps {
  type: "line" | "bar" | "area"
}

export function AnalyticsChart({ type }: AnalyticsChartProps) {
  // Placeholder for chart visualization
  // In production, use Recharts or similar library

  const getChartContent = () => {
    switch (type) {
      case "line":
        return (
          <div className="h-[300px] flex items-end justify-between gap-2 px-4">
            {[65, 72, 68, 78, 82, 85, 84, 87, 89, 86, 88, 90].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${value * 3}px` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg" />
                </div>
                <span className="text-xs text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </div>
        )
      case "bar":
        return (
          <div className="h-[300px] flex items-end justify-between gap-3 px-4">
            {[45, 78, 92, 65, 88].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-secondary rounded-t-lg" style={{ height: `${value * 2.5}px` }} />
                <span className="text-xs text-muted-foreground">
                  {["0-20", "21-40", "41-60", "61-80", "81-100"][i]}
                </span>
              </div>
            ))}
          </div>
        )
      case "area":
        return (
          <div className="h-[300px] flex items-end justify-between gap-1 px-4">
            {[120, 145, 132, 158, 172, 165, 180, 195, 188, 202, 215, 208, 225, 240].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-accent/50 to-accent/20 rounded-t-sm"
                  style={{ height: `${value}px` }}
                />
              </div>
            ))}
          </div>
        )
    }
  }

  return <div className="w-full">{getChartContent()}</div>
}
