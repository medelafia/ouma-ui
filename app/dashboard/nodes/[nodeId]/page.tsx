import PredictionCharts from "@/components/prediction-charts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, TrendingUpIcon } from "lucide-react";
import Link from "next/link";


export default async function Page({ 
  params 
}: { 
  params: Promise<{ nodeId: string }>
}) {
  const {nodeId} = await params
  const res = await fetch(`http://localhost:8000/api/v1/instances/${nodeId}/metrics`, 
    {
      headers : {
        "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc3NzEyMzg4Nn0.M6EGa_1XPFB4418JJ_fqr-Y12NDiU4pStOhGXH9SPIM`
      }
    }
  )
  const nodeMetrics = await res.json()
  console.log(nodeMetrics)
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
                            <Link href="/dashboard/nodes" className="text-lg">Nodes</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/dashboard/nodes/${nodeId}`} className="text-lg">{nodeId}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                <Button variant="destructive">
                  Refresh
                  <RefreshCcw />
                </Button>
            </div>
        </div>
        <div className="my-4 grid grid-cols-2 gap-4 mx-6">
          <PredictionCharts />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 mx-6">
          {
            nodeMetrics && nodeMetrics!.map(
              (metric : any , key : any) => (
                 <Card key={key} className="@container/card">
                  <CardHeader>
                    <CardDescription>{metric.name}</CardDescription>
                    <CardTitle className="font-semibold tabular-nums @[250px]/card:text-xl">
                      {metric.value.data.result[0] ? metric.value.data.result[0].values.at(-1)[1] : 0}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Trending up this month{" "}
                      <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                      Visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>)      
              )
          }
        </div>
    </div>; 
}