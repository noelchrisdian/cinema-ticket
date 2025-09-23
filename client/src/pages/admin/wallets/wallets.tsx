import type { WalletTransactionResponse } from "@/services/customers/type"
import { columns } from "@/pages/admin/wallets/columns";
import { DataTable } from "@/components/ui/data-table";
import { Title } from "@/components/admin/title";
import { useLoaderData } from "react-router-dom";

export const AdminWallet = () => {
    const wallets = useLoaderData() as WalletTransactionResponse[];

    return (
        <>
            <Title name="List Wallet Transactions"/>
            <DataTable columns={columns} data={wallets}/>
        </>
    )
}