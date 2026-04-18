"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {ArrowUpRight , RefreshCcw} from "lucide-react"
import Link from "next/link";



export default async function Nodes() {
    const data = await fetch("http://localhost:8000/api/v1/instances/all")
    const instances = await data.json() 
    
    return <div className="mx-8"> 
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
                <Button variant="destructive">
                    Refrech
                    <RefreshCcw />
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-3 my-8 gap-8">
            {   
                instances.map( 
                ( instance : {instance_id : String , port : number , ip_address : String }) => 
                    ( 
                        <Card size="sm" className="mx-auto w-full max-w-sm">
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
                                        <span className="ml-auto">66%</span>
                                    </FieldLabel>
                                    <Progress value={66} id="progress-upload" />
                                </Field>
                                <Field className="w-full max-w-sm my-4">
                                    <FieldLabel htmlFor="progress-upload">
                                        <span>Memory Usage</span>
                                        <span className="ml-auto">66%</span>
                                    </FieldLabel>
                                    <Progress value={66} id="progress-upload" />
                                </Field>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    Details
                                    <ArrowUpRight />
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                )
            
            }
        </div>
    </div>; 
}