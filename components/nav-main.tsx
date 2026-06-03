"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ArrowDown, ArrowDown01Icon, ArrowDownCircle, ArrowDownNarrowWide, ChevronDown, ClosedCaptionIcon, SidebarCloseIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import React from "react"


export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode,
    subItems? : any 
  }[]
}) {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 font-bold">
        <SidebarMenu className="my-3">
          {items.map((item) => (
            item.subItems == undefined ?
            <Link href={item.url} key={item.title} className={`rounded my-2 ${item.url == pathname  && 'bg-yellow-500/10 border-l-3 border-yellow-500'}`} >
              <SidebarMenuItem key={item.title} >
                <SidebarMenuButton tooltip={item.title} className="font-bold">
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
                
              </SidebarMenuItem>
            </Link>
            : 
            <Collapsible defaultOpen={false} key={item.title}>
              <SidebarMenuItem >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full">
                    <SidebarMenuButton>
                      {item.icon}
                      Nodes
                    </SidebarMenuButton>

                    <SidebarMenuAction>
                      <ChevronDown />
                    </SidebarMenuAction>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub >
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/nodes`} className={`rounded-md my-2 ${item.url == pathname  && 'bg-yellow-500/10 border-l-3 border-yellow-500'}`} >
                        <span>overview</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.subItems?.map((subItem :any , key : any) => <SidebarMenuSubItem key={key}>
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/nodes/${subItem.url}`} className={`rounded-md my-2 ${item.url + `/${subItem.url}` == pathname  && 'bg-yellow-500/10 border-l-3 border-yellow-500'}`} >
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>)}
                </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
