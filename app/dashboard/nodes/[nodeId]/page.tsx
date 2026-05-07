"use client";
import PredictionCharts, { ChartData } from "@/components/prediction-charts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineStyle, RefreshCcw, TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function Page() {
  const params = useParams<{nodeId : string}>()
  const [nodeMetrics ,setNodeMetrics] = useState([])
  const [loading , setLoading] = useState(true)
  const [chartData , setChartData] = useState(undefined) 
  console.log(params)
  function fetchMetrics() { 
    setLoading(true)
    fetch(`http://localhost:8000/api/v1/instances/${params.nodeId}/metrics`, {
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(data => {
      setLoading(false)
      if(data != undefined ) {
        setNodeMetrics(data)
      }
    })
  }
  function fetchMetricsChartsData() {
    fetch(`http://localhost:8000/api/v1/instances/${params.nodeId}/metrics/all`).then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(data => {
      setLoading(false)
      if(data != undefined ) {
        setChartData(data)
        console.log(data)
      }
    })
  }

  useEffect(() => {
   fetchMetrics()
   fetchMetricsChartsData()
  } ,  [] ) 
  console.log(nodeMetrics)
  return <div className="mx-8"> 
        <div className="flex justify-between items-center mx-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard" className="text-lg">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/nodes" className="text-lg">Nodes</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/dashboard/nodes/${params.nodeId}`} className="text-lg">{params.nodeId}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                <Button variant="destructive" onClick={fetchMetrics}>
                  Refresh
                  <RefreshCcw />
                </Button>
            </div>
        </div>
        <div className="mt-4 text-3xl mx-6 flex items-center"><LineStyle className="me-4"/> <span>Node Metrics</span></div>
        <div className="mt-4 grid grid-cols-4 gap-4 mx-6">
          { 
            loading 
            ? <>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-2/3" />
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-2/3" />
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-2/3" />
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-2/3" />
                    </CardHeader>
                </Card>
              </>
            : nodeMetrics!.map(
              (metric : any , key : any) => (
                 <Card key={key} className="@container/card">
                  <CardHeader>
                    <CardDescription>{metric.name}</CardDescription>
                    <CardTitle className="font-semibold tabular-nums @[250px]/card:text-xl">
                      {metric.value.data.result[0] ? metric.value.data.result[0].values.at(-1)[1] : 0}
                    </CardTitle>
                  </CardHeader>
                  {/*<CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Trending up this month{" "}
                      <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                      Visitors for the last 6 months
                    </div>
                  </CardFooter>*/}
                </Card>)      
              )
          }
        </div>
        <div className="my-4 grid grid-cols-2 gap-4 mx-6">
          { chartData != undefined && <PredictionCharts data={chartData!} /> } 
        </div>
    </div>; 
}