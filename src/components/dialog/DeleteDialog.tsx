"use client";

import { Button, CircularProgress, Dialog, DialogContent, Typography } from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import { LuTrash2 } from "react-icons/lu";

type TDeleteDialog = {
    state: {
        cond: boolean;
        id: GridRowId
    };
    onClose: () => void;
    onDelete: (id: GridRowId, onClose?: () => void) => void;
    deletePending: boolean;
};

function DeleteDialog({ state, onClose, onDelete, deletePending }: TDeleteDialog) {
    return (
        <Dialog open={state.cond} onClose={onClose}>
            <DialogContent className="flex flex-col gap-2 justify-center items-center">
                <div className="bg-red-50 w-16 h-16 rounded-3xl flex items-center justify-center mb-4">
                    <LuTrash2 className="text-3xl text-red-500" />
                </div>
                <p className="text-black font-medium text-xl">Delete</p>
                <Typography className="text-center">This item will be removed from the database permanently</Typography>
                <Typography className="text-center">Are you sure to proceed?</Typography>

                <div className="mt-4 flex gap-2">
                    <Button variant="outlined" color="inherit" startIcon={<i className="tabler-x"></i>} onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="error" startIcon={<i className="tabler-trash"></i>} onClick={() => onDelete(state.id, onClose)}>{
                        deletePending ? (<CircularProgress size={20} className="text-white" />) : "Delete"
                    }</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog
