import type { ColumnDef } from "@tanstack/react-table";
import type { TheaterResponse } from "@/services/theaters/type";
import { ActionColumn } from "@/pages/admin/theaters/actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TheaterResponse>[] = [
	{
		accessorKey: "name",
		header: "Genres",
	},
	{
		accessorKey: "city",
        header: "City",
		cell: ({ row }) => <Badge>{row.original.city}</Badge>
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionColumn id={row.original._id} />  
	}
]