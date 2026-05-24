"use client";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CDataTable from "@/components/c-data-table";
import { Trash } from "lucide-react";
import { toast } from "sonner";


export default function Nodes() {
    function deleteIncident(id : string) { 
        if(id.trim() != "") {
            const request_body = {
                "id" : id
            }
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/incidents/${id}`,{
                credentials : "include",
                method : "DELETE"
            }) 
            .then(res => {
                if(res.ok) {
                    toast("Success", {
                        description: "Incident deleted successfully!",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            })
            .catch(err => {
                toast("Error", {
                description: "Failed to delete incident!",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
                })
            })
        }
    }
    return <div className="mx-8"> 
        <CDataTable
            title = {
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard/incidents" className="text-lg">Incidents</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            }
            fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/incidents/all`} 
            columns={['Incident ID', 'Incident Time' , 'Incident Date' , 'description' , 'Alert']} 
            idColumn="incident_id"
            actions={[
                { title: "Delete" , onClick : deleteIncident , icon : <Trash />}
            ]}
            />
    </div>; 
}