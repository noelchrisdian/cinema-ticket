import * as React from "react";
import { buttonVariants } from "./button-variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";

		return isLoading ? (
			<Comp
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				disabled>
				<Loader2Icon className="animate-spin" />
				Please wait
			</Comp>
		) : (
			<Comp
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		)
	}
)

export {
  Button
}