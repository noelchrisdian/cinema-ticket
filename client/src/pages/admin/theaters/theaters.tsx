import type { TheaterResponse } from "@/services/theaters/type";
import { Button } from "@/components/ui/button";
import { columns } from "@/pages/admin/theaters/columns";
import { DataTable } from "@/components/ui/data-table";
import { Link, useLoaderData } from "react-router-dom";
import { Plus } from "lucide-react";
import { Title } from "@/components/admin/title";

export const AdminTheater = () => {
    const theaters = useLoaderData() as TheaterResponse[];

    return (
        <>
            <Title name="List Theaters" />
            <div className="">
                <Button asChild className="mb-3">
                    <Link to={'/admin/theaters/add'}>
                        <Plus className="w-6 h-6" />
						<span>Add Theater</span>
                    </Link>
                </Button>
                <DataTable columns={columns} data={theaters}/>
            </div>
        </>
    )
}