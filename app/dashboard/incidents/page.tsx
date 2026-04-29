"use client";

import { DataTable } from "@/components/data-table";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CDataTable from "@/components/c-data-table";
import { useEffect, useState } from "react";




export default function Nodes() {
    const [incidents , setIncidents] = useState(undefined) 
    const [loading , setLoading] = useState(true)
    const [ error , setError] : any = useState(undefined)

    useEffect(() => { 
        fetch("http://localhost:8000/api/v1/incidents/all" , {
            headers : { 
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            if(res.ok) return res.json()
            else {
                setError("Cannot load data!")
                setLoading(false)
            }
        }).then(data => {
            setIncidents(data)
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
                            <Link href="/dashboard/incidents" className="text-lg">Incidents</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                
            </div>
        </div>
        <div className="mt-4">
            <CDataTable error={error} loading={loading} data={incidents} columns={['Incident ID', 'Incident Time' , 'Incident Date' , 'description' , 'Alert']}/>
        </div>
    </div>; 
}