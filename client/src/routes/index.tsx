import { createBrowserRouter } from "react-router-dom";
import { router as AdminRouter } from "./admin";

export const router = createBrowserRouter([...AdminRouter]);