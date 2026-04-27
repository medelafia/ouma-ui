"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CDataTable from "@/components/c-data-table";
import { useEffect, useState } from "react";



const data = [
    {   "alert_id"  : "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1", 
        "send_time" : "10:49:43" , 
        "send_date" : "2026-04-19",  
        "status" : "UNSEEN"  , 
        "content" : "Alert", 
        "severity" : "HIGH", 
        "anomaly_id"  : "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1"
    }
]
const columns = [
    "Alert ID" , "Send Time", "Send Date" , "Status" , "Content" , "Severity" , "Anomaly ID"
]

export default function Nodes() {
    const [alerts , setAlerts ] = useState(undefined) 
    const [loading , setLoading] = useState(true)
    const [ error , setError] : any = useState(undefined)

    useEffect(() => { 
        fetch("http://localhost:8000/api/v1/alerts/all" , {
            
        })
        .then(res => {
            if(res.ok) return res.json()
            else {
                setError("Cannot load data!")
                setLoading(false)
            }
        }).then(data => {
            setAlerts(data)
            setLoading(false)
        }).catch((err : Error) => {
            setError(err.message)
            setLoading(false)
        })
    } , [] )
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
                            <Link href="/dashboard/alerts" className="text-lg">Alerts</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                
            </div>
        </div>
        <div className="mt-4 mx-6">
            <CDataTable loading={false} data={data} columns={columns}/>
        </div>
    </div>; 
}