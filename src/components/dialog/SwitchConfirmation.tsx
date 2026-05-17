"use client";

import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

type TSwicthConfirmation = {
    open: boolean;
    onClose: () => void;
    onProcced: () => void;
};

function SwitchConfirmation({ onClose, open, onProcced }: TSwicthConfirmation) {
    const _onClose = () => {
        onClose();
    }

    return (
        <Dialog open={open} onClose={_onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure to proceed? This action can not be undone</Typography>

                <div className="flex items-center gap-2">
                    <Button variant="outlined" color="secondary" onClick={_onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onProcced}>Proceed</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SwitchConfirmation;
