import type { LoginResponse } from "@/services/auth/type";
import { getBalance, topupWallet } from "@/services/wallets/service";
import { handleFormatCurrency } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const CustomerTopup = () => {
	const user = useLoaderData() as LoginResponse;

	const { data, isLoading } = useQuery({
		queryKey: ["get-balance"],
		queryFn: async () => getBalance(),
	})

	const [amount, setAmount] = useState<number>(0);

	const topupAmounts = [
		{ value: 50_000, display: "50.000" },
		{ value: 150_000, display: "150.000" },
		{ value: 350_000, display: "350.000" },
		{ value: 500_000, display: "500.000" },
		{ value: 750_000, display: "750.000" },
		{ value: 900_000, display: "900.000" }
    ]
    
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: { balance: number }) => topupWallet(data)
    })

    const handleTopup = async () => {
        try {
            if (amount === 0) {
                alert('Please select top up nominal to continue');
                return;
            }
    
            const { data } = await mutateAsync({ balance: amount });
            window.location.replace(data.redirect_url)
        } catch (error) {
            console.error(error);
        }
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
						to={"/wallets"}
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
						<img
							src="/assets/images/icons/Arrow Left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt="Back"
						/>
					</Link>
					<p className="text-center mx-auto font-semibold text-sm">
						Topup Wallet
					</p>
					<div className="dummy-button w-12" />
				</div>
			</div>

			{isLoading ? (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Loader2Icon className="animate-spin w-20 h-20" />
				</div>
			) : (
				<>
					<section
						id="Wallet"
						className="flex flex-col items-center gap-3 px-5 mt-5">
						<div className="relative flex flex-col w-full max-w-[353px] rounded-[30px] bg-white/10 overflow-hidden">
							<img
								src="/assets/images/backgrounds/Wallet Lines.svg"
								className="absolute w-full h-full object-cover"
								alt="Wallet background lines"
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
									<p className="font-semibold text-sm">02/30</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="text-xs leading-[18px]">Branch</p>
									<p className="font-semibold text-sm">HQ</p>
								</div>
							</div>
						</div>
					</section>
					<p
						id="Amount-Choosed"
						className="font-bold text-4xl leading-[54px] text-center mt-[30px]">
						{amount === 0 ? "______" : handleFormatCurrency(amount)}
					</p>

					<form action="/midtrans" className="relative px-5 mt-[30px]">
						<div
							id="Theaters"
							className="tab-content flex flex-col gap-4">
							<h2 className="font-semibold">Choose Amount</h2>
							<div className="grid grid-cols-3 gap-4">
								{topupAmounts.map((amount, i) => (
									<label
										className="group relative theather-card flex flex-col rounded-3xl p-4 gap-[2px] bg-white/10 backdrop-blur-md hover:bg-premiere-purple has-[:checked]:bg-premiere-purple transition-all duration-300"
										key={i}>
										<input
											type="radio"
											name="amount"
											className="absolute top-1/2 left-1/2 opacity-0"
											value={amount.value}
											onChange={(e) =>
												setAmount(
													parseInt(e.target.value)
												)
											}
											required
										/>
										<span className="font-semibold text-xs leading-[18px]">
											Rp
										</span>
										<p className="font-semibold">{amount.display}</p>
									</label>
								))}
							</div>
						</div>
						<div className="relative h-[98px] w-full max-w-[640px]">
							<button
								type="button"
                                onClick={handleTopup}
                                disabled={isPending}    
								className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black">
								Proceed to Top Up
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	)
}