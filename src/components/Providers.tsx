"use client"

import { ReactNode } from "react"
import MuiThemeProvider from "./mui/ThemeProvider";

type TProviders = {
    children: ReactNode;
}

function Providers({ children }: TProviders) {
    return (
        <MuiThemeProvider>
            {children}
        </MuiThemeProvider>
    )
}

export default Providers