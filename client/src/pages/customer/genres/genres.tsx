import "swiper/swiper-bundle.css";
import type { GenreResponse } from "@/services/genres/type";
import type { TheaterResponse } from "@/services/theaters/type";
import { getFilteredMovie } from "@/services/global/service";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { SheetFilter } from "@/pages/customer/genres/filter";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "@/redux/hooks";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type LoaderData = {
	genres: Pick<GenreResponse, "_id" | "name">[];
	theaters: TheaterResponse[];
}

export const CustomerGenres = () => {
	const [show, setShow] = useState<boolean>(false);
	const { genreID } = useParams();
	const { genres, theaters } = useLoaderData() as LoaderData;

	const filter = useAppSelector((state) => state.filter);
	const { data, isLoading } = useQuery({
		queryKey: ["browse-movies", genreID, filter],
		queryFn: () => getFilteredMovie(genreID ?? "", filter)
    })
    
	const selectedGenre = useMemo(() => {
		if (!genreID) {
			return null;
		}

		return genres.find((genre) => genre._id === genreID);
	}, [genres, genreID])

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			{isLoading ? (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Loader2Icon className="animate-spin w-20 h-20" />
				</div>
			) : (
				<>
					<div
						id="Top-Nav"
						className="relative flex items-center justify-between px-5 mt-[60px]">
						<Link
							to={"/"}
							className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
							<img
								src="/assets/images/icons/Arrow Left.svg"
								className="w-[22px] h-[22px] flex shrink-0"
								alt=""
							/>
						</Link>
						<p className="text-center mx-auto font-semibold text-sm">
							{selectedGenre ? `${selectedGenre.name} Genre` : ""}
						</p>
						<div className="dummy-button w-12" />
					</div>
					<section className="flex items-center gap-3 flex-wrap px-5 mt-5">
						<p className="font-semibold">Filters</p>
						<div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
							{selectedGenre ? selectedGenre.name : ""}
						</div>
						{filter.city && (
							<div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
								{filter.city}
							</div>
						)}

						{filter.theaters?.map((theater) => (
							<div
								className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300"
								key={theater}>
								{theaters.find((value) => theater === value._id)?.name}
							</div>
						))}
					</section>
					<section id="Popular" className="flex flex-col gap-4 mt-5">
						<h2 className="font-semibold px-5">
							Popular Movies in {selectedGenre ? `${selectedGenre.name}` : ""}
						</h2>
						<div className="swiper-popular w-full overflow-hidden px-3">
							<Swiper
								spaceBetween={16}
								slidesPerView={"auto"}
								slidesOffsetBefore={20}
								slidesOffsetAfter={20}>
								{data?.data.filtered.map((item) => (
									<SwiperSlide className="!w-fit" key={item._id}>
										<Link to={`/movies/${item._id}`} className="card">
											<div className="relative flex w-[240px] h-[300px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
												<img
													src={item.thumbnailURL}
													className="w-full h-full object-cover"
													alt="thumbnail"
												/>
												<div className="absolute w-full bottom-0 p-[14px] z-10">
													<div className="flex items-center w-full rounded-[20px] p-[14px] gap-3 bg-[#FFFFFF33] backdrop-blur-md verflow-hidden">
														<img
															src="/assets/images/icons/Video Vertical White.svg"
															className="w-8 h-8 flex shrink-0"
															alt="icon"
														/>
														<div className="flex flex-col gap-[2px]">
															<p className="text-sm">
																{item.genre.name}
															</p>
															<h3 className="font-semibold">
																{item.title}
															</h3>
														</div>
													</div>
												</div>
											</div>
										</Link>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</section>
					<section
						id="New-Movies"
						className="flex flex-col gap-4 mt-5 px-5">
						<h2 className="font-semibold">All New Movies</h2>
						{data?.data.movies
							.filter((movie) => movie.genre?._id !== selectedGenre?._id)
							.map((movie) => (
								<div className="" key={movie._id}>
									<Link to={`movies/${movie._id}`} className="card">
										<div className="flex items-center justify-between gap-2">
											<div className="flex items-center gap-[14px]">
												<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
													<img
														src={movie.thumbnailURL}
														className="w-full h-full object-cover"
														alt="thumbnail"
													/>
												</div>
												<div className="flex flex-col gap-[6px]">
													<h3 className="font-semibold line-clamp-2">
														{movie.title}
													</h3>
													<div className="flex items-center gap-2">
														<img
															src="/assets/images/icons/Video Vertical Grey.svg"
															className="w-[18px] h-[18px] flex shrink-0"
															alt="icon"
														/>
														<p className="text-sm text-premiere-grey">
															{movie.genre.name}
														</p>
													</div>
													<div className="flex items-center gap-2">
														<img
															src="/assets/images/icons/Location.svg"
															className="w-[18px] h-[18px] flex shrink-0"
															alt="icon"
														/>
														<p className="text-sm text-premiere-grey">
															{movie.theaters[0].city}
														</p>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-[2px] rounded-full p-[8px_10px] bg-[#FFFFFF1A]">
												<p className="font-semibold text-xs leading-[18px]">
													4/5
												</p>
												<img
													src="/assets/images/icons/Star 1.svg"
													className="w-4 h-4 flex shrink-0"
													alt="star"
												/>
											</div>
										</div>
									</Link>
								</div>
							))}
					</section>
					<div
						id="Bottom-Nav"
						className="relative w-full h-[123px] flex shrink-0">
						<button
							type="button"
							className="fixed bottom-5 left-5 right-5 flex items-center shrink-0 rounded-3xl p-3 gap-3 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 bg-black invert w-fit pr-4 mx-auto"
							onClick={() => {
								setShow(true);
								const body = document.getElementsByTagName("body")[0];
								body.classList.toggle("overflow-hidden");
							}}>
							<img
								src="/assets/images/icons/Video Vertical White.svg"
								className="w-6 h-6 flex shrink-0"
								alt="icon"
							/>
							<p className="font-semibold text-sm text-white">
								Filter Movies
							</p>
						</button>
					</div>
					<SheetFilter
						onCancel={() => setShow(false)}
						setShow={() => setShow(true)}
						show={show}
					/>
				</>
			)}
		</div>
	)
}