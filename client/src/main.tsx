import "@/index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { router } from "@/routes/index";
import { RouterProvider } from "react-router-dom";
import { store } from "@/redux/store";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</Provider>
	</StrictMode>
)