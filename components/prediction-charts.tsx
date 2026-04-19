"use client" ;
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";


export const description = "A multiple line chart"
const chartData = [
  { timestamp: 1776555701 , predicted: 186, real: 80 },
  { timestamp: 1776556001, predicted: 305, real: 200 },
  { timestamp: 1776556301, predicted: 237, real: 120 },
  { timestamp: 1776556601, predicted: 73, real: 190 },
  { timestamp: 1776556901, predicted: 209, real: 130 },
  { timestamp: 1776557201, predicted: 214, real: 140 },
] 
const chartConfig = {
  predicted: {
    label: "Predicted",
    color: "var(--chart-1)",
  },
  real: {
    label: "Real",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
export default function PredictionCharts(){ 
    return (
        
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Memory Usage</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="timestamp"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        //tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                        dataKey="predicted"
                        type="monotone"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        dot={false}
                        />
                        <Line
                        dataKey="real"
                        type="monotone"
                        stroke="var(--color-real)"
                        strokeWidth={2}
                        dot={false}
                        />
                    </LineChart>
                    </ChartContainer>
                </CardContent>
                
            </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Memory Usage</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="timestamp"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        //tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                        dataKey="predicted"
                        type="monotone"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        dot={false}
                        />
                        <Line
                        dataKey="real"
                        type="monotone"
                        stroke="var(--color-real)"
                        strokeWidth={2}
                        dot={false}
                        />
                    </LineChart>
                    </ChartContainer>
                </CardContent>
                
            </Card>
            </>
    )
}