"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CircleFadingPlusIcon, Plus, Save, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


export default function Settings() {
    const [settings , setSettings ] = useState({
        TARGET_SERVER_HOST : "" , 
        TARGET_SERVER_PORT : 9000 , 
        PREDICTION_INTERVAL : 1 , 
        ACTIVATE_ALERTING : false
    })
    const emailToSaveRef = useRef(null)
    const [emails , setEmails ] = useState([])

    function handleSave() {
        if(settings.TARGET_SERVER_HOST.trim() == "" ) { 
            
            toast("Error!", {
                description: "Please try to fill all fields",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
            return 
        }
        console.log(settings)
        fetch("http://ouma-backend-service:8000/api/v1/metadata/update" , {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}` , 
                "Content-Type" : "application/json"
            } , 
            method : "POST" , 
            body : JSON.stringify(settings )
        }).then(req => {
            if(req.ok) {
                return req.json() 
            }
        }).then(data => {
            if(data != undefined ) { 
                toast("Success!", {
                    description: "Metadata updated successfuly!",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        })
    }
    function saveNewEmail() {
        if(emailToSaveRef.current!['value']) { 
            const params = new URLSearchParams({email : emailToSaveRef.current!['value']})
            
            fetch(`http://ouma-backend-service:8000/api/v1/metadata/emails?${params}` , {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                } ,  
                method : "POST"
            }).then(res => {
                if(res.ok) {
                    console.log(res)
                    return res.json() 
                }
            }).then(data => {
                if(data != undefined ) {
                    toast("Success", {
                        description: "Emaid Added successfully!",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            })
            
        }
        console.log("email saved" , )
    }

    function fetchEmails() { 
        fetch("http://ouma-backend-service:8000/api/v1/metadata/emails/") 
        .then(res => {
            if(res.ok) { 
                return res.json()
            }
        })
        .then(data => {
            if(data != undefined) {
                console.log(data) 
                setEmails(data)
            }
        })
    }
    function fetchSettings() { 
        fetch("http://ouma-backend-service:8000/api/v1/metadata/") 
        .then(res => {
            if(res.ok) { 
                return res.json()
            }
        })
        .then(data => {
            if(data != undefined) {
                console.log(data) 
                setSettings(data)
            }
        })
    }

    useEffect(()=>{
        fetchSettings()
        fetchEmails() 
    } , [])

    return <div className="mx-16"> 
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
                            <Link href="/dashboard/nodes" className="text-lg" >Settings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="mt-6">
            <div className="my-4">
                <h2 className="font-bold text-2xl my-2">Server settings</h2>
                <div className="flex justify-between my-4">
                    <div>
                        <label htmlFor="input-demo-disabled" className="font-bold">Target Ip Address</label>
                        <p className="text-foreground text-gray-500">Ip address of target monitoring server (ex. 152.19.173.1)</p>
                    </div>
                    <Input 
                        className="w-100"
                        id="input-demo-disabled"
                        type="email"
                        placeholder="Ip address"
                        value={settings['TARGET_SERVER_HOST']}
                        onChange={(e)=>{
                            setSettings({...settings , TARGET_SERVER_HOST : e.currentTarget.value})
                        }}
                        disabled
                    />
                </div>
                <div className="flex justify-between my-2">
                    <label htmlFor="input-demo-disabled" className="font-bold">Target server port</label>
                    <Input
                        className="w-100"
                        id="input-demo-disabled"
                        type="number"
                        placeholder="target port"
                        value={settings['TARGET_SERVER_PORT']}
                        min="9000"
                        max="10000"
                        onChange={(e)=>{
                            setSettings({...settings , TARGET_SERVER_PORT : Number.parseInt(e.currentTarget.value)})
                        }}
                        disabled
                    />
                </div>
                <div className="flex justify-between my-2">
                    <label htmlFor="input-demo-disabled" className="font-bold">Prediction interval</label>
                    <Input
                        className="w-100"
                        id="input-demo-disabled"
                        type="number"
                        min="1"
                        max="10"
                        placeholder="prediction interval"
                        value={settings['PREDICTION_INTERVAL']}
                        onChange={(e)=>{
                            setSettings({...settings , PREDICTION_INTERVAL : Number.parseInt(e.currentTarget.value)})
                        }}
                    />
                </div>
            </div>
            <Separator  />
            <div className="my-4 py-3">
                
                <h2 className="font-bold text-2xl">Alerting settings</h2>
                <div className="flex justify-between my-4">
                    <div>
                        <label htmlFor="input-demo-disabled" className="font-bold">Activate Alerting</label>
                        <p className="text-foreground text-gray-500">By clicking in this button you dont be able to receive alerts</p>
                    </div>
                    <Switch 
                        id="switch-size-sm" 
                        checked={settings['ACTIVATE_ALERTING'] }  
                        onClick={(e) => { 
                            setSettings({...settings, ACTIVATE_ALERTING : !settings['ACTIVATE_ALERTING']})
                        }}
                        />
                </div>
                { settings['ACTIVATE_ALERTING'] && <div className="flex justify-between my-4">
                    <div>
                        <label htmlFor="input-demo-disabled" className="font-bold">Emails</label>
                        <p className="text-foreground text-gray-500">Those emails used to send alerts if an anomaly detected</p>
                    </div>
                    <div className="flex">
                        <ScrollArea className="h-30 w-60 rounded-md border">
                            <div className="p-4">
                                <h4 className="mb-4 text-sm leading-none font-bold">Emails</h4>
                                {emails!.map((tag) => (
                                <React.Fragment key={tag}>
                                    <div className="text-sm">{tag}</div>
                                    <Separator className="my-2" />
                                </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ms-2"><Plus /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogMedia>
                                        <CircleFadingPlusIcon />
                                    </AlertDialogMedia>
                                    <AlertDialogTitle>Save new email</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Add new email for alerting when anomaly detected
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                
                                <Input
                                    id="input-demo-disabled"
                                    type="email"
                                    placeholder="Emails"    
                                    ref={emailToSaveRef}       
                                />
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={saveNewEmail}>Save</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                </div>}
            </div>

            <div className="flex justify-end">
                <Button variant="outline" size="lg">
                    <XIcon></XIcon>
                    Cancel
                </Button>
                <Button variant="destructive" size="lg" className="ms-2" onClick={handleSave}>
                    <Save></Save>
                    Save
                </Button>
            </div>
        </div>
        
    </div>; 
}