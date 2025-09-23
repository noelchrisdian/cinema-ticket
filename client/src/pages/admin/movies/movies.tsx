import type { MovieResponse } from "@/services/movies/type";
import { Button } from "@/components/ui/button";
import { columns } from "@/pages/admin/movies/columns";
import { DataTable } from "@/components/ui/data-table";
import { Link, useLoaderData } from "react-router-dom";
import { Plus } from "lucide-react";
import { Title } from "@/components/admin/title";

export const AdminMovie = () => {
    const movies = useLoaderData() as MovieResponse[];

    return (
        <>
            <Title name="List Movies" />
            <div className="">
                <Button asChild className="mb-3">
                    <Link to={'/admin/movies/add'}>
                        <Plus className="w-6 h-6" />
                        <span>Add Movie</span>
                    </Link>
                </Button>
                <DataTable columns={columns} data={movies}/>
            </div>
        </>
    )
}