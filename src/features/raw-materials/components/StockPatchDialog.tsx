"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { TRawMaterials } from "../types/raw-material";
import InputCustomized from "@/components/InputCustomized";
import { useForm } from "react-hook-form";
import { useRawMaterialStockMutation } from "../hooks/raw-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/data/query-key";

type TStockPatchDialog = {
    open: boolean;
    onClose: () => void;
    type: "in" | "out" | "opname";
    data: TRawMaterials | null;
}

type TRequest = {
    quantity?: string;
    actualStock?: string;
};

const defaultValue: TRequest = {
    actualStock: "",
    quantity: ""
};

function StockPatchDialog({ data: initialData, onClose, open, type }: TStockPatchDialog) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: defaultValue
    });

    const _onClose = () => {
        onClose();
        reset(defaultValue);
    }

    const { mutate, isPending } = useRawMaterialStockMutation({
        onSuccess: () => {
            toast.success("Stok berhasil disimpan");
            _onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.RAW_MATERIALS.INDEX]
            });
        },
        onError: () => {
            toast.error("Terjadi Kesalahan");
        }
    });

    const onSubmit = (data: TRequest) => {
        const payload = (type !== "opname") ? ({ quantity: Number(data.quantity) }) : ({ actualStock: Number(data.actualStock) });

        mutate({
            method: "PATCH",
            type: type,
            data: payload,
            id: initialData?.id?.toString()
        });
    }

    return (
        <Dialog fullWidth open={open} onClose={_onClose}>
            <DialogContent>
                <h2 className="font-poppins font-semibold text-primary">Stock {type}</h2>
                <Divider sx={{ my: 2 }} />
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <p>Stok Sekarang: {initialData?.stock}</p>
                    {type === "opname" ? (
                        <InputCustomized
                            control={control}
                            name="actualStock"
                            label="Stok Sebenarnya"
                        />
                    ) : (
                        <InputCustomized
                            control={control}
                            name="quantity"
                            label="Kuantitas"
                        />
                    )}

                    <div className="flex gap-2">
                        <Button variant="outlined" onClick={_onClose}>Batal</Button>
                        <Button type="submit" variant="contained" sx={{ flex: 1 }} disabled={isPending}>
                            {isPending ? <CircularProgress size={18} sx={{ color: "white" }} /> : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StockPatchDialog