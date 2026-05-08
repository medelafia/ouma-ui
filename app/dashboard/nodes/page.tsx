"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import {AlertCircleIcon, ArrowUpRight , RefreshCcw} from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Nodes() {
    const [instances , setInstances] = useState([])
    const [loading , setLoading ] = useState(true)
    const [error , setError] : any = useState() 
    const fetchInstances = () => {
        setLoading(true)
        fetch("http://localhost:8000/api/v1/instances/all" , 
            {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")!}`
                }
            }
        )
        .then(res => {
            if(res.ok) {
                return res.json() 
            }   
        })
        .then(data => {
            setLoading(false)
            if(data != undefined) {
                setInstances(data)
            }
        })
        .catch((err : Error)=>{
            setLoading(false)
            setError("Cannot load instances now!")
        })
    }

    useEffect(() => {
        fetchInstances()
    }, []) 
    return (
    <div className="mx-8"> 
            <div className="flex justify-between items-center">
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
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex">
                    <ButtonGroup className="mr-2">
                        <Input id="input-button-group" placeholder="Search by host" />
                        <Button variant="outline">Search</Button>
                    </ButtonGroup>
                    <Button variant="destructive" onClick={fetchInstances}>
                        Refrech
                        <RefreshCcw />
                    </Button>
                </div>
            </div>
            { error && 
                <Alert variant="destructive" className="w-full my-4">
                    <AlertCircleIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert> 
            } 
            <>{ loading 
                    ? <Item variant="muted" className="mt-6">
                        <ItemMedia>
                            <Spinner />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">Loading data...</ItemTitle>
                        </ItemContent>
                    </Item>
                    : <div className="grid grid-cols-3 my-8 gap-8">
                    {   instances.length == 0 || error
                        ? <div>No Instances</div>
                        : instances.map( ( instance : {instance_id : String , port : number , ip_address : String , cpu_usage : number , memory_usage : number } , key : any) => 
                            (<Card size="sm" className="mx-auto w-full max-w-sm" key={key}>
                                <CardHeader>
                                    <CardTitle>#ID : {instance.instance_id}</CardTitle>
                                    <CardDescription>
                                        Host : {instance.ip_address}:{instance.port}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Field className="w-full max-w-sm my-4">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>CPU Usage</span>
                                            <span className="ml-auto">{instance.cpu_usage}%</span>
                                        </FieldLabel>
                                        <Progress value={instance.cpu_usage} id="progress-upload" />
                                    </Field>
                                    <Field className="w-full max-w-sm my-4">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>Memory Usage</span>
                                            <span className="ml-auto">{instance.memory_usage}%</span>
                                        </FieldLabel>
                                        <Progress value={instance.memory_usage} id="progress-upload" />
                                    </Field>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/dashboard/nodes/${instance.instance_id}`}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Details
                                            <ArrowUpRight />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>)
                        ) 
                    } 
                </div>
            }</>
        </div>
    )
}