"use client";

import CDataTable from "@/components/c-data-table";



const columns = [
    "Alert ID" , "Send Time", "Send Date" , "Status" , "Content" , "Severity" , "Anomaly ID"
]

export default function Alerts() {
    return <div className="mx-8"> 
            <CDataTable fetchUrl="http://localhost:8000/api/v1/alerts/all" columns={columns}  />
    </div>; 
}