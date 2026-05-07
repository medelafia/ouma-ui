"use client" ;
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";


export const description = "A multiple line chart"
export type ChartData = {
        time : Number , 
        cpu_usage_pred : String ,
        cpu_usage_actual : Number , 
        memory_usage_pred : Number , 
        memory_usage_actual : Number 
    }
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
export default function PredictionCharts({data} : {data : ChartData[]}){ 
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
                        data={data}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="time"
                        tickFormatter={(value) =>
                            new Date(value).toLocaleTimeString()
                        }
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                        dataKey="memory_usage_pred"
                        type="monotone"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        dot={false}
                        />
                        <Line
                        dataKey="memory_usage_actual"
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
                    <CardTitle>CPU Usage</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickFormatter={(value) =>
                                new Date(value).toLocaleTimeString()
                            }
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                        dataKey="cpu_usage_pred"
                        type="monotone"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        dot={false}
                        />
                        <Line
                        dataKey="cpu_usage_actual"
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