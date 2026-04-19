"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", incidents: 222, anomalies: 150 , alerts : 103 },
  { date: "2024-04-02", incidents: 97, anomalies: 180 , alerts : 103 },
  { date: "2024-04-03", incidents: 167, anomalies: 120 , alerts : 103 },
  { date: "2024-04-04", incidents: 242, anomalies: 260 , alerts : 113 },
  { date: "2024-04-05", incidents: 373, anomalies: 290 , alerts : 103 },
  { date: "2024-04-06", incidents: 301, anomalies: 340 , alerts : 103 },
  { date: "2024-04-07", incidents: 245, anomalies: 180 , alerts : 203 },
  { date: "2024-04-08", incidents: 409, anomalies: 320 , alerts : 103 },
  { date: "2024-04-09", incidents: 59, anomalies: 110 , alerts : 103 },
  { date: "2024-04-10", incidents: 261, anomalies: 190 , alerts : 103 },
  { date: "2024-04-11", incidents: 327, anomalies: 350 , alerts : 103 },
  { date: "2024-04-12", incidents: 292, anomalies: 210 , alerts : 103 },
  { date: "2024-04-13", incidents: 342, anomalies: 380 , alerts : 103 },
  { date: "2024-04-14", incidents: 137, anomalies: 220 , alerts : 103 },
  { date: "2024-04-15", incidents: 120, anomalies: 170 , alerts : 103 },
  { date: "2024-04-16", incidents: 138, anomalies: 190 , alerts : 463 },
  { date: "2024-04-17", incidents: 446, anomalies: 360 , alerts : 103 },
  { date: "2024-04-18", incidents: 364, anomalies: 410 , alerts : 103 },
  { date: "2024-04-19", incidents: 243, anomalies: 180 , alerts : 103 },
  { date: "2024-04-20", incidents: 89, anomalies: 150 , alerts : 103 },
  { date: "2024-04-21", incidents: 137, anomalies: 200 , alerts : 103 },
  { date: "2024-04-22", incidents: 224, anomalies: 170 , alerts : 103 },
  { date: "2024-04-23", incidents: 138, anomalies: 230 , alerts : 103 },
  { date: "2024-04-24", incidents: 387, anomalies: 290 , alerts : 103 },
  { date: "2024-04-25", incidents: 215, anomalies: 250 , alerts : 103 },
  { date: "2024-04-26", incidents: 75, anomalies: 130 , alerts : 103 },
  { date: "2024-04-27", incidents: 383, anomalies: 420 , alerts : 103 },
  { date: "2024-04-28", incidents: 122, anomalies: 180 , alerts : 103 },
  { date: "2024-04-29", incidents: 315, anomalies: 240 , alerts : 103 },
  { date: "2024-04-30", incidents: 454, anomalies: 380 , alerts : 103 },
  { date: "2024-05-01", incidents: 165, anomalies: 220 , alerts : 103 },
  { date: "2024-05-02", incidents: 293, anomalies: 310 , alerts : 103 },
  { date: "2024-05-03", incidents: 247, anomalies: 190 , alerts : 103 },
  { date: "2024-05-04", incidents: 385, anomalies: 420 , alerts : 103 },
  { date: "2024-05-05", incidents: 481, anomalies: 390 , alerts : 283 },
  { date: "2024-05-06", incidents: 498, anomalies: 520 , alerts : 103 },
  { date: "2024-05-07", incidents: 388, anomalies: 300 , alerts : 103 },
  { date: "2024-05-08", incidents: 149, anomalies: 210 , alerts : 103 },
  { date: "2024-05-09", incidents: 227, anomalies: 180 , alerts : 103 },
  { date: "2024-05-10", incidents: 293, anomalies: 330 , alerts : 103 },
  { date: "2024-05-11", incidents: 335, anomalies: 270 , alerts : 103 },
  { date: "2024-05-12", incidents: 197, anomalies: 240 , alerts : 103 },
  { date: "2024-05-13", incidents: 197, anomalies: 160 , alerts : 103 },
  { date: "2024-05-14", incidents: 448, anomalies: 490 , alerts : 103 },
  { date: "2024-05-15", incidents: 473, anomalies: 380 , alerts : 103 },
  { date: "2024-05-16", incidents: 338, anomalies: 400 , alerts : 103 },
  { date: "2024-05-17", incidents: 499, anomalies: 420 , alerts : 103 },
  { date: "2024-05-18", incidents: 315, anomalies: 350 , alerts : 103 },
  { date: "2024-05-19", incidents: 235, anomalies: 180 , alerts : 103 },
  { date: "2024-05-20", incidents: 177, anomalies: 230 , alerts : 103 },
  { date: "2024-05-21", incidents: 82, anomalies: 140 , alerts : 103 },
  { date: "2024-05-22", incidents: 81, anomalies: 120 , alerts : 103 },
  { date: "2024-05-23", incidents: 252, anomalies: 290 , alerts : 103 },
  { date: "2024-05-24", incidents: 294, anomalies: 220 , alerts : 103 },
  { date: "2024-05-25", incidents: 201, anomalies: 250 , alerts : 103 },
  { date: "2024-05-26", incidents: 213, anomalies: 170 , alerts : 3 },
  { date: "2024-05-27", incidents: 420, anomalies: 460 , alerts : 103 },
  { date: "2024-05-28", incidents: 233, anomalies: 190 , alerts : 103 },
  { date: "2024-05-29", incidents: 78, anomalies: 130 , alerts : 103 },
  { date: "2024-05-30", incidents: 340, anomalies: 280 , alerts : 103 },
  { date: "2024-05-31", incidents: 178, anomalies: 230 , alerts : 103 },
  { date: "2024-06-01", incidents: 178, anomalies: 200 , alerts : 103 },
  { date: "2024-06-02", incidents: 470, anomalies: 410 , alerts : 103 },
  { date: "2024-06-03", incidents: 103, anomalies: 160 , alerts : 103 },
  { date: "2024-06-04", incidents: 439, anomalies: 380 , alerts : 103 },
  { date: "2024-06-05", incidents: 88, anomalies: 140 , alerts : 103 },
  { date: "2024-06-06", incidents: 294, anomalies: 250 , alerts : 103 },
  { date: "2024-06-07", incidents: 323, anomalies: 370 , alerts : 103 },
  { date: "2024-06-08", incidents: 385, anomalies: 320 , alerts : 10 },
  { date: "2024-06-09", incidents: 438, anomalies: 480 , alerts : 103 },
  { date: "2024-06-10", incidents: 155, anomalies: 200 , alerts : 103 },
  { date: "2024-06-11", incidents: 92, anomalies: 150 , alerts : 103 },
  { date: "2024-06-12", incidents: 492, anomalies: 420 , alerts : 103 },
  { date: "2024-06-13", incidents: 81, anomalies: 130 , alerts : 103 },
  { date: "2024-06-14", incidents: 426, anomalies: 380 , alerts : 103 },
  { date: "2024-06-15", incidents: 307, anomalies: 350 , alerts : 103 },
  { date: "2024-06-16", incidents: 371, anomalies: 310 , alerts : 103 },
  { date: "2024-06-17", incidents: 475, anomalies: 520 , alerts : 103 },
  { date: "2024-06-18", incidents: 107, anomalies: 170 , alerts : 103 },
  { date: "2024-06-19", incidents: 341, anomalies: 290 , alerts : 103 },
  { date: "2024-06-20", incidents: 408, anomalies: 450 , alerts : 103 },
  { date: "2024-06-21", incidents: 169, anomalies: 210 , alerts : 115 },
  { date: "2024-06-22", incidents: 317, anomalies: 270 , alerts : 103 },
  { date: "2024-06-23", incidents: 480, anomalies: 530 , alerts : 103 },
  { date: "2024-06-24", incidents: 132, anomalies: 180 , alerts : 103 },
  { date: "2024-06-25", incidents: 141, anomalies: 190 , alerts : 103 },
  { date: "2024-06-26", incidents: 434, anomalies: 380 , alerts : 128 },
  { date: "2024-06-27", incidents: 448, anomalies: 490 , alerts : 103 },
  { date: "2024-06-28", incidents: 149, anomalies: 200 , alerts : 103 },
  { date: "2024-06-29", incidents: 103, anomalies: 160 , alerts : 163 },
  { date: "2024-06-30", incidents: 446, anomalies: 400 , alerts : 103 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Statistics of the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last month</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last week</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last month
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last week
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="alerts"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="incidents"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="anomalies"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
