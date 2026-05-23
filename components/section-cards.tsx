"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Workflow,
  Megaphone,
  ServerCrash,
  SearchAlert,
  MoveUpRight,
} from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function SectionCards({ kpis }: { kpis: any }) {
  const cards = [
    {
      title: "Total Nodes",
      value: kpis.instances,
      icon: Workflow,
      color: "text-blue-500", 
      href : "/dashboard/nodes"
    },
    {
      title: "Total Alerts",
      value: kpis.alerts.count,
      icon: Megaphone,
      color: "text-yellow-500",
      href : "/dashboard/alerts"
    },
    {
      title: "Total Incidents",
      value: kpis.incidents.count,
      icon: ServerCrash,
      color: "text-red-500",
      href : "/dashboard/incidents"
    },
    {
      title: "Total Anomalies",
      value: kpis.anomalies.count,
      icon: SearchAlert,
      color: "text-purple-500",
      href : "/dashboard/anomalies"
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 px-4 lg:px-6 xl:grid-cols-4 2xl:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon

        return (
          <Card
            key={idx}
            className="
              relative overflow-hidden
              border border-muted/40
              bg-gradient-to-br from-background to-muted/30
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
            "
          >
            <CardHeader className="relative space-y-3">
              <CardDescription className="text-sm text-muted-foreground">
                {card.title}
              </CardDescription>

              <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">
                {card.value}
              </CardTitle>

              {/* icon background */}
              <Icon
                className={`absolute right-4 top-4 size-16 opacity-20 ${card.color}`}
              />
            </CardHeader>

            <div className="flex items-center justify-between px-6 pb-2">
              <span className="text-xs text-muted-foreground">
                Updated recently
              </span>

              <Link href={card.href}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs"
              >
                Details
                <MoveUpRight className="size-3" />
              </Button>
              </Link>
            </div>
          </Card>
        )
      })}
    </div>
  )
}