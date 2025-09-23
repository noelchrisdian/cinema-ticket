import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerResponse } from "@/services/customers/type";

export const columns: ColumnDef<CustomerResponse>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    }
]