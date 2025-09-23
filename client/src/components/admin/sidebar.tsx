import {
	Bell,
	Clapperboard,
	Home,
	Package,
	Theater,
	UserStar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Sidebar = () => {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link to="/admin" className="flex items-center gap-2 font-semibold">
						<UserStar className="h-6 w-6" />
						<span className="">CMS Cinema</span>
					</Link>
					<Button
						variant="outline"
						size="icon"
						className="ml-auto h-8 w-8">
						<Bell className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<Link
							to="/admin"
							className="flex items-center mb-1 gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
							<Home className="h-4 w-4" />
							Dashboard
						</Link>
						<Link
							to="/admin/genres"
							className="flex items-center mb-1 gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
							<Package className="h-4 w-4" />
							Genres
						</Link>
						<Link
							to="/admin/theaters"
							className="flex items-center mb-1 gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
							<Theater className="h-4 w-4" />
							Theaters
						</Link>
						<Link
							to="/admin/movies"
							className="flex items-center mb-1 gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
							<Clapperboard className="h-4 w-4" />
							Movies
						</Link>
					</nav>
				</div>
			</div>
		</div>
	)
}