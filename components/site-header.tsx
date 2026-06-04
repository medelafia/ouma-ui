import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Ban, Dot, Power, PowerOff, ThumbsUp } from "lucide-react"
import { Spinner } from "./ui/spinner"

export function SiteHeader() {
  const [systemHealth , setSystemHealth] = useState({}) 
  const [checking , setChecking ] = useState(true) 
  function checkHealth() { 
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/systemHealth/`, {
        credentials : "include"
    })
    .then(res => {
        if(res.ok) { 
            return res.json()
        }
    })
    .then(data => {
        if(data != undefined) {
          console.log("health" , data)
          setSystemHealth(data)
          setChecking(false) 
        }
   })
  }
  useEffect(()=>{
    checkHealth()
  },[])

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-5">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
      </div>

      <div className="me-8"> 
      {
        checking 
        ? <Badge className="border-yellow-500 text-yellow-700 bg-yellow-500/10 text-yellow-300 text-md px-4 py-3 font-bold">
            <Spinner />checking
        </Badge>
        : Object.keys(systemHealth).length === 0 
        ? <Badge className="bg-green-50/10 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-600 text-md px-4 py-3 font-bold">
            <Power/>connected 
        </Badge> 
        :<>
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 text-md px-4 py-3 font-bold">
              <PowerOff/> Error
          </Badge>
          
        </>  
      }
      </div>

    </header>
  )
}
