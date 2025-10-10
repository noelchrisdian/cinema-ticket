import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BottombarProps {
    activeLink?: 'discover' | 'tickets' | 'wallets' | 'settings'
}

export const Bottombar = ({ activeLink }: BottombarProps) => {
	return (
		<div id="Bottom-Nav" className="relative w-full h-[123px] flex shrink-0">
			<nav className="fixed bottom-5 left-5 right-5 mx-auto flex items-center w-fit rounded-full p-[10px_14px] gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
				<Link
					to={"/"}
					className={cn(
						"flex items-center shrink-0 rounded-3xl p-3 gap-3 w-12 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 hover:invert hover:bg-black",
						activeLink === "discover"
							? "!w-fit pr-4 bg-black invert"
							: "w-12"
					)}>
					<img
						src="/assets/images/icons/Video Play.svg"
						className="w-6 h-6 flex shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-sm text-white">Discover</p>
				</Link>
				<Link
					to={"/tickets"}
					className={cn(
						"flex items-center shrink-0 rounded-3xl p-3 gap-3 w-12 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 hover:invert hover:bg-black",
						activeLink === "tickets"
							? "!w-fit pr-4 bg-black invert"
							: "w-12"
					)}>
					<img
						src="/assets/images/icons/Ticket Star.svg"
						className="w-6 h-6 flex shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-sm text-white">Tickets</p>
				</Link>
				<Link
					to={"/wallets"}
					className={cn(
						"flex items-center shrink-0 rounded-3xl p-3 gap-3 w-12 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 hover:invert hover:bg-black",
						activeLink === "wallets"
							? "!w-fit pr-4 bg-black invert"
							: "w-12"
					)}>
					<img
						src="/assets/images/icons/Cards.svg"
						className="w-6 h-6 flex shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-sm text-white">Wallet</p>
				</Link>
				<Link
					to={"/settings"}
					className={cn(
						"flex items-center shrink-0 rounded-3xl p-3 gap-3 w-12 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 hover:invert hover:bg-black",
						activeLink === "settings"
							? "!w-fit pr-4 bg-black invert"
							: "w-12"
					)}>
					<img
						src="/assets/images/icons/Setting 2.svg"
						className="w-6 h-6 flex shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-sm text-white">Settings</p>
				</Link>
			</nav>
		</div>
	);
}