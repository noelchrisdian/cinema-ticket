import type { GenreResponse } from "@/services/genres/type";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Link, useLoaderData } from "react-router-dom";
import { Plus } from "lucide-react";
import { Title } from "@/components/admin/title";

export const AdminGenre = () => {
    const genres = useLoaderData() as GenreResponse[];

	return (
		<>
			<Title name="List Genres" />
			<div>
				<Button asChild className="mb-3">
					<Link to={"/admin/genres/add"}>
						<Plus className="w-6 h-6" />
						<span>Add Genre</span>
					</Link>
				</Button>
				<DataTable columns={columns} data={genres} />
			</div>
		</>
	)
}