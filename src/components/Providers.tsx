"use client"

import { ReactNode } from "react"
import MuiThemeProvider from "./mui/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

type TProviders = {
    children: ReactNode;
}

const queryClient = new QueryClient();

function Providers({ children }: TProviders) {
    return (
        <>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <MuiThemeProvider>
                    {children}
                </MuiThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default Providers