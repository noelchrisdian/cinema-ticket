import type { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { deleteTheater } from "@/services/theaters/service";
import { Link, useRevalidator } from "react-router-dom";
import { SquarePen, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const ActionColumn = ({ id }: { id: string }) => {
    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => deleteTheater(id)
    })

    const revalidator = useRevalidator();

    const handleDelete = async () => {
        try {
            await mutateAsync();
            revalidator.revalidate();
            toast.success('Successfully deleted theater')
        } catch (e: unknown) {
            const error = e as AxiosError<{ message: string }>;
            toast.error(error?.response?.data?.message ?? 'Something went wrong')
        }
    }

    return (
        <div className="inline-flex items-center gap-4 p-5">
            <Button asChild size={'sm'} variant={'secondary'}>
                <Link to={`/admin/theaters/edit/${id}`}>
                    <SquarePen className="w-6 h-6" />
                    Edit
                </Link>
            </Button>
            <Button
                isLoading={isPending}
                onClick={handleDelete}
                size={'sm'}
                variant={'destructive'}
            >
                <Trash className="w-6 h-6" />
                Delete
            </Button>
        </div>
    )
}