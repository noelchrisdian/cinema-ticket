import type { CustomerResponse } from "@/services/customers/type";
import { columns } from "@/pages/admin/customers/columns";
import { DataTable } from "@/components/ui/data-table";
import { Title } from "@/components/admin/title";
import { useLoaderData } from "react-router-dom";

export const AdminCustomer = () => {
    const customers = useLoaderData() as CustomerResponse[];

    return (
        <>
            <Title name="List Customers" />
            <div className="">
                <DataTable columns={columns} data={customers}/>
            </div>
        </>
    )
}