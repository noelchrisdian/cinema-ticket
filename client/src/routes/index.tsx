import { createBrowserRouter } from "react-router-dom";
import { router as AdminRouter } from "@/routes/admin";
import { router as CustomerRouter } from "@/routes/customer";

export const router = createBrowserRouter([...AdminRouter, ...CustomerRouter]);