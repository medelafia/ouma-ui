import { AlertCircleIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";




type Props = {
    data : any , 
    columns : String[] ,  
    loading? : Boolean, 
    error? : String
}
export default function CDataTable({data , columns , loading , error} : Props) { 
    
    return (
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
                            <TableHead className="text-right">Actions</TableHead>
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
                            :( error || data?.length 
                                ?
                                <TableRow>
                                    <TableCell colSpan={columns.length}>No Data Found</TableCell>
                                </TableRow>
                                :
                                data?.map((row : any , key : any) => 
                                    <TableRow key={key}>
                                        {
                                            columns.map(
                                                (column , key) => (
                                                    <TableCell className="font-medium" key={key}>{row[column.toLowerCase().replace(" " , "_")]}</TableCell>
                                                )
                                            )

                                        }
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild ><Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">
                                                Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )                 
                            )
                        }   
                    </TableBody>
                </Table>

            </div>
            
            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    ); 
}