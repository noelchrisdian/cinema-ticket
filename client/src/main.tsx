import "./index.css";
import { createRoot } from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
)