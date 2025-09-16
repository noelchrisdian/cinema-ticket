import secureLocalStorage from "react-secure-storage";
import type { LoginResponse } from "@/services/auth/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
}

export const getSession = () => {
	const session = secureLocalStorage.getItem("SESSION_KEY") as LoginResponse;

	if (!session) {
		return null;
	}

	return session;
}