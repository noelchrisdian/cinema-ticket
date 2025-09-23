import type { ColumnDef } from "@tanstack/react-table";
import type { WalletTransactionResponse } from "@/services/customers/type";
import { Badge } from "@/components/ui/badge";
import { handleFormatCurrency, handlerFormatDate } from "@/lib/utils";

export const columns: ColumnDef<WalletTransactionResponse>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => handlerFormatDate(row.original.createdAt)
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => handleFormatCurrency(row.original.price)
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <Badge variant={'outline'}>{row.original.status}</Badge>
    },
    {
        accessorKey: 'wallet',
        header: 'Customer',
        cell: ({ row }) => row.original.wallet.user.name
    }
]