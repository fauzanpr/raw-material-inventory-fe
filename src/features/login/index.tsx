"use client";

import { Button, TextField } from "@mui/material";
import { CiLogin } from "react-icons/ci";

function LoginPage() {
    return (
        <div
            className="relative w-screen h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop")'
            }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 p-6 bg-white rounded-xl border border-gray-400 shadow-2xl flex flex-col gap-4 w-[450px]">
                <div className="w-8 h-8 shadow-sm border bg-white/45 rounded-md flex items-center justify-center mx-auto">
                    <CiLogin className="text-2xl" />
                </div>

                <header className="border-b pb-4">
                    <p className="text-center font-poppins font-medium text-sm">Raw Material</p>
                    <h1 className="font-semibold text-black text-xl font-poppins text-center">
                        Inventory Management
                    </h1>
                    <p className="text-gray-500 font-poppins font-light text-sm text-center mt-2">Masuk menggunakan email untuk melakukan management inventory raw material</p>
                </header>

                <TextField
                    size="small"
                    label="Email"
                />

                <TextField
                    size="small"
                    label="Password"
                    type="password"
                />
                <Button variant="contained">Login</Button>
            </div>
        </div>
    );
}

export default LoginPage;