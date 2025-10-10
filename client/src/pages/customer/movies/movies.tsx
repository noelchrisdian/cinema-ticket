import { MovieDetail } from "@/pages/customer/movies/detail";
import { MovieTheater } from "./theater";
import { MovieTime } from "./time";
import { MovieSeat } from "./seat";
import { useAppSelector } from "@/redux/hooks"

export const CustomerMovies = () => {
    const { step } = useAppSelector((state) => state.ticket);

    return (
        <>
            {step === 'DETAILS' && <MovieDetail />}
            {step === 'THEATER' && <MovieTheater />}
            {step === 'TIME' && <MovieTime />}
            {step === 'SEAT' && <MovieSeat />}
        </>
    )
}