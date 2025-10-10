import "swiper/swiper-bundle.css";
import type { MovieDetailResponse } from "@/services/global/type";
import { cn, handleFormatCurrency } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";
import { setMovieDetail, setStep } from "@/redux/features/ticket/slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

export const MovieDetail = () => {
	const [tab, setTab] = useState<"about" | "reviews" | "theaters" | "cast">(
		"about"
	)
    const { movie } = useLoaderData() as MovieDetailResponse;
    const dispatch = useAppDispatch();

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div
				id="Background"
				className="absolute top-0 w-full h-[480px] overflow-hidden">
				<div className="absolute w-full h-[169px] top-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.2%,rgba(14,14,36,0)_100%)]" />
				<div className="absolute w-full h-[169px] bottom-0 bg-[linear-gradient(360deg,#000000_6.6%,rgba(14,14,36,0)_99.33%)]" />
				<img
					src={movie.thumbnailURL}
					alt="Movie details background image"
				/>
			</div>
			<div
				id="Top-Nav"
				className="relative flex items-center justify-between px-5 mt-[60px] mb-[337px]">
				<Link
					to={"/"}
					className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
					<img
						src="/assets/images/icons/Arrow Left.svg"
						className="w-[22px] h-[22px] flex shrink-0"
						alt="Back button"
					/>
				</Link>
				<p className="text-center mx-auto font-semibold text-sm">
					Movie Details
				</p>
				<Link
					to={"/"}
					className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
					<img
						src="/assets/images/icons/Heart.svg"
						className="w-[22px] h-[22px] flex shrink-0"
						alt="Add to favorites"
					/>
				</Link>
			</div>

			<div
				id="Title"
				className="relative flex items-center justify-between px-5">
				<h1 className="font-bold text-[30px] leading-[45px]">
					{movie.title}
				</h1>
				<button
					type="button"
					className="w-[60px] h-[60px] flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
					<img
						src="/assets/images/icons/Video Circle.svg"
						className="w-9 h-9 flex shrink-0"
						alt="Play trailer video icon"
					/>
				</button>
			</div>
			<section id="Details" className="flex flex-col gap-5 mt-5">
				<div className="swiper-tabs w-full overflow-hidden">
					<Swiper
						spaceBetween={6}
						slidesPerView={"auto"}
						slidesOffsetBefore={20}
						slidesOffsetAfter={20}>
						<SwiperSlide className="!w-fit py-[1px]">
							<button
								type="button"
								className="tab-link"
								onClick={() => setTab("about")}>
								<div
									className={cn(
										"flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300",
										tab === "about"
											? "!bg-white !text-premiere-black"
											: ""
									)}>
									About
								</div>
							</button>
						</SwiperSlide>
						<SwiperSlide className="!w-fit py-[1px]">
							<button
								type="button"
								className="tab-link"
								onClick={() => setTab("reviews")}>
								<div
									className={cn(
										"flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300",
										tab === "reviews"
											? "!bg-white !text-premiere-black"
											: ""
									)}>
									Reviews
								</div>
							</button>
						</SwiperSlide>
						<SwiperSlide className="!w-fit py-[1px]">
							<button
								type="button"
								className="tab-link"
								onClick={() => setTab("theaters")}>
								<div
									className={cn(
										"flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300",
										tab === "theaters"
											? "!bg-white !text-premiere-black"
											: ""
									)}>
									Theaters
								</div>
							</button>
						</SwiperSlide>
						<SwiperSlide className="!w-fit py-[1px]">
							<button
								type="button"
								className="tab-link"
								onClick={() => setTab("cast")}>
								<div
									className={cn(
										"flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300",
										tab === "cast"
											? "!bg-white !text-premiere-black"
											: ""
									)}>
									Casts
								</div>
							</button>
						</SwiperSlide>
					</Swiper>
				</div>
				<div className="px-5">
					{tab === "about" && (
						<div
							id="About-Tab"
							className="tab-content flex flex-col gap-5">
							<div className="flex flex-col gap-3">
								<h2 className="font-semibold">About</h2>
								<p className="leading-[28px]">{movie.description}</p>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center rounded-full p-[8px_14px] gap-1 bg-[#FFFFFF1A] backdrop-blur-md">
									<img
										src="/assets/images/icons/Video Vertical White.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="Category icon"
									/>
									<p className="text-sm">{movie.genre.name}</p>
								</div>
								<div className="flex items-center rounded-full p-[8px_14px] gap-1 bg-[#FFFFFF1A] backdrop-blur-md">
									<img
										src="/assets/images/icons/Location.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="Location icon"
									/>
									<p className="text-sm">{movie.theaters[0].city}</p>
								</div>
								<div className="flex items-center rounded-full p-[8px_14px] gap-1 bg-[#FFFFFF1A] backdrop-blur-md">
									<p className="text-sm">4/5</p>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="Star rating icon"
									/>
								</div>
							</div>
						</div>
					)}
					{tab === "reviews" && (
						<div
							id="Reviews-Tab"
							className="tab-content flex flex-col gap-4">
							<h2 className="font-semibold">Customer Reviews</h2>
							<div className="review-card flex flex-col rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md">
								<div className="flex items-center gap-1">
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
								</div>
								<p className="leading-[28px]">
									It was okay for me, just so so...
								</p>
								<p className="font-semibold">Abbe Parnaman</p>
							</div>
							<div className="review-card flex flex-col rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md">
								<div className="flex items-center gap-1">
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
								</div>
								<p className="leading-[28px]">
									Movie was good, we were happy couple watching this
									every time again again.
								</p>
								<p className="font-semibold">Sarina Putri</p>
							</div>
							<div className="review-card flex flex-col rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md">
								<div className="flex items-center gap-1">
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
									<img
										src="/assets/images/icons/Star 1.svg"
										className="w-5 h-5 flex shrink-0"
										alt="Rating star"
									/>
								</div>
								<p className="leading-[28px]">
									It was okay for me, just so so...
								</p>
								<p className="font-semibold">Abbe Parnaman</p>
							</div>
						</div>
					)}
					{tab === "theaters" && (
						<div
							id="Theaters-Tab"
							className="tab-content flex flex-col gap-4">
							<h2 className="font-semibold">Available in Theaters</h2>
							{movie.theaters.map((theater) => (
								<div className="theather-card flex items-center rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md">
									<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl overflow-hidden bg-[#D9D9D9]">
										<img
											src="/assets/images/thumbnails/Theater 1.png"
											className="w-full h-full object-cover"
											alt="Tenda Bersama theater thumbnail"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<h3 className="font-semibold">{theater.name}</h3>
										<p className="text-sm text-premiere-grey">
											{theater.city}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
			<section id="bonus" className="flex flex-col gap-4 mt-5">
				<h2 className="font-semibold px-5">Bonus Tickets</h2>
				<div className="swiper-bonus w-full overflow-hidden px-3">
					<Swiper
						spaceBetween={12}
						slidesPerView={"auto"}
						slidesOffsetBefore={20}
						slidesOffsetAfter={20}>
						<SwiperSlide className="!w-fit">
							<div className="flex items-center w-[230px] rounded-[20px] p-[10px] gap-[14px] bg-white/10">
								<div className="w-20 h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
									<img
										src="/assets/images/thumbnails/Popcorn.png"
										className="w-full h-full object-cover"
										alt="Popcorn Salt thumbnail"
									/>
								</div>
								<div className="flex flex-col min-w-[120px] gap-[6px]">
									<h3 className="font-semibold">Popcorn Salt</h3>
									<div className="flex items-center gap-2">
										<img
											src="/assets/images/icons/Coffee.svg"
											className="w-[18px] h-[18px] flex shrink-0"
											alt="Snack icon"
										/>
										<p className="text-sm text-premiere-grey">
											Snacks
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="!w-fit">
							<div className="flex items-center w-[230px] rounded-[20px] p-[10px] gap-[14px] bg-white/10">
								<div className="w-20 h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
									<img
										src="/assets/images/thumbnails/Milk.png"
										className="w-full h-full object-cover"
										alt="Fresh milk thumbnail"
									/>
								</div>
								<div className="flex flex-col min-w-[120px] gap-[6px]">
									<h3 className="font-semibold">Fresh Milk</h3>
									<div className="flex items-center gap-2">
										<img
											src="/assets/images/icons/Coffee.svg"
											className="w-[18px] h-[18px] flex shrink-0"
											alt="Drink icon"
										/>
										<p className="text-sm text-premiere-grey">
											Snacks
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</section>
			<div
				id="Bottom-Nav"
				className="relative w-full h-[123px] flex shrink-0">
				<div className="fixed bottom-5 left-5 right-5 w-full max-w-[330px] mx-auto flex items-center justify-between rounded-full p-[10px_14px] pl-6 gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
					<div>
						<p className="font-semibold text-xl leading-[30px]">
							{handleFormatCurrency(movie.price)}
						</p>
						<span className="font-normal text-sm mt-[2px]">/ person</span>
					</div>
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(setStep({
                                step: 'THEATER'
                            }))
                            dispatch(setMovieDetail({
                                movie
                            }))
                        }}
						className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black">
						Buy Ticket
					</button>
				</div>
			</div>
		</div>
	)
}