"use client"
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon, LoaderIcon, TowerControl } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
 import { cn } from "@/lib/utils"
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
export default function Page() {
  const router = useRouter()
  const [ error , setError ] = useState("")
  const  [loading , setLoading] = useState(false)


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true)
    setError("")
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    if(username?.toString().trim() == "" || password?.toString().trim() == "") { 
      setError("The username or password should be not empty") 
      return 
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/token` , {
      method : "POST" ,
      body : formData , 
      credentials : "include"
    })
    .then(res => {
      if(!res.ok) {
        setLoading(false)
        setError("Username or password not correct")
        return 
      } 
      return res.json()
    }).then(data=>{ 
      if(data != undefined && data['status'] == "success") {
        setLoading(false)
        router.push("/dashboard")
      }
    })
    
  }
  useEffect( () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me` , 
      {
        credentials : "include"
      }
    )
    .then(data => {
      if(data.status == 200) { 
        router.push("/dashboard")
      }
    })
  },[])
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 items-center" >
          { error != "" &&
            <Alert variant="destructive" className="max-w-md">
              <AlertCircleIcon />
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          }
          <h1 className='flex justify-center text-2xl font-bold items-bottom px-4 rounded-lg border py-2 w-100'>
            <TowerControl className="size-7! mr-2" />
            Ouma
          </h1>
          
          <Card className='w-100'>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      placeholder="Ex. JohnDeo"
                      required
                      name='username'
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required name='password' />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={loading}>{loading && <Spinner/>}Login</Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}