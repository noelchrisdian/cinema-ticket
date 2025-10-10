import "@/customer.css";
import type { MovieDetailResponse } from "@/services/global/type";
import { cn, handleFormatCurrency } from "@/lib/utils";
import { checkSeat } from "@/services/global/service";
import { Loader2Icon } from "lucide-react";
import { setStep, setTicketDetail } from "@/redux/features/ticket/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const MovieSeat = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { detail } = useAppSelector((state) => state.ticket);
	const { movie } = useLoaderData() as MovieDetailResponse;
	const [seat, setSeat] = useState<string[]>([]);

	const { data, isLoading } = useQuery({
		queryKey: ["selected-seats", movie._id, detail?.time],
		queryFn: () => checkSeat(movie._id, detail?.time ?? ""),
		enabled: !!movie._id && !!detail?.time,
	})

	const handleSeat = () => {
		if (seat.length === 0) {
			alert("Please select seat(s) to continue");
			return;
		}

		dispatch(
			setTicketDetail({
				seat
			})
		)

		navigate("/checkout");
	}

	const bookedSeat = data?.data.map((seat) => seat.seat) ?? [];

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto overflow-x-hidden bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] text-white">
			<div id="Header" className="relative flex flex-col h-[257px] gap-5">
				<div id="screen-container" className="absolute bottom-0 w-full z-0">
					<img
						src="/assets/images/backgrounds/Screen Light.svg"
						className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[70%] left-1/2"
						alt="Screen light effect"
					/>
					<div
						id="Screen"
						className="relative flex h-[197px] overflow-hidden">
						<img
							src={movie.thumbnailURL}
							className="w-full h-full object-cover object-top"
							alt="Movie thumbnail"
						/>
					</div>
					<p className="font-semibold text-sm w-fit transform -translate-x-1/2 -translate-y-1/2 absolute bottom-8 left-1/2">
						SCREEN
					</p>
				</div>
				<div
					id="Top-Nav"
					className="relative flex items-center justify-between px-5 mt-[60px]">
					<button
						type="button"
						onClick={() => {
							dispatch(
								setStep({
									step: "TIME",
								})
							);
						}}
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
						<img
							src="/assets/images/icons/Arrow Left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt="Back"
						/>
					</button>
					<p className="text-center mx-auto font-semibold text-sm">
						Choose Your Seats
					</p>
					<div className="dummy-button w-12" />
				</div>
			</div>
			<div className="relative px-5 mt-5">
				{!isLoading && data ? (
					<div
						id="Seats-Options"
						className="grid grid-cols-5 w-full max-w-[280px] mx-auto gap-x-[20px] gap-y-[30px]">
						{movie.seats.map((item, index) => {
							const selected = seat.includes(item.seat);
							return (
								<label
									key={index}
									className="group relative flex w-10 h-[38px] shrink-0 has-[:disabled]:brightness-50">
									<input
										type="checkbox"
										name="seat"
										className="seat-checkbox absolute top-1/2 left-1/2 opacity-0"
										disabled={
											item.isBooked ||
											bookedSeat?.includes(item.seat)
										}
										value={item.seat}
										onChange={(e) => {
											const { checked, value } = e.target;
											setSeat((prev) => {
												if (checked) {
													return prev.includes(value)
														? prev
														: [...prev, value];
												}

												return prev.filter(
													(seat) => seat !== value
												);
											});
										}}
									/>
									<img
										src="/assets/images/icons/Seat.svg"
										className={cn(
											"absolute w-full h-full object-contain opacity-100 group-has-[:checked]:opacity-0 transition-all duration-300",
											selected && "opacity-0"
										)}
										alt="Available seat icon"
									/>
									<img
										src="/assets/images/icons/Seat Choosed.svg"
										className={cn(
											"absolute w-full h-full object-contain opacity-0 group-has-[:checked]:opacity-100 transition-all duration-300",
											selected && "opacity-100"
										)}
										alt="Selected seat icon"
									/>
									<p
										className={cn(
											"relative flex items-center justify-center h-full w-full pb-[6px] font-semibold text-xs leading-[18px] text-premiere-black group-has-[:checked]:text-white",
											selected && "text-white"
										)}>
										{item.seat}
									</p>
								</label>
							)
						})}
					</div>
				) : (
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<Loader2Icon className="animate-spin w-20 h-20" />
					</div>
				)}
				<div className="flex items-center justify-center mt-[30px] gap-5">
					<div className="flex items-center gap-[6px]">
						<span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-white" />
						<span className="font-semibold text-xs leading-[18px]">
							Available
						</span>
					</div>
					<div className="flex items-center gap-[6px]">
						<span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-white brightness-50" />
						<span className="font-semibold text-xs leading-[18px]">
							Booked
						</span>
					</div>
					<div className="flex items-center gap-[6px]">
						<span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-premiere-purple" />
						<span className="font-semibold text-xs leading-[18px]">
							Selected
						</span>
					</div>
				</div>
				<div
					id="Bottom-Nav"
					className="relative w-full h-[123px] flex shrink-0">
					<div className="fixed bottom-5 left-5 right-5 w-full max-w-[330px] mx-auto flex items-center justify-between rounded-full p-[10px_14px] pl-6 gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
						<div>
							<p
								id="price"
								className="font-semibold text-xl leading-[30px]">
								{seat.length === 0
									? handleFormatCurrency(movie.price ?? 0)
									: handleFormatCurrency(
											(movie.price ?? 0) * seat.length
									  )}
							</p>
							<span id="person" className="font-normal text-sm mt-[2px]">
								{seat.length === 0 ? "-" : seat.length}{" "}
								{seat.length > 1 ? "persons" : "person"}
							</span>
						</div>
						<button
							type="button"
							onClick={handleSeat}
							className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black">
							Continue
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}