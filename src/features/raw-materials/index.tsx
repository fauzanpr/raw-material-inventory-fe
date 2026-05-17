"use client";

import TableCustomized from "@/components/TableCustomized";
import { Divider } from "@mui/material";
import AddEditDialog from "./components/AddEditDialog";
import { useState } from "react";

function RawMaterial() {
    const [dialogState, setDialogState] = useState<{ cond: boolean; data: unknown }>({
        cond: false,
        data: null
    });

    return (
        <>
            <AddEditDialog
                open={dialogState.cond}
                onClose={() => {
                    setDialogState({
                        cond: false,
                        data: null
                    });
                }}
            />

            <div className="bg-gray-100 min-h-screen">
                <aside className="w-64 bg-white fixed left-0 h-full py-8 px-4 flex flex-col justify-between border-r">
                    <header>
                        <div className="mb-4 pb-4 w-full">
                            <p className="font-poppins font-semibold text-lg">EZSportswear</p>
                            <p className="text-sm text-gray-400 font-poppins">Raw Material Inventory</p>
                        </div>

                        <div className="py-2 px-4 border-l-2 border-t border !border-l-primary rounded-r-md bg-gray-50 w-full">
                            <p className="text-primary text-sm font-medium font-poppins">Raw Material Inventory</p>
                        </div>
                    </header>

                    <div className="py-2 px-4 border-t border border-red-100 rounded-md bg-red-50 w-full cursor-pointer transition-all hover:bg-red-100">
                        <p className="text-red-600 text-sm font-medium font-poppins">Logout</p>
                    </div>
                </aside>

                <main className="bg-gray-100 p-8 ml-64">
                    <div className="bg-white p-6 border rounded-lg">
                        <p className="font-poppins text-lg font-semibold text-primary uppercase">Raw Material Inventory</p>
                        <Divider sx={{ my: 2 }} />
                        <TableCustomized
                            columns={[]}
                            rows={[]}
                            rowsCount={0}
                            addProps={{
                                onAdd: () => {
                                    setDialogState({
                                        cond: true,
                                        data: null
                                    });
                                }
                            }}
                        />
                    </div>
                </main>
            </div>
        </>
    )
}

export default RawMaterial;