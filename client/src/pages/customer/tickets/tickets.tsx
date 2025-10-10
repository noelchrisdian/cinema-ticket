import type { LoginResponse } from "@/services/auth/type";
import type { TicketResponse } from "@/services/tickets/type";
import { Bottombar } from "@/components/customer/bottombar";
import { handlerFormatDate } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";

type LoaderData = {
	tickets: TicketResponse[];
	user: LoginResponse;
}

export const CustomerOrder = () => {
	const { tickets } = useLoaderData() as LoaderData;

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div className="flex items-center justify-between px-5 mt-[60px]">
				<h1 className="font-bold text-[26px] leading-[39px]">My Tickets</h1>
			</div>

			<section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
				{tickets.map((ticket) => (
					<Link
						to={`/tickets/${ticket._id}`}
						className="card"
						key={ticket._id}>
						<div className="flex items-center justify-between gap-2">
							<div className="flex items-center gap-[14px]">
								<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
									<img
										src={ticket.movie.thumbnailURL}
										className="w-full h-full object-cover object-top"
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
									<div className="flex items-center gap-2">
										<img
											src="/assets/images/icons/Calendar 2 Grey.svg"
											className="w-[18px] h-[18px] flex shrink-0"
											alt="icon"
										/>
										<p className="text-sm text-premiere-grey">
											{handlerFormatDate(
												ticket.date,
												"HH:mm, D MMM, YYYY"
											)}
										</p>
									</div>
									<p className="w-fit rounded-full p-[4px_6px] bg-premiere-light-green text-premiere-green font-semibold text-[10px] leading-[15px]">
										SUCCESS
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
			</section>

			<Bottombar activeLink="tickets" />
		</div>
	)
}