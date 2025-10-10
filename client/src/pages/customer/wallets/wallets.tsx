import type { LoginResponse } from "@/services/auth/type";
import { Bottombar } from "@/components/customer/bottombar";
import { cn, handleFormatCurrency } from "@/lib/utils";
import { getBalance, getBalanceHistory } from "@/services/wallets/service";
import { Link, useLoaderData } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const CustomerWallet = () => {
	const user = useLoaderData() as LoginResponse;

	const { data, isLoading } = useQuery({
		queryKey: ["get-balance"],
		queryFn: async () => getBalance(),
	})

	const topups = useQuery({
		queryKey: ["get-balance-history"],
		queryFn: async () => getBalanceHistory(),
	})

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
			<div className="flex items-center justify-between px-5 mt-[60px]">
				<h1 className="font-bold text-[26px] leading-[39px]">My Wallet</h1>
				<Link
					to={"/top-up"}
					className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black">
					Top Up
				</Link>
			</div>

			{isLoading ? (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Loader2Icon className="animate-spin w-20 h-20" />
				</div>
			) : (
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
							src="assets/images/logos/Wallet.svg"
							className=" relative flex shrink-0 w-[51px] mt-6 mx-6"
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
			)}

			<section className="flex flex-col gap-4 mt-5 px-5">
				<h2 className="font-semibold">Latest Transactions</h2>
				{topups.data?.data.map((topup) => (
					<div
						className="flex items-center justify-between gap-2"
						key={topup._id}>
						<div className="flex items-center gap-[14px]">
							<div className="w-[100px] h-20 flex shrink-0 rounded-2xl bg-white/10 overflow-hidden">
								<img
									src="/assets/images/icons/Cards.svg"
									className="w-8 h-8 m-auto"
									alt="Topup icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px]">
								<h3 className="font-semibold line-clamp-2">
									Topup Wallet
								</h3>
								<div className="flex items-center gap-2">
									<img
										src="assets/images/icons/Note Favorite.svg"
										className="w-[18px] h-[18px] flex shrink-0"
										alt="icon"
									/>
									<p className="text-sm text-premiere-green">
										+ {handleFormatCurrency(topup.price)}
									</p>
								</div>
							</div>
						</div>
						<p
							className={cn(
								"w-fit rounded-full p-[4px_6px] font-semibold text-[10px] leading-[15px]",
								topup.status === "failed"
									? "bg-premiere-light-red text-premiere-red"
									: topup.status === "success"
									? "bg-premiere-light-green text-premiere-green"
									: "bg-yellow-100 text-yellow-500"
							)}>
							{topup.status.toUpperCase()}
						</p>
					</div>
				))}
			</section>

			<Bottombar activeLink="wallets" />
		</div>
	)
}