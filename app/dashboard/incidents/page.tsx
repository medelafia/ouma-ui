"use client";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CDataTable from "@/components/c-data-table";
import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Field } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";




export default function Nodes() {




    return <div className="mx-8"> 
            <CDataTable fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/incidents/all`} columns={['Incident ID', 'Incident Time' , 'Incident Date' , 'description' , 'Alert']} idColumn="incident_id"/>
    </div>; 
}