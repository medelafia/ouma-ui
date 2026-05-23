"use client";

import CDataTable from "@/components/c-data-table";
import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Nodes() {

    
    return <div className="mx-8"> 
            <CDataTable
                title = {
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/anomalies" className="text-lg">Alerts</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                }
                idColumn="anomaly_id" fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/anomalies/all`} columns={["Anomaly Id" , 'Detection Date' , 'Detection Time' , "Duration" , "Instance Id"]}/>
    </div>; 
}