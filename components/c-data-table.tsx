import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";




type Props = {
    data : any , 
    columns : String[] ,  
    loading? : Boolean
}
export default function CDataTable({data , columns , loading} : Props) { 
    return (
        <div>
            <div className="rounded-lg border">
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
                                    loading
                                </TableCell>
                            </TableRow>
                            :
                            data?.map((row : any , key : any) => 
                                    <TableRow key={key}>
                                        {
                                            columns.map(
                                                (column) => (
                                                    <TableCell className="font-medium">{row[column.toLowerCase().replace(" " , "_")]}</TableCell>
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