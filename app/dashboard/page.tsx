"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import React, { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, LayoutDashboard } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";




export default function Page() { 
    const [error , setError] : any = useState(undefined) 
    const [kpis , setKpis] = useState(undefined)
    const [loading , setLoading] = useState(true)
    const [chartData , setChartData] = useState([]) 
    const [chartsError , setChartsError] : any = useState(undefined)
    const currentDatetime = new Date()
    const [ startDate , setStartDate] = React.useState<Date | undefined> (new Date(currentDatetime.getFullYear(), currentDatetime.getMonth() - 3, currentDatetime.getDate() , currentDatetime.getHours()))

    function fetchData(){
        fetch(`http://localhost:8000/api/v1/overview?from_date=${startDate?.toISOString()}` , {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")!}`
            }
        }) 
        .then(res => {
            console.log(res)
            if(res.ok){
                return res.json()
            }else {
                setChartsError("Cannot load chart data now!")
            }
        })
        .then(data => {
            console.log(data)
            if(data != undefined) {
                setChartData(data.statistics)
                setKpis(data.kpis)
            } 
            setLoading(false) 
        })
        .catch(err=> {
            setChartsError("Cannot load chart data now!")
            setError("Cannot load kpis now!")
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchData()
    } ,[])
    useEffect(()=>{
        fetchData()
        setLoading(true)
    }, [startDate]) 

    return <div className="flex flex-1 flex-col gap-6 px-6">
        <h1 className="mx-6 text-3xl font-bold flex items-center"><span className="me-2"><LayoutDashboard /></span>Dashboard</h1>

        { 
            loading 
            ?   
                <div className="mx-4 grid grid-cols-4 gap-4">
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
                </div>
            : ( 
                kpis != undefined 
                ?
                    <SectionCards kpis={kpis}/>
                :
                    <Alert variant="destructive" className="w-full">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                        {error}
                        </AlertDescription>
                    </Alert>
              )
            }
            <ChartAreaInteractive chartData={chartData} error={chartsError} setStartDate={setStartDate}/>
    </div>
}