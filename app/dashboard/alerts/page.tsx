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
            <CDataTable data={data} columns={columns}/>
        </div>
    </div>; 
}