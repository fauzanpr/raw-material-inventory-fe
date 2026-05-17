"use client";

import { Button, CircularProgress, TextField } from "@mui/material";
import { CiLogin } from "react-icons/ci";
import { useAuthMutation } from "./hooks/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { APP_URL } from "@/data/url";
import { useForm } from "react-hook-form";
import InputCustomized from "@/components/InputCustomized";

type TRequest = {
    email: string;
    password: string;
}

function LoginPage() {
    const router = useRouter();

    const { control, handleSubmit } = useForm<TRequest>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { mutate, isPending } = useAuthMutation({
        onSuccess: (res) => {
            toast.success("Login berhasil, kamu sedang dialihkan ke halaman utama");
            localStorage.setItem("access_token", res?.access_token);
            router.push(APP_URL.RAW_MATERIAL);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Terjadi Kesalahan");
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "POST",
            data: data,
        });
    }

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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 p-6 bg-white rounded-xl border border-gray-400 shadow-2xl flex flex-col gap-4 w-[450px]"
            >
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

                <InputCustomized
                    control={control}
                    name="email"
                    label="Email"
                    rules={{
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    }}
                />

                <InputCustomized
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    rules={{
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    }}
                />

                <Button type="submit" variant="contained" disabled={isPending}>
                    {isPending ? <CircularProgress size={18} sx={{ color: "white" }} /> : "Login"}
                </Button>
            </form>
        </div>
    );
}

export default LoginPage;