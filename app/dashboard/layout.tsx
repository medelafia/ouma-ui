"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from 'react'
import { Toaster } from "sonner";

export default function Page( {children} : { children : ReactNode }) {
  const router = useRouter()

  useEffect(() => {   
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token") == null) { 
      router.push("/")
      return 
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me` , 
      {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")!}`
        }
      }
    )
    .then(data => {
      if(data.status == 401) { 
        router.push("/")
      }
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
      <AppSidebar variant="inset" />
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
