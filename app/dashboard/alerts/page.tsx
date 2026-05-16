"use client";

import CDataTable from "@/components/c-data-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";



const columns = [
    "Alert ID" , "Send Time", "Send Date" , "Status" , "Content" , "Severity" , "Anomaly ID"
]


export default function Alerts() {
    const [showIncidentDrawer , setShowIncidentDrawer] = useState(false)
    const [alertId , setAlertId ] = React.useState<string | undefined>()
    const [incidentDate, setIncidentDate] = React.useState<Date>()
    const [incidentTime, setIncidentTime] = useState("")
    const [incidentDescription , setIncidentDescription ] = useState("")
    function createIncident(alertId : string) { 
        setShowIncidentDrawer(!showIncidentDrawer)
        setAlertId(alertId)
    }   
    function saveIncident() { 
      if(alertId != undefined && incidentDate != undefined && incidentTime.trim() !== "" && incidentDescription.trim() !== "") { 
        const request_body = { 
          "incident_date" : incidentDate.toISOString().split("T")[0] , 
          "incident_time" : incidentTime + ":00" , 
          "description" : incidentDescription , 
          "alert_id" : alertId 
        }
        console.log(request_body)
        fetch("http://ouma-backend-service:8000/api/v1/incidents/" , {
          method : "POST" , 
          headers : { 
            "Content-Type": "application/json" , 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }, 
          body : JSON.stringify(request_body)
        })
        .then(res => {
          if(res.ok) {
            return res.json() 
          } 
        }) 
        .then(data => {
          if(data) { 
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
          toast("Error", {
              description: "Failed to create incident!",
              action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
              },
          })
        })
      }

    }

    return <>
    <div className="mx-8"> 
      <CDataTable 
          idColumn="alert_id"
          fetchUrl="http://ouma-backend-service:8000/api/v1/alerts/all" 
          columns={columns}  
          actions={[
              {title : "Create incident" , onClick : createIncident}
          ]}
      />         
    </div>
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
          <Button onClick={saveIncident}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setShowIncidentDrawer(false)}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </>; 
}