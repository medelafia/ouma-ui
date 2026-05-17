"use client";

import CDataTable from "@/components/c-data-table";

export default function Nodes() {

    
    return <div className="mx-8"> 
            <CDataTable idColumn="anomaly_id" fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/anomalies/all`} columns={["Anomaly Id" , 'Detection Date' , 'Detection Time' , "Duration" , "Instance Id"]}/>
    </div>; 
}