import type { AxiosError } from "axios";
import type { GenreResponse } from "@/services/genres/type";
import { Button } from "@/components/ui/button";
import { createGenre, genreSchema, updateGenre, type GenreValues } from "@/services/genres/service";
import { Form } from "@/components/ui/form";
import {
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { Title } from "@/components/admin/title";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export const AdminGenreForm = () => {
	const detail = useLoaderData() as GenreResponse | undefined;

	const form = useForm<GenreValues>({
		resolver: zodResolver(genreSchema),
		defaultValues: {
			name: detail?.name ?? '',
		}
	})

	const navigate = useNavigate();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: GenreValues) => detail === undefined ? createGenre(data) : updateGenre(detail._id, data)
	})

	const handleSubmit = async (value: GenreValues) => {
		try {
			await mutateAsync(value);
			navigate('/admin/genres');
			toast.success(`Successfully ${detail === undefined ? 'created' : 'updated'} genre`);
		} catch (e: unknown) {
			const error = e as AxiosError<{ message: string }>;
			toast.error(error?.response?.data?.message ?? 'Something went wrong');
		}
	}

	return (
		<>
			<Title name={`${detail === undefined ? 'Add Genre' : 'Edit Genre'}`} />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-8 w-1/2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter genre name"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
                    />
                    
                    <Button isLoading={isPending}>
                        <Save className="w-6 h-6" />
                        Save
                    </Button>
				</form>
			</Form>
		</>
	)
}