import secureLocalStorage from 'react-secure-storage';
import type { AxiosError } from 'axios';
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, loginSchema, type LoginValues } from "@/services/auth/service";
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";

export const AdminLogin = () => {
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			role: "admin",
		}
    })

    const navigate = useNavigate();
    
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: LoginValues) => login(data)
    })

	const handleSubmit = async (value: LoginValues) => {
		try {
            const response = await mutateAsync(value);
            secureLocalStorage.setItem('SESSION_KEY', response.data);
            navigate('/admin')
        } catch (e: unknown) {
			const error = e as AxiosError<{ message: string }>;
			toast.error(error?.response?.data?.message ?? 'Something went wrong');
        }
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="mx-auto max-w-sm w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your email"
													type="email"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your password"
													type="password"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button isLoading={isPending} type="submit" className="w-full">
									Login
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</form>
			<Toaster />
		</Form>
	)
}