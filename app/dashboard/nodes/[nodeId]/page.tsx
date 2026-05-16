"use client";
import PredictionCharts from "@/components/prediction-charts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardDescription , CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleGauge, Download, LineStyle, RefreshCcw, Trash  } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function Page() {
  const params = useParams<{nodeId : string}>()
  const [nodeMetrics ,setNodeMetrics] = useState([])
  const [loading , setLoading] = useState(true)
  const [chartData , setChartData] = useState(undefined) 
  const currentDatetime = new Date()
  const [startDate , setStartDate] = React.useState<Date | undefined>(new Date(currentDatetime.getFullYear(), currentDatetime.getMonth(), currentDatetime.getDate() , currentDatetime.getHours() - 24))
  

  function fetchMetrics() { 
    setLoading(true)
    fetch(`http://ouma-backend-service:8000/api/v1/instances/${params.nodeId}/metrics`, {
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
    fetch(`http://ouma-backend-service:8000/api/v1/instances/${params.nodeId}/metrics/all?from_date=${startDate?.toISOString()}` ,{
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
        setChartData(data)
        console.log(data)
      }
    })
  }
  function fetchAllData() { 
   fetchMetrics()
   fetchMetricsChartsData()
  }

  function setStartDateByHours(numberOfHours : number) { 
    const currentDate = new Date()
    setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() , currentDate.getHours() - numberOfHours))
  }
  function clearPredictions() { 
    fetch(`http://ouma-backend-service:8000/api/v1/instances/${params.nodeId}/metrics/all` ,{
      method : "DELETE" , 
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
        console.log(data)
        fetchMetricsChartsData()
      }
    })
  }


  useEffect(() => {
    fetchAllData()
  } ,  [] )
  useEffect(() => {
    console.log("start date setted" , startDate)
    fetchMetricsChartsData()
  } , [startDate]) 
  

  return <div className="mx-2 md:mx-8"> 
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
              <Button variant="default" onClick={fetchAllData}>
                <RefreshCcw />
                refrech
              </Button>
              <Button variant="outline" onClick={()=>{}} className="ms-2">
                <Download />
                Download Report
              </Button>
            </div>
        </div>
        <div className="mt-4 text-3xl mx-6 flex items-center font-bold"><LineStyle className="me-4"/> <span>Node Metrics</span></div>
        <div className="mt-4 grid grid-cols-1 gap-4 mx-6 lg:grid-cols-4 md:grid-cols-2 ">
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
                      {metric.value.data.result[0] ? Number.parseFloat(metric.value.data.result[0].values.at(-1)[1]).toFixed(2) : 0}
                    </CardTitle>
                  </CardHeader>
                </Card>)      
              )
          }
        </div>
        <Separator className="my-4"/>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-6 justify-between">
          <h1 className="text-2xl font-bold flex items-center "><CircleGauge /><span className="ms-2">Server ressource utilisation</span></h1>
          <div className="flex mt-3 md:mt-0 justify-end">
            <ButtonGroup>
              <Button variant="outline" onClick={() => {setStartDateByHours(24)}}>Last 1 day</Button>
              <Button variant="outline" onClick={() => {setStartDateByHours(3)}}>Last 3 hours</Button>
              <Button variant="outline" onClick={() => {setStartDateByHours(1)}}>Last 1 hour</Button>
            </ButtonGroup>
            <Button onClick={clearPredictions} className="ms-2" variant="destructive"><Trash/> clear</Button>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 mx-6 md:grid-cols-2">
          { chartData != undefined && <PredictionCharts data={chartData!} startDatetime={startDate} endDatetime={currentDatetime}/> } 
        </div>
    </div>; 
}