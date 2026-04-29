"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";




export default function Page() { 
    const [error , setError] : any = useState(undefined) 
    const [kpis , setKpis] = useState(undefined)
    const [loading , setLoading] = useState(true)
    const [chartData , setChartData] = useState([]) 
    const [chartsError , setChartsError] : any = useState(undefined)
    function fetchKpis() { 
        fetch("http://localhost:8000/api/v1/kpis" , {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")!}`
            }
        }) 
        .then(res => {
            console.log(res)
            if(res.ok){
                return res.json()
            }else {
                setError("Cannot load kpis now!")
            }
        })
        .then(data => {
            console.log(data)
            if(data != undefined) {
                setKpis(data)
            } 
            setLoading(false) 
        })
        .catch(err=> {
            setError("Cannot load kpis now!")
            setLoading(false)
        })
    }
    function fetchChartData(){
        fetch("http://localhost:8000/api/v1/overview" , {
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
                setChartData(data)
            } 
            setLoading(false) 
        })
        .catch(err=> {
            setChartsError("Cannot load chart data now!")
            setLoading(false)
        })
    }

    useEffect(()=>{
        console.log("fetching kpis")
        fetchChartData()
        fetchKpis()
    } ,[])

    return <div className="flex flex-1 flex-col gap-6 px-6">
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
            <ChartAreaInteractive chartData={chartData} error={chartsError}/>
    </div>
}