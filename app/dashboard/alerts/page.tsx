"use client";

import CDataTable from "@/components/c-data-table";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCheck, Edit, Eye, LoaderIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const columns = [
    "Alert ID" , "Send Time", "Send Date" , "Status" , "Content" , "Severity" , "Anomaly ID"
]

const badgeColumns = [
  { 
    name : "Status" , 
    mapping : {
      "SEEN" : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" , 
      "UNSEEN":  "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
    } 
  } , 
  {
    name : "Severity" , 
    mapping : {
      "LOW" : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" , 
      "MEDUIM": "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      "HIGH" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300", 
    } 
  }
] 

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export default function Alerts() {
    const [showIncidentDrawer , setShowIncidentDrawer] = useState(false)
    const [showAlertInfoDrawer , setShowAlertInfoDrawer ] = useState(false)
    const [alertId , setAlertId ] = React.useState<string | undefined>()
    const [incidentDate, setIncidentDate] = React.useState<Date>()
    const [incidentTime, setIncidentTime] = useState("")
    const [incidentDescription , setIncidentDescription ] = useState("")
    const [ savingIncident , setSavingIncident ] = useState(false)
    const [alertToShow , setAlertToShow ] = React.useState<any|undefined>(undefined)


    function getSeverityBadge(severity : "HIGH"|"LOW"|"MEDUIM") {
      return badgeColumns[1].mapping[severity]
    } 

    function createIncident(alertId : string) { 
        setShowIncidentDrawer(!showIncidentDrawer)
        setAlertId(alertId)
    }   

    function showAlertInfo( alertId : string ) { 
        setShowAlertInfoDrawer(!showAlertInfoDrawer) 
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alerts/${alertId}` , {
          method : "GET" , 
          credentials : "include" 
        })
        .then(res => {
          if(!res.ok) {
            if(res.status == 404)  
              throw new Error("Alert not found")
            else 
              throw new Error("Cannot load alert details!")
          } 
          return res.json() 
        }) 
        .then(data => {
          if(data) { 
            console.log(data)
            setAlertToShow(data)
          } 
        }) 
        .catch( (err : Error) => {
          
        })
        
    }
    function saveIncident() { 
      if(savingIncident) return ; 
      console.log("clicked")
      if(alertId != undefined && incidentDate != undefined && incidentTime.trim() !== "" && incidentDescription.trim() !== "") { 
        const request_body = { 
          "incident_date" : incidentDate.toISOString().split("T")[0] , 
          "incident_time" : incidentTime + ":00" , 
          "description" : incidentDescription , 
          "alert_id" : alertId 
        }
        console.log(request_body)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/incidents/` , {
          method : "POST" , 
          headers : { 
            "Content-Type": "application/json" 
          }, 
          credentials : "include" ,
          body : JSON.stringify(request_body)
        })
        .then(res => {
          if(res.ok) {
            return res.json() 
          } 
        }) 
        .then(data => {
          if(data) { 
            setSavingIncident(false)
            toast("Success", {
                description: "Incident created successfully!",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
          } 
        }) 
        .catch( (err : Error) => {
          setSavingIncident(false)
          toast("Error", {
              description: "Failed to create incident!",
              action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
              },
          })
        })
      }else {
        setSavingIncident(false)
      }

    }

    return <>
    <div className="mx-8"> 
      <CDataTable 
          title = {
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/dashboard/alerts" className="text-lg">Alerts</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
          }
          idColumn="alert_id"
          fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alerts/all`} 
          columns={columns}  
          actions={[
              {title : "Create incident" , onClick : createIncident , icon : <Edit />} , 
              { title : "Show Alert info" , onClick : showAlertInfo , icon: <Eye/>}
          ]}
          badgeColumns={badgeColumns}
      />         
    </div>

    <Drawer direction="right" open={showAlertInfoDrawer}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Alert details</DrawerTitle>
          <DrawerDescription>Bellow you can find the details about the alerts.</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <Field className="my-2">
            <FieldLabel htmlFor="alert_id_1">Alert ID</FieldLabel>
            <Input
              id="alert_id_1"
              placeholder="Alert Id"
              required
              name='alert_id_1'
              value={alertToShow?.alert_id }
              readOnly
            />
          </Field>
          <Field className="my-2">
            <FieldLabel htmlFor="incident_date">Send Time</FieldLabel>
            <Input
              id="alert_time"
              placeholder="Send time"
              required
              name='send_time'
              type="time"
              value={alertToShow?.send_time }
              readOnly
            />
          </Field>
          <Field className="my-2">
            <FieldLabel htmlFor="alert_id">Send date</FieldLabel>
            <Input
              id="send_date"
              placeholder="Send date"
              required
              name='send_date'
              type="date"
              value={alertToShow?.send_date }
              readOnly
            />
          </Field>
          <Field className="my-2">
            <FieldLabel htmlFor="alert_id">Anomaly ID</FieldLabel>
            <Input
              id="anomaly_id"
              placeholder="Anomaly Id"
              required
              name='anomaly_id'
              value={alertToShow?.anomaly_id }
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="alert_id">Alert content</FieldLabel>
            <Textarea
              placeholder="Alert content"
              readOnly
              value={alertToShow?.content }
            />
          </Field>
          <div className="flex justify-between items-center my-6">
            <span>Severity :</span>
            <Badge className={getSeverityBadge(alertToShow?.severity as "HIGH" | "LOW" | "MEDUIM") + " px-16"}>
              {alertToShow?.severity}
            </Badge>
          </div>

        </div>
        <DrawerFooter>
          <Button onClick={saveIncident}><CheckCheck />Set as seen</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setShowAlertInfoDrawer(false)}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
        
    <Drawer direction="right" open={showIncidentDrawer}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create incident</DrawerTitle>
          <DrawerDescription>enter the incident informarion in the form bellow.</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <Field>
            <FieldLabel htmlFor="alert_id">Alert ID</FieldLabel>
            <Input
              id="alert_id"
              placeholder="Alert Id"
              required
              name='alert_id'
              value={alertId != undefined ? alertId : ""}
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="incident_date">Incident date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="incident_date"
                  className="justify-start font-normal"
                >
                  {incidentDate ? format(incidentDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={incidentDate}
                  onSelect={setIncidentDate}
                  defaultMonth={incidentDate}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field>
            <FieldLabel htmlFor="alert_id">Incident time</FieldLabel>
            <Input
              id="incident_time"
              placeholder="Incident time"
              required
              name='incident_time'
              type="time"
              onChange={(value) => setIncidentTime(value.currentTarget.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="alert_id">Incident description</FieldLabel>
            <Textarea
              placeholder="Incident description"
              onChange={(value) => setIncidentDescription(value.currentTarget.value)}
            />
          </Field>
        </div>
        <DrawerFooter>
          <Button onClick={saveIncident} disabled={savingIncident}> { savingIncident && <Spinner />} Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setShowIncidentDrawer(false)}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </>; 
}