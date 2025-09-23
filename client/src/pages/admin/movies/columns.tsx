import type { ColumnDef } from "@tanstack/react-table";
import type { MovieResponse } from "@/services/movies/type";
import { ActionColumn } from "@/pages/admin/movies/actions";
import { Badge } from "@/components/ui/badge";
import { handleFormatCurrency } from "@/lib/utils";

export const columns: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "title",
		header: "Movie",
		cell: ({ row }) => {
			return (
				<div className="inline-flex items-center gap-4 max-w-[600px] overflow-hidden">
					<img
						src={row.original.thumbnailURL}
						alt={row.original.thumbnailURL}
						className="w-60 h-60 object-cover object-top rounded-sm"
					/>

					<div className="space-y-3">
						<div className="">
							<h4>{row.original.title}</h4>
						</div>

						<p>Bonus : {row.original.bonus ? row.original.bonus : "-"}</p>
						<Badge
							variant={
								row.original.available ? "default" : "destructive"
							}>
							{row.original.available ? "Live now" : "Coming soon"}
						</Badge>
					</div>
				</div>
			)
		}
	},
	{
		accessorKey: "genre",
		header: "Genre",
		cell: ({ row }) => (
			<Badge variant={"secondary"}>{row.original.genre.name}</Badge>
		)
	},
	{
		accessorKey: "theaters",
		header: "Theaters",
		cell: ({ row }) => (
			<div className="flex flex-col items-center gap-4">
				{row.original.theaters.map((theater) => (
					<Badge variant={"outline"} key={theater._id}>
						{theater.name}
					</Badge>
				))}
			</div>
		)
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => handleFormatCurrency(row.original.price),
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionColumn id={row.original._id} />,
	}
]