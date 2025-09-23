import dayjs from 'dayjs';
import secureLocalStorage from "react-secure-storage";
import type { LoginResponse } from "@/services/auth/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
}

export const cities = ['Jakarta', 'Bandung', 'Semarang', 'Surakarta', 'Magelang', 'Yogyakarta']

export const getSession = () => {
	const session = secureLocalStorage.getItem("SESSION_KEY") as LoginResponse;

	if (!session) {
		return null;
	}

	return session;
}

export const handleFormatCurrency = (value: number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0, 
		maximumFractionDigits: 0
	}).format(value)
}

export const handlerFormatDate = (value: Date | string, format = 'DD-MM-YY HH:mm') => {
	return dayjs(value).format(format);
}