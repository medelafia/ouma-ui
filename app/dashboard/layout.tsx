"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { LayoutDashboardIcon, OctagonAlert, SearchAlert, ServerCrash, Settings2Icon, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, type ReactNode } from 'react'
import { Toaster } from "sonner";


const initialData = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Nodes",
      url: "/dashboard/nodes",
      icon: (
        <Workflow />
      ),
      subItems : [
        {
          title : "node 1" , 
          url : "/dashboard/nodes/"
        }
      ]
    },
    {
      title : "Alerts" , 
      url: "/dashboard/alerts" , 
      icon : (
        <OctagonAlert />
      )
    } , 
    {
      title : "Incidents" , 
      url : "/dashboard/incidents" , 
      icon : (
        <ServerCrash />
      )
    },
    {
      title : "Anomalies" , 
      url : "/dashboard/anomalies" , 
      icon : (
        <SearchAlert />
      )
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: (
        <Settings2Icon
        />
      ),
    }
  ]
}
export default function Page( {children} : { children : ReactNode }) {
  const router = useRouter()
  const [navMain , setNavMain] = React.useState(initialData.navMain)
  const fetchInstances = () => {
    console.log("fetching instances")
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/instances/all` ,{
      credentials : "include"
    })
    .then(res => {
      if(!res.ok) {
          throw new Error("cannot fetch instances now")
      }  
      return res.json()
    })
    .then(data => {
      if(data != undefined) {
        console.log(data)
        setNavMain(prev =>
          prev.map(item =>
            item.title === "Nodes"
              ? { ...item, subItems: data.map((val:any) => ({title : val.instance_id , url : val.instance_id})) }
              : item
          )
        )
      }
    })
    .catch((err : Error)=>{
      console.log(err)
    })
  }
  useEffect(() => {   
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me` , 
      {
        credentials : "include"
      }
    )
    .then(data => {
      if(data.status == 401) { 
        router.push("/")
      }
      fetchInstances()
    })
    .catch((err : Error) => {
      router.push("/")
    })
  } , [])
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Toaster />
      <AppSidebar navMain={navMain} navSecondary={initialData.navSecondary} variant="inset"/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
