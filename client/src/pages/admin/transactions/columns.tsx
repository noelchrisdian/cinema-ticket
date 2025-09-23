import type { ColumnDef } from "@tanstack/react-table";
import type { TransactionResponse } from "@/services/customers/type";
import { Badge } from "@/components/ui/badge";
import { handleFormatCurrency, handlerFormatDate } from "@/lib/utils";

export const columns: ColumnDef<TransactionResponse>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => handlerFormatDate(row.original.createdAt)
    },
    {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({ row }) => handleFormatCurrency(row.original.subtotal)
    },
    {
        accessorKey: 'bookingFee',
        header: 'Booking Fee',
        cell: ({ row }) => handleFormatCurrency(row.original.bookingFee)
    },
    {
        accessorKey: 'tax',
        header: 'Tax',
        cell: ({ row }) => handleFormatCurrency(row.original.tax)
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => handleFormatCurrency(row.original.total)
    },
    {
        accessorKey: 'movie',
        header: 'Movie',
        cell: ({ row }) => (
            <div className="">
                <h3 className="mb-2">{row.original.movie.title}</h3>
                <Badge variant={'outline'}>{row.original.theater.name}</Badge>
            </div>
        )
    },
    {
        accessorKey: 'user',
        header: 'Customer',
        cell: ({ row }) => row.original.user.name
    }
]