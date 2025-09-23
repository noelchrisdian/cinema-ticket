import type { TransactionResponse } from "@/services/customers/type";
import { columns } from "@/pages/admin/transactions/columns";
import { DataTable } from "@/components/ui/data-table";
import { Title } from "@/components/admin/title";
import { useLoaderData } from "react-router-dom";

export const AdminTransaction = () => {
    const transactions = useLoaderData() as TransactionResponse[];

    return (
        <>
            <Title name="List Transactions" />
            <DataTable columns={columns} data={transactions} />
        </>
    )
}