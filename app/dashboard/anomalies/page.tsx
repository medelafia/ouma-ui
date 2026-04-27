"use client";

import { DataTable } from "@/components/data-table";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {ArrowUpRight , RefreshCcw} from "lucide-react"
import Link from "next/link";
import CDataTable from "@/components/c-data-table";
import { useEffect, useState } from "react";

const data = [
  {
    "detection_date": "2026-04-19",
    "instance_id": "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1",
    "detection_time": "10:49:43",
    "anomaly_id": "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1",
    "duration": 0
  }
]

export default function Nodes() {
    const [anomalies , setAnomalies] : any = useState(undefined) 
    const [loading , setLoading] = useState(true)
    const [ error , setError] : any = useState(undefined)

    useEffect(() => { 
        fetch("http://localhost:8000/api/v1/anomalies/all")
        .then(res => {
            if(res.ok) return res.json()
            else {
                setError("Cannot load data!")
                setLoading(false)
            }
        }).then(data => {
            setAnomalies(data)
            setLoading(false)
        }).catch((err : Error) => {
            setError(err.message)
            setLoading(false)
        })
        } , [] )
    return <div className="mx-8"> 
        <div className="flex justify-between items-center">
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
                            <Link href="/dashboard/anomalies" className="text-lg">Anomalies</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                
            </div>
        </div>
        <div className="mt-4">
            <CDataTable loading={false} data={data} columns={["Anomaly Id" , 'Detection Date' , 'Detection Time' , "Duration" , "Instance Id"]}/>
        </div>
    </div>; 
}