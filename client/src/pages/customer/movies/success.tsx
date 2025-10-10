import { Link, Navigate } from "react-router-dom"; 
import { useAppSelector } from "@/redux/hooks";

export const TransactionSuccess = () => {
    const { movie } = useAppSelector((state) => state.ticket);

    if (!movie) {
        return <Navigate to={'/'} />
    }

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div className="flex flex-col max-h-screen">
				<div id="Background" className="relative w-full overflow-hidden">
					<div className="absolute w-full h-[169px] top-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.2%,rgba(14,14,36,0)_100%)]" />
					<div className="absolute w-full h-[169px] bottom-0 bg-[linear-gradient(360deg,#000000_6.6%,rgba(14,14,36,0)_99.33%)]" />
					<img
						src={movie?.movie.thumbnailURL}
						className="w-full h-full object-cover"
						alt="background"
					/>
				</div>

				<div className="relative flex flex-col items-center gap-[30px] mb-[70px] mt-auto px-5">
					<div className="flex flex-col w-[340px] gap-[6px] items-center">
						<img
							src="/assets/images/icons/Note Favorite.svg"
							className="w-[50px] h-[50px] flex shrink-0"
							alt="Success icon"
						/>
						<h1 className="font-bold text-[26px] leading-[39px]">
							Booking Successful
						</h1>
						<p className="text-center">
							Your tickets have been successfully purchased. Please check
							the 'My Tickets' menu.
						</p>
					</div>

					<div className="flex flex-col gap-3 w-[220px]">
						<Link
							to="/"
							className="w-full rounded-full p-[12px_18px] bg-white font-bold text-premiere-black text-center">
							Book More
						</Link>
						<Link
							to="/my-tickets"
							className="w-full rounded-full p-[12px_18px] bg-white/10 font-bold text-center backdrop-blur-sm">
							View My Tickets
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}