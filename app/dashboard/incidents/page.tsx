"use client";

import { DataTable } from "@/components/data-table";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CDataTable from "@/components/c-data-table";



const data = [{
    "incident_id" : "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1" , 
    "incident_time" : "2026-04-19" , 
    "incident_date" : "10:49:43" , 
    "description" : "Incidents occure after" , 
    "alert" : "798b1dc0-ac63-49ba-b3d7-1bc35eb4b1d1"
}]
export default function Nodes() {
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
            <CDataTable data={data} columns={['Incident ID', 'Incident Time' , 'Incident Date' , 'description' , 'Alert']}/>
        </div>
    </div>; 
}