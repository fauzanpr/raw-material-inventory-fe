"use client";

import { Button, CircularProgress, Dialog, DialogContent, Divider } from "@mui/material";
import { useCategoriesQuery } from "../hooks/categories";
import { useForm } from "react-hook-form";
import { TAutocomplete } from "@/types/form";
import InputCustomized from "@/components/InputCustomized";
import { useRawMaterialsMutation } from "../hooks/raw-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/data/query-key";
import { TRawMaterials } from "../types/raw-material";
import { useEffect } from "react";

type TAddEditDialog = {
    open: boolean;
    onClose: () => void;
    dataInit: TRawMaterials | null;
}

type TRequest = {
    code: string;
    name: string;
    stock: string;
    unit: string;
    description: string;
    categoryId: TAutocomplete | null;
}

const defaultValue: TRequest = {
    categoryId: null,
    code: "",
    description: "",
    name: "",
    stock: "",
    unit: ""
};

function AddEditDialog({ onClose, open, dataInit }: TAddEditDialog) {
    const queryClient = useQueryClient();

    const { data, isFetching } = useCategoriesQuery();

    const { mutate, isPending } = useRawMaterialsMutation({
        onSuccess: () => {
            toast.success("Data Berhasil Disimpan");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.RAW_MATERIALS.INDEX]
            });
            _onClose();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Terjadi kesalahan");
        }
    });

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: defaultValue
    });

    const _onClose = () => {
        reset(defaultValue);
        onClose();
    }

    const onSubmit = (data: TRequest) => {
        const payload = {
            ...data,
            categoryId: Number(data.categoryId?.value),
            stock: Number(data?.stock)
        }

        mutate({
            method: !!dataInit ? "PUT" : "POST",
            data: payload,
            ...(!!dataInit ? { id: dataInit?.id?.toString() } : {})
        });
    }

    const TITLE = !!dataInit ? "Edit Data Raw Material" : "Tambah Data Raw Material";

    useEffect(() => {
        if (!!data) {
            reset({
                categoryId: dataInit?.category ? ({
                    label: dataInit?.category?.name,
                    value: dataInit?.category?.id?.toString()
                }) : null,
                code: dataInit?.code,
                description: dataInit?.description,
                name: dataInit?.name,
                stock: dataInit?.stock?.toString(),
                unit: dataInit?.unit,
            });
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogContent>
                <h2 className="font-poppins font-semibold text-primary">{TITLE}</h2>
                <Divider sx={{ my: 2 }} />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <InputCustomized
                        control={control}
                        name="code"
                        label="Kode"
                    />

                    <InputCustomized
                        control={control}
                        name="name"
                        label="Nama"
                    />

                    <InputCustomized
                        control={control}
                        label="Kategori"
                        name="categoryId"
                        isSelectInput
                        selectOption={data?.map(_data => ({
                            label: _data?.name,
                            value: _data?.id?.toString()
                        })) || []}
                        isOptionLoading={isFetching}
                    />

                    {!dataInit ? (
                        <InputCustomized
                            control={control}
                            name="stock"
                            label="Stok"
                        />
                    ) : null}

                    <InputCustomized
                        control={control}
                        name="unit"
                        label="Unit"
                    />

                    <InputCustomized
                        control={control}
                        name="description"
                        label="Deksripsi"
                    />

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

export default AddEditDialog