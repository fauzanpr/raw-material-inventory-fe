"use client";

import TableCustomized from "@/components/TableCustomized";
import { Divider } from "@mui/material";
import AddEditDialog from "./components/AddEditDialog";
import { useState } from "react";
import { useRawMaterialsMutation, useRawMaterialsQuery } from "./hooks/raw-material";
import { useDebounce } from "@/hooks/debounce";
import { columns } from "./columns";
import { RawMaterialMapper } from "./mapper";
import { GridPaginationModel } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { TRawMaterials } from "./types/raw-material";
import { TbEdit } from "react-icons/tb";

function RawMaterial() {
    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const [dialogState, setDialogState] = useState<{ cond: boolean; data: TRawMaterials | null }>({
        cond: false,
        data: null
    });

    const { data, isFetching, refetch } = useRawMaterialsQuery({
        search: searchDebounced,
        page: pagination.page
    });

    const { mutateAsync, isPending } = useRawMaterialsMutation({});

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
                dataInit={dialogState.data}
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
                            columns={columns}
                            rows={RawMaterialMapper(data?.content || [])}
                            rowsCount={data?.size || 0}
                            onSearch={(value) => setSearch(value)}
                            loading={isFetching}
                            pagination={{
                                paginationModel: pagination,
                                paginationControl: (newModel) => setPagination(newModel)
                            }}
                            addProps={{
                                onAdd: () => {
                                    setDialogState({
                                        cond: true,
                                        data: null
                                    });
                                }
                            }}
                            editProps={{
                                hide: true
                            }}
                            showProps={{
                                hide: true
                            }}
                            renderActionsTable={({ row }) => {
                                const rowData = row as ReturnType<typeof RawMaterialMapper>[number];

                                return (
                                    <div className="flex gap-2">
                                        <div onClick={() => setDialogState({
                                            cond: true,
                                            data: rowData
                                        })} className="bg-blue-600 h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                                            <TbEdit className="text-sm text-white" />
                                        </div>

                                        {/* <div onClick={() => setDialogState({
                                            cond: true,
                                            data: rowData
                                        })} className="bg-blue-600 h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                                            <TbEdit className="text-sm text-white" />
                                        </div>

                                        <div onClick={() => setDialogState({
                                            cond: true,
                                            data: rowData
                                        })} className="bg-blue-600 h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                                            <TbEdit className="text-sm text-white" />
                                        </div> */}
                                    </div>
                                )
                            }}
                            deleteProps={{
                                onDelete: async (id, onClose) => {
                                    try {
                                        await mutateAsync({
                                            method: "DELETE",
                                            id: id?.toString(),
                                        });

                                        toast.success("Data berhasil dihapus");
                                        refetch();

                                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                        !!onClose ? onClose() : undefined;
                                    } catch (err) {
                                        console.log(err);
                                        toast.error("Terjadi Kesalahan");
                                    };
                                },
                                isPending: isPending
                            }}
                        />
                    </div>
                </main>
            </div>
        </>
    )
}

export default RawMaterial;