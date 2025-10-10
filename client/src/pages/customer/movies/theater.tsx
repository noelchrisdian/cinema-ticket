import type { TheaterResponse } from "@/services/theaters/type";
import { setStep, setTicketDetail } from "@/redux/features/ticket/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export const MovieTheater = () => {
    const dispatch = useAppDispatch();
    const { movie } = useAppSelector((state) => state.ticket);
    const [theater, setTheater] = useState<TheaterResponse | null>(null);

    const handleTheater = () => {
        if (theater === null) {
            alert('Please select theater to continue');
            return;
        }

        dispatch(setTicketDetail({
            theater
        }))

        dispatch(setStep({
            step: 'TIME'
        }))
    }

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div id="Header" className="flex flex-col gap-5">
				<div
					id="Top-Nav"
					className="relative flex items-center justify-between px-5 mt-[60px]">
					<button
                        onClick={() => {
                            dispatch(setStep({
                                step: 'DETAILS'
                            }))
                        }}
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
						<img
							src="/assets/images/icons/Arrow Left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt="Back"
						/>
					</button>
					<p className="text-center mx-auto font-semibold text-sm">
						Choose Theater
					</p>
					<div className="dummy-button w-12" />
				</div>
				<div className="flex items-center justify-between gap-2 mx-5">
					<div className="flex items-center gap-[14px]">
						<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
							<img
								src={movie?.movie.thumbnailURL}
								className="w-full h-full object-cover object-top"
								alt="Despicable Mines 3 thumbnail"
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
                                <p className="text-sm text-premiere-grey">{movie?.movie.genre.name}</p>
							</div>
							<div className="flex items-center gap-2">
								<img
									src="/assets/images/icons/Location.svg"
									className="w-[18px] h-[18px] flex shrink-0"
									alt="Location icon"
								/>
                                <p className="text-sm text-premiere-grey">{movie?.movie.theaters[0].city}</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-[2px] rounded-full p-[8px_10px] bg-[#FFFFFF1A]">
						<p className="font-semibold text-xs leading-[18px]">4/5</p>
						<img
							src="/assets/images/icons/Star 1.svg"
							className="w-4 h-4 flex shrink-0"
							alt="star rating"
						/>
					</div>
				</div>
			</div>
			<div className="relative px-5 mt-5">
				<div id="Theaters" className="tab-content flex flex-col gap-4">
                    <h2 className="font-semibold">Available in Theaters</h2>
                    {movie?.movie.theaters.map((theater) => (
                        <label className="relative theather-card flex items-center rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md hover:bg-premiere-purple has-[:checked]:bg-premiere-purple transition-all duration-300" key={theater._id}>
                            <input
                                type="radio"
                                name="theater"
                                className="absolute top-1/2 left-1/2 opacity-0"
                                required
                                onChange={() => setTheater(theater)}
                            />
                            <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl overflow-hidden bg-[#D9D9D9]">
                                <img
                                    src="/assets/images/thumbnails/Theater 1.png"
                                    className="w-full h-full object-cover"
                                    alt="Tenda Bersama theater"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">{theater.name}</h3>
                                <p className="text-sm text-premiere-grey">
                                    {theater.city}
                                </p>
                            </div>
                        </label>
                    ))}
				</div>
				<div className="relative h-[98px] w-full max-w-[640px]">
					<button
                        type="button"
                        onClick={handleTheater}
						className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black">
						Continue
					</button>
				</div>
			</div>
		</div>
	)
}