import type { AxiosError } from "axios";
import type { GenreResponse } from "@/services/genres/type";
import type { MovieResponse } from "@/services/movies/type";
import type { TheaterResponse } from "@/services/theaters/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import {
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    baseMovieSchema,
	createMovie,
	updateMovie,
	type MovieValues,
} from "@/services/movies/service";
import { Save } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/admin/title";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

type LoaderData = {
	genres: GenreResponse[];
	theaters: TheaterResponse[];
	detail: MovieResponse | null;
}

export const AdminMovieForm = () => {
	const { detail, genres, theaters } = useLoaderData() as LoaderData;

	const form = useForm<MovieValues>({
		resolver: zodResolver(baseMovieSchema),
        defaultValues: {
            title: detail?.title,
            price: detail?.price ? detail.price.toString() : undefined,
            genre: detail?.genre._id ?? '',
            theaters: detail === null ? [] : detail?.theaters?.map((theater) => theater._id),
            description: detail?.description,
            bonus: detail?.bonus,
            available: detail?.available
		}
	})

	const navigate = useNavigate();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: FormData) =>
			detail === null ? createMovie(data) : updateMovie(detail._id, data)
    })
    
    const selectTheaters = form.watch('theaters');

    const handleTheaters = (value: string) => {
        const selected = selectTheaters ?? [];

        if (!selected.includes(value)) {
            const newTheater = [...selectTheaters, value];
            form.setValue('theaters', newTheater)
        }
    }

    const handleRemoveTheater = (value: string) => {
        const updateTheater = selectTheaters.filter((theater) => value !== theater);
        form.setValue('theaters', updateTheater)
    }

	const handleSubmit = async (value: MovieValues) => {
		try {
            const formData = new FormData();
            formData.append('title', value.title)
            formData.append('price', value.price.toString())
            formData.append('genre', value.genre)
            formData.append('theaters', value.theaters.join(','))
            formData.append('available', value.available ? '1' : '0')
            if (value.bonus) {
                formData.append('bonus', value.bonus)
            }

            if (value.description) {
                formData.append('description', value.description)
            }

            if (value.thumbnail) {
                formData.append('thumbnail', value.thumbnail)
            }

            await mutateAsync(formData);
			navigate("/admin/movies");
            toast.success(
                `Successfully ${detail === null ? "created" : "updated"} movie`
            )
		} catch (e: unknown) {
			const error = e as AxiosError<{ message: string }>;
			toast.error(error?.response?.data?.message ?? "Something went wrong");
		}
	}

	return (
		<>
			<Title name={detail === null ? "Add Movie" : "Edit Movie"} />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-8 w-1/2">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter movie's title"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="thumbnail"
						render={() => (
							<FormItem>
								<FormLabel>Thumbnail</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										onChange={(e) => {
											if (e.target.files) {
												form.setValue(
													"thumbnail",
													e.target.files[0]
												)
											}
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="Number"
										placeholder="Enter movie's price"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="genre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Genre</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select movie's genre" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{genres.map((genre, i) => (
											<SelectItem value={genre._id} key={i}>
												{genre.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="theaters"
						render={() => (
							<FormItem>
								<FormLabel>Theaters</FormLabel>
								<Select onValueChange={handleTheaters}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select movie's theater" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{theaters.map((theater, i) => (
											<SelectItem value={theater._id} key={i}>
												{theater.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{selectTheaters?.length > 0 && (
									<div className="inline-flex items-center space-x-2">
										{selectTheaters.map((theaterID, i) => (
											<Badge
												key={`${theaterID}-${i}`}
												onClick={() =>
													handleRemoveTheater(theaterID)
												}>
												{
													theaters.find(
														(theater) => theaterID === theater._id
													)?.name
												}
											</Badge>
										))}
									</div>
								)}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter movie's description"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bonus"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bonus</FormLabel>
								<FormControl>
									<Input placeholder="Enter bonus" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="available"
						render={({ field }) => (
							<FormItem>
                                <FormControl>
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Showing Now</FormLabel>
                                        </div>
                                    </FormItem>
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
	);
}