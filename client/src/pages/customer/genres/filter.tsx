import type { GenreResponse } from "@/services/genres/type";
import type { TheaterResponse } from "@/services/theaters/type";
import { cities, cn } from "@/lib/utils";
import { filterSchema, type FilterValues } from "@/services/global/service";
import { setFilter } from "@/redux/features/filter/slice";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface SheetFilterProps {
	onCancel: () => void;
	show: boolean;
	setShow: () => void;
}

type LoaderData = {
	genres: Pick<GenreResponse, "_id" | "name">[];
	theaters: TheaterResponse[];
}

export const SheetFilter = ({ onCancel, show }: SheetFilterProps) => {
	const { genres, theaters } = useLoaderData() as LoaderData;
	const { genreID } = useParams();
	const filter = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { handleSubmit, register } = useForm<FilterValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			availability: "1",
			city: filter?.city,
			genre: genreID,
			theaters: filter?.theaters ?? [],
		},
	})

	const submit = (value: FilterValues) => {
		dispatch(
			setFilter({
				availability: value?.availability === "1",
				city: value?.city ?? undefined,
				genre: value?.genre ?? undefined,
				theaters: value?.theaters ?? [],
			})
		)

		onCancel();

		const body = document.getElementsByTagName("body")[0];
		body.classList.toggle("overflow-hidden");
		navigate(`/browse-genre/${value.genre}`);
	}

	return (
		<div className="filter-sidebar-container relative w-full">
			<div
				id="Filter-Sidebar"
				className={cn(
					"fixed top-0 left-full flex h-screen w-full max-w-[640px] bg-black/70 z-50 transition-all duration-1000",
					show ? "left-auto" : "left-full"
				)}>
				<button
					type="button"
					onClick={() => {
						const body = document.getElementsByTagName("body")[0];
						body.classList.toggle("overflow-hidden");
					}}
					className="w-full h-full"
				/>
				<div className="flex flex-col w-full h-full max-w-[320px] shrink-0 bg-white overflow-y-scroll">
					<div className="relative flex items-center justify-between px-5 mt-[60px]">
						<button
							type="button"
							className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#0101011A] backdrop-blur-md rounded-full"
							onClick={() => {
								onCancel();
								const body = document.getElementsByTagName("body")[0];
								body.classList.toggle("overflow-hidden");
							}}>
							<img
								src="/assets/images/icons/Arrow Left.svg"
								className="w-[22px] h-[22px] flex shrink-0 invert"
								alt=""
							/>
						</button>
						<p className="text-center mx-auto font-semibold text-sm text-premiere-black">
							Filter Movies
						</p>
						<div className="dummy-button w-12" />
					</div>
					<form
						onSubmit={handleSubmit(submit)}
						className="flex flex-col gap-[30px] px-5 mt-[30px] mb-[110px]">
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-premiere-black">Genre</p>
							{genres.map((genre) => (
								<label
									className="flex items-center gap-[10px]"
									key={genre._id}>
									<input
										type="radio"
										value={genre._id}
										className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
										{...register("genre")}
									/>
									<p className="font-semibold text-premiere-black">
										{genre.name}
									</p>
								</label>
							))}
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-premiere-black">City</p>
							{cities.map((city, i) => (
								<label className="flex items-center gap-[10px]" key={i}>
									<input
										type="radio"
										value={city}
										className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
										{...register("city")}
									/>
									<p className="font-semibold text-premiere-black">
										{city}
									</p>
								</label>
							))}
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-premiere-black">
								Theater
							</p>
							{theaters.map((theater) => (
								<label
									className="flex items-center gap-[10px]"
									key={theater._id}>
									<input
										type="checkbox"
										value={theater._id}
										className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
										{...register("theaters")}
									/>
									<p className="font-semibold text-premiere-black">
										{theater.name}
									</p>
								</label>
							))}
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-premiere-black">
								Availability
							</p>
							<label className="flex items-center gap-[10px]">
								<input
									type="radio"
									value={"1"}
									className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
									{...register("availability")}
								/>
								<p className="font-semibold text-premiere-black">
									Available Now
								</p>
							</label>
							<label className="flex items-center gap-[10px]">
								<input
									type="radio"
									value={"0"}
									className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
									{...register("availability")}
								/>
								<p className="font-semibold text-premiere-black">
									Coming Soon
								</p>
							</label>
						</div>
						<button
							type="submit"
							className="w-full rounded-full p-[12px_18px] bg-[#5236FF] text-white font-bold text-center">
							Show Movies
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}