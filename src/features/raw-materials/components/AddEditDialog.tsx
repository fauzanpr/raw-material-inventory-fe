"use client";

import CustomAutocomplete from "@/components/mui/Autocomplete";
import { Button, Dialog, DialogContent, Divider, TextField } from "@mui/material";

type TAddEditDialog = {
    open: boolean;
    onClose: () => void;
}

function AddEditDialog({ onClose, open }: TAddEditDialog) {
    const _onClose = () => {
        onClose();
    }

    const TITLE = "Tambah Data Raw Material";

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogContent>
                <h2 className="font-poppins font-semibold text-primary">{TITLE}</h2>
                <Divider sx={{ my: 2 }} />

                <div className="flex flex-col gap-4">
                    <TextField
                        size="small"
                        label="Kode"
                    />

                    <TextField
                        size="small"
                        label="Nama"
                    />

                    <CustomAutocomplete
                        options={[]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                label="Kategori"
                            />
                        )}
                    />

                    <TextField
                        size="small"
                        label="Stok"
                    />

                    <TextField
                        size="small"
                        label="Unit"
                    />

                    <div className="flex gap-2">
                        <Button variant="outlined" onClick={_onClose}>Batal</Button>
                        <Button variant="contained" sx={{ flex: 1 }}>Simpan</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddEditDialog