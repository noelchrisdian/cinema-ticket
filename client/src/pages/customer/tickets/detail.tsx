import 'swiper/swiper-bundle.css';
import type { LoginResponse } from "@/services/auth/type";
import type { TicketResponse } from "@/services/tickets/type";
import { handleFormatCurrency, handlerFormatDate } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

type LoaderData = {
	ticket: TicketResponse;
	user: LoginResponse;
}

export const TicketDetail = () => {
	const { ticket } = useLoaderData() as LoaderData;

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div id="Header" className="flex flex-col gap-5">
				<div
					id="Top-Nav"
					className="relative flex items-center justify-between px-5 mt-[60px]">
					<Link
						to={"/tickets"}
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
						<img
							src="/assets/images/icons/Arrow Left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt=""
						/>
					</Link>
					<p className="text-center mx-auto font-semibold text-sm">
						Ticket Details
					</p>
					<div className="dummy-button w-12" />
				</div>
				<div className="flex items-center justify-between gap-2 mx-5">
					<div className="flex items-center gap-[14px]">
						<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
							<img
								src={ticket.movie.thumbnailURL}
								className="w-full h-full object-cover"
								alt="thumbnail"
							/>
						</div>
						<div className="flex flex-col gap-[6px]">
							<h3 className="font-semibold line-clamp-2">
								{ticket.movie.title}
							</h3>
							<div className="flex items-center gap-[6px]">
								<div className="flex items-center gap-2">
									<img
										src="/assets/images/icons/Video Vertical Grey.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="icon"
									/>
									<p className="text-sm text-premiere-grey">
										{ticket.movie.genre.name}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<img
										src="/assets/images/icons/Location.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="icon"
									/>
									<p className="text-sm text-premiere-grey">
										{ticket.theater.city}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section id="Order-Details" className="px-5 mt-5">
				<div className="accordion group flex flex-col w-full rounded-3xl p-5 gap-4 bg-white/10 has-[:checked]:!h-16 transition-all duration-300 overflow-hidden">
					<label className="relative flex items-center justify-between mb-1">
						<h2>Order Details</h2>
						<img
							src="/assets/images/icons/Arrow Circle Down.svg"
							className="w-6 h-6 flex shrink-0 group-has-[:checked]:-rotate-180 transition-all duration-300"
							alt="icon"
						/>
						<input
							type="checkbox"
							name="accordion-btn"
							className="absolute hidden"
						/>
					</label>
					<div className="flex items-center gap-4">
						<div className="flex w-[90px] h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
							<img
								src="/assets/images/thumbnails/Theater 1.png"
								className="w-full h-full object-cover"
								alt="image"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<p className="font-semibold">{ticket.theater.name}</p>
							<p className="text-sm text-premiere-grey">
								{ticket.theater.city}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Receipt 2.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Booking ID</p>
						</div>
						<p>PMRBWA1992</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Calendar 2.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Date & Time</p>
						</div>
						<p>{handlerFormatDate(ticket.date, "HH:mm, D MMM, YYYY")}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Profile User.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Quantity</p>
						</div>
						<p>{ticket.seats.length} Seats</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Ticket Star.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Seats</p>
						</div>
						<p>{ticket.seats.map((seat) => seat.seat).join(", ")}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Dollar Circle.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Price</p>
						</div>
						<p>
							{handleFormatCurrency(
								ticket.subtotal / ticket.seats.length
							)}{" "}
							/ person
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Receipt Item.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Sub Total</p>
						</div>
						<p>{handleFormatCurrency(ticket.subtotal)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Receipt Discount.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>PPN 11%</p>
						</div>
						<p>{handleFormatCurrency(ticket.tax)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Menu Board.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Booking Fee</p>
						</div>
						<p>{handleFormatCurrency(ticket.bookingFee)}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Note Favorite.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Grand Total</p>
						</div>
						<p className="font-bold text-premiere-yellow">
							{handleFormatCurrency(ticket.total)}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/assets/images/icons/Note.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p>Payment Status</p>
						</div>
						<p className="w-fit rounded-full p-[6px_10px] bg-premiere-light-green text-premiere-green font-bold text-xs leading-[18px]">
							SUCCESS
						</p>
					</div>
				</div>
			</section>
			<section id="bonus" className="flex flex-col gap-4 mt-5">
				<h2 className="font-semibold px-5">Bonus Tickets</h2>
				<div className="swiper-bonus w-full overflow-hidden">
					<Swiper
						spaceBetween={12}
						slidesPerView={"auto"}
						slidesOffsetBefore={20}
						slidesOffsetAfter={20}>
						<SwiperSlide className="swiper-slide !w-fit">
							<div className="flex items-center w-[230px] rounded-[20px] p-[10px] gap-[14px] bg-white/10">
								<div className="w-20 h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
									<img
										src="/assets/images/thumbnails/Popcorn.png"
										className="w-full h-full object-cover"
										alt="image"
									/>
								</div>
								<div className="flex flex-col min-w-[120px] gap-[6px]">
									<h3 className="font-semibold">Popcorn Salt</h3>
									<div className="flex items-center gap-2">
										<img
											src="/assets/images/icons/Coffee.svg"
											className="w-[18px] h-[18px] flex shrink-0"
											alt="icon"
										/>
										<p className="text-sm text-premiere-grey">
											Snacks
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="swiper-slide !w-fit">
							<div className="flex items-center w-[230px] rounded-[20px] p-[10px] gap-[14px] bg-white/10">
								<div className="w-20 h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
									<img
										src="/assets/images/thumbnails/Milk.png"
										className="w-full h-full object-cover"
										alt="image"
									/>
								</div>
								<div className="flex flex-col min-w-[120px] gap-[6px]">
									<h3 className="font-semibold">Milk</h3>
									<div className="flex items-center gap-2">
										<img
											src="/assets/images/icons/Coffee.svg"
											className="w-[18px] h-[18px] flex shrink-0"
											alt="icon"
										/>
										<p className="text-sm text-premiere-grey">
											Beverages
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</section>
			<div className="relative h-[98px] w-full max-w-[640px] px-5">
				<Link to={'/tickets'} className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black z-10 text-center">
					Give Rating
				</Link>
			</div>
		</div>
	)
}