import type { AxiosError } from "axios";
import type { TheaterResponse } from "@/services/theaters/type";
import { Button } from "@/components/ui/button";
import {
	createTheater,
	theaterSchema,
	updateTheater,
	type TheaterValues,
} from "@/services/theaters/service";
import { cities } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import {
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/admin/title";
import { toast } from "sonner";
import { Save } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

export const AdminTheaterForm = () => {
	const detail = useLoaderData() as TheaterResponse | undefined;

	const form = useForm<TheaterValues>({
		resolver: zodResolver(theaterSchema),
		defaultValues: {
			name: detail?.name || "",
			city: detail?.city || "",
		}
	})

	const navigate = useNavigate();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: TheaterValues) =>
			detail === undefined
				? createTheater(data)
				: updateTheater(detail._id, data),
	})

	const handleSubmit = async (value: TheaterValues) => {
		try {
			await mutateAsync(value);
			navigate("/admin/theaters");
			toast.success(
				`Successfully ${
					detail === undefined ? "created" : "updated"
				} theater`
			)
		} catch (e: unknown) {
			const error = e as AxiosError<{ message: string }>;
			toast.error(error?.response?.data?.message ?? "Something went wrong")
		}
	}

	return (
		<>
			<Title name={detail === undefined ? "Add Theater" : "Edit Theater"} />
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
									<Input placeholder="Enter theater name" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select theater's city location" />
										</SelectTrigger>
									</FormControl>
                                    <SelectContent>
                                        {cities.map((city, i) => (
                                            <SelectItem value={city} key={i}>
                                                {city}
                                            </SelectItem>
                                        ))}
									</SelectContent>
								</Select>
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