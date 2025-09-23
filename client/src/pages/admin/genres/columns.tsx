import type { ColumnDef } from '@tanstack/react-table';
import type { GenreResponse } from '@/services/genres/type';
import { ActionColumn } from '@/pages/admin/genres/actions';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<GenreResponse>[] = [
    {
        accessorKey: 'name',
        header: 'Genres',
        cell: ({ row }) => <Badge>{row.original.name}</Badge>
    }, 
    {
        id: 'actions',
        cell: ({ row }) => {
            return <ActionColumn id={row.original._id}/>
        }
    }
]