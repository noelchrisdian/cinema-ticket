import type { LoginResponse } from "@/services/auth/type";
import {
    buyTicket,
    transactionSchema,
    type TransactionValues
} from "@/services/global/service";
import { getBalance } from "@/services/wallets/service";
import { handleFormatCurrency, handlerFormatDate } from "@/lib/utils";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { setStep } from "@/redux/features/ticket/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const CustomerCheckout = () => {
    const user = useLoaderData() as LoginResponse;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
	const { detail, movie } = useAppSelector((state) => state.ticket);

    const { data } = useQuery({
        queryKey: ['get-balance'],
        queryFn: async () => getBalance()
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: TransactionValues) => buyTicket(data)
    })

	const prices = useMemo(() => {
		if (!detail && !movie) {
			return {
				subtotal: 0,
				tax: 0,
				bookingFee: 0,
				total: 0,
			}
		}

		const subtotal = (movie?.movie.price ?? 0) * (detail?.seat?.length ?? 0);
		const tax = (subtotal * 11) / 100;
		const bookingFee = 3_000;
		const total = subtotal + tax + bookingFee;

		return {
			subtotal,
			tax,
			bookingFee,
			total,
		}
    }, [detail, movie])
    
    const checkBalance = (data?.data.balance ?? 0) > prices.total;

    const handleCheckout = async () => {
        try {
            const parse = transactionSchema.parse({
                subtotal: prices.subtotal,
                tax: prices.tax,
                bookingFee: prices.bookingFee,
                total: prices.total,
                movie: movie?.movie._id,
                theater: detail?.theater?._id,
                seats: detail?.seat,
                date: handlerFormatDate(detail?.time ?? '', 'YYYY-MM-DD HH:mm')
            })

            await mutateAsync(parse);
            dispatch(
                setStep({
                    step: 'DETAILS'
                })
            )
            navigate('/checkout/success');
        } catch (error) {
            console.error(error);
        }
    }

	if (!detail && !movie) {
		return <Navigate to={"/"} />;
	}

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div id="Header" className="flex flex-col gap-5">
				<div
					id="Top-Nav"
					className="relative flex items-center justify-between px-5 mt-[60px]">
					<Link
						to={`/movies/${movie?.movie._id ?? ""}`}
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
						<img
							src="/assets/images/icons/Arrow Left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt="Back"
						/>
					</Link>
					<p className="text-center mx-auto font-semibold text-sm">
						Tickets Payment
					</p>
					<div className="dummy-button w-12" />{" "}
				</div>

				<div className="flex items-center justify-between gap-2 mx-5">
					<div className="flex items-center gap-[14px]">
						<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
							<img
								src={movie?.movie.thumbnailURL}
								className="w-full h-full object-cover object-top"
								alt="Movie thumbnail"
							/>
						</div>
						<div className="flex flex-col gap-[6px]">
							<h3 className="font-semibold line-clamp-2">
								{movie?.movie.title}
							</h3>
							<div className="flex items-center gap-2">
								<img
									src="/assets/images/icons/Video Vertical Grey.svg"
									className="w-[18px] h-[18px] flex shrink-0"
									alt="Category icon"
								/>
								<p className="text-sm text-premiere-grey">
									{movie?.movie.genre.name}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<img
									src="/assets/images/icons/Location.svg"
									className="w-[18px] h-[18px] flex shrink-0"
									alt="Location icon"
								/>
								<p className="text-sm text-premiere-grey">
									{detail?.theater?.city}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-[2px] rounded-full p-[8px_10px] bg-[#FFFFFF1A]">
						<p className="font-semibold text-xs leading-[18px]">4.5/5</p>
						<img
							src="/assets/images/icons/Star 1.svg"
							className="w-4 h-4 flex shrink-0"
							alt="Rating star"
						/>{" "}
					</div>
				</div>
			</div>

			<section id="Order-Details" className="px-5 mt-5">
				<div className="accordion group flex flex-col w-full rounded-3xl p-5 gap-4 bg-white/10 has-[:checked]:!h-16 transition-all duration-300 overflow-hidden">
					<label
						htmlFor="accordion-toggle"
						className="relative flex items-center justify-between mb-1">
						<h2>Order Details</h2>
						<img
							src="/assets/images/icons/Arrow Circle Down.svg"
							className="w-6 h-6 flex shrink-0 group-has-[:checked]:-rotate-180 transition-all duration-300"
							alt="Accordion toggle icon"
						/>
						<input
							type="checkbox"
							name="accordion-btn"
							id="accordion-toggle"
							className="absolute hidden"
						/>
					</label>

					<div className="flex items-center gap-4">
						<div className="flex w-[90px] h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
							<img
								src="/assets/images/thumbnails/Theater 1.png"
								className="w-full h-full object-cover"
								alt="Cinema"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<p className="font-semibold">{detail?.theater?.name}</p>
							<p className="text-sm text-premiere-grey">
								{detail?.theater?.city}
							</p>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Calendar 2.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Date icon"
							/>
							<p>Date & Time</p>
						</div>
						<p>
							{handlerFormatDate(
								detail?.time ?? "",
								"HH:mm, DD MMM YYYY"
							)}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Profile User.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Quantity icon"
							/>
							<p>Quantity</p>
						</div>
						<p>{detail?.seat?.length}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Ticket Star.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Seats icon"
							/>
							<p>Seats</p>
						</div>
						<p>{detail?.seat?.join(", ")}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Coffee White.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Bonus icon"
							/>
							<p>Bonus</p>
						</div>
						<p>{movie?.movie.bonus}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Dollar Circle.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Price icon"
							/>
							<p>Price</p>
						</div>
						<p>
							{handleFormatCurrency(movie?.movie.price ?? 0)} / person
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Receipt Item.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Sub Total icon"
							/>
							<p>Sub Total</p>
						</div>
						<p>{handleFormatCurrency(prices.subtotal)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Receipt Discount.svg"
								className="w-6 h-6 flex shrink-0"
								alt="PPN icon"
							/>
							<p>PPN 11%</p>
						</div>
						<p>{handleFormatCurrency(prices.tax)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Menu Board.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Booking Fee icon"
							/>
							<p>Booking Fee</p>
						</div>
						<p>{handleFormatCurrency(prices.bookingFee)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Note Favorite.svg"
								className="w-6 h-6 flex shrink-0"
								alt="Grand Total icon"
							/>
							<p>Grand Total</p>
						</div>
						<p className="font-bold text-premiere-yellow">
							{handleFormatCurrency(prices.total)}
						</p>
					</div>
				</div>
			</section>

			<section id="Wallet" className="flex flex-col gap-3 px-5 mt-5">
				<h2 className="font-semibold">My Wallet</h2>
				<div className="relative flex flex-col w-full max-w-[353px] rounded-[30px] bg-white/10 overflow-hidden">
					<img
						src="/assets/images/backgrounds/Wallet Lines.svg"
						className="absolute w-full h-full object-cover"
						alt="Wallet background"
					/>
					<img
						src="/assets/images/logos/Wallet.svg"
						className="relative flex shrink-0 w-[51px] mt-6 mx-6"
						alt="Wallet logo"
					/>
					<p className="relative font-bold text-4xl leading-[54px] mt-[18px] mx-6">
						{handleFormatCurrency(data?.data.balance ?? 0)}
					</p>
					<div className="flex items-center justify-between p-[10px_14px] pl-6 bg-white/20 backdrop-blur-3xl mt-[21px]">
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Name</p>
							<p className="font-semibold text-sm">{user.name}</p>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Expired At</p>
							<p className="font-semibold text-sm">
								02/30
							</p>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Branch</p>
							<p className="font-semibold text-sm">
								HQ
							</p>
						</div>
					</div>
				</div>
			</section>

			{!checkBalance && (
				<div className="flex items-center justify-between gap-3 rounded-[20px] p-4 bg-premiere-red mx-5 my-5">
					<p className="font-semibold">
						Your e - wallet balance is currently insufficient
					</p>
					<Link
						to={"/top-up"}
						className="w-1/3 rounded-full p-[8px_12px] bg-white font-bold text-premiere-black text-center">
						Top Up
					</Link>
				</div>
			)}
			{checkBalance && (
				<div>
					<div className="flex items-center gap-3 px-5 mt-5">
						<label
							htmlFor="agreement-checkbox"
							className="group relative flex gap-3">
                            <input
								type="checkbox"
								name="city"
								id="agreement-checkbox"
								className="w-6 h-6 rounded-lg appearance-none checked:border-4 checked:border-solid checked:border-premiere-black checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
							/>
						<p className="">I agree to the terms and proceed with the purchase</p>
						</label>
					</div>

					<div
						id="Bottom-Nav"
						className="relative w-full h-[123px] flex shrink-0">
						<div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[330px] mx-auto flex items-center justify-between rounded-full p-[10px_14px] pl-6 gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
							<div>
								<p
									id="price"
									className="font-semibold text-xl leading-[30px]">
									{handleFormatCurrency(prices.total)}
								</p>
								<span className="font-normal text-sm mt-[2px]">
									Grand Total
								</span>
							</div>
							<button
                                type="button"
                                onClick={handleCheckout}
                                disabled={isPending}
								className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black">
								Pay Now
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}