import { AlertCircleIcon, CalendarIcon, MoreHorizontalIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";
import { Field } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";




type Props = {
    idColumn: string , 
    columns : String[] ,  
    fetchUrl : String , 
    actions? : {title : String , onClick : any ,  icon : any }[], 
    badgeColumns? : {name : string , mapping : any}[] , 
    title : React.ReactNode
}
export default function CDataTable({fetchUrl , columns , actions , idColumn, badgeColumns , title } : Props) { 
    const [data , setData] : any = useState(undefined) 
    const [loading , setLoading] = useState(true)
    const [ error , setError] : any = useState(undefined)
    const [totalPages , setTotalPages ] = useState(undefined) 
    const [currentPage , setCurrentPage ] = useState(0)
    const [pageSize , setPageSize ] = useState(5)
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        to: addDays(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 2),
    })
    const badgeColumnsNames = badgeColumns?.map(val => val.name )||[]
    
    console.log(date)
    useEffect(() => { 
        console.log("fetching")
        fetch(`${fetchUrl}?from_date=${date?.from?.toISOString()}&to=${date?.to?.toISOString()}&page=${currentPage}&size=${pageSize}`, {
            credentials : "include"
        })
        .then(res => {
            if(res.ok) return res.json()
            else {
                setError("Cannot load data!")
                setLoading(false)
            }
        }).then(data => {
            if(data != undefined){
                setData(data.content) 
                setTotalPages(data.metadata.totalPages) 
                setLoading(false)
                console.log(data)
            }
        }).catch((err : Error) => {
            setError(err.message)
            setLoading(false)
        })

        } , [date , currentPage , pageSize] )

    return (
        <>
        <div className="flex justify-between items-center">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard" className="text-lg">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {
                        title
                    }
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex">
                <Field className="mx-auto w-60">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker-range"
                            className="justify-start px-2.5 font-normal"
                        >
                            <CalendarIcon />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Select onValueChange={(val) =>{
                    setPageSize(Number.parseInt(val))
                }}>
                    <SelectTrigger className="w-[80px] ms-3">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                
            </div>
        </div>
        <div className="mt-4">
            <div>
                { error && 
                    <Alert variant="destructive" className="w-full my-4">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert> 
                } 
                <div className="rounded-lg border px-3">
                    <Table >
                        <TableHeader>
                            <TableRow>
                                {columns.map((column , key) => <TableHead key={key}>{column}</TableHead>)}
                                {actions != undefined && <TableHead className="text-right">Actions</TableHead> }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                loading 
                                ?
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1}>
                                        <Item variant="muted">
                                            <ItemMedia>
                                                <Spinner />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemTitle className="line-clamp-1">Loading data...</ItemTitle>
                                            </ItemContent>
                                        </Item>
                                    </TableCell>
                                </TableRow>
                                :( error || data?.length == 0 
                                    ?
                                    <TableRow>
                                        <TableCell colSpan={columns.length}>No Data Found</TableCell>
                                    </TableRow>
                                    :
                                    data?.map((row : any , key : any) => 
                                        <TableRow key={key}>
                                            {
                                                columns.map(
                                                    (column , key) => 
                                                        !badgeColumnsNames.includes(column.toString()) 
                                                        ? <TableCell className='font-medium' key={key}>{row[column.toLowerCase().replace(" " , "_")]}</TableCell>
                                                        : <TableCell className='font-medium' key={key}><Badge className={badgeColumns![badgeColumnsNames.indexOf(column.toString())].mapping[row[column.toLowerCase().replace(" " , "_")]]}>{row[column.toLowerCase().replace(" " , "_")]}</Badge></TableCell>
                                                )

                                            }

                                            { actions != undefined &&<TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild ><Button variant="ghost" size="icon" className="size-8 "><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        { 
                                                            actions!.map((element , key) => <DropdownMenuItem onClick={() => element.onClick(row[idColumn])}  key={key}>{element.icon}{element.title}</DropdownMenuItem>)
                                                            
                                                        }
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell> }
                                        </TableRow>
                                    )                 
                                )
                            }   
                        </TableBody>
                    </Table>

                </div>
                
                { 
                totalPages! > 0 && <Pagination className="mt-6">
                        <PaginationContent>
                            <PaginationItem
                                onClick={() => {
                                    if(currentPage - 1 >= 0 ) { 
                                        setCurrentPage(currentPage - 1)
                                    }
                                }}>
                                <PaginationPrevious />
                            </PaginationItem>
                            {
                                Array.from({ length: totalPages! }, (_, i) => i).map((element , key) =>
                                <PaginationItem key={key} onClick={()=>setCurrentPage(element)} className={`${currentPage == element ? "border" : "" } rounded-lg mx-1`}>
                                    <PaginationLink >{element + 1 }</PaginationLink>
                                </PaginationItem>
                                )
                            }
                            <PaginationItem 
                                onClick={() => {
                                    if(currentPage + 1 < totalPages! ) { 
                                        setCurrentPage(currentPage + 1 )
                                    }
                                }}>
                                <PaginationNext/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                }
            </div>
        </div>
        </>
    ); 
}