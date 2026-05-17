"use client";

import Link from "next/link";

type TColumnAction = {
    deleteProps?: {
        hide?: boolean;
        onDelete?: () => void;
    };
    editProps?: {
        hide?: boolean;
        url?: string;
        onEdit?: (id: string) => void;
    };
    showProps?: {
        hide?: boolean;
        url?: string;
        onShow?: () => void;
    }
};

function ColumnAction({ deleteProps, editProps, showProps }: TColumnAction) {
    return (
        <div className="flex items-center h-full gap-2">
            {!showProps?.hide && (
                showProps?.url ? (
                    <Link href={showProps?.url} className="bg-warning h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-eye text-sm text-white"></i>
                    </Link>
                ) : (
                    <div onClick={showProps?.onShow} className="bg-warning h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-eye text-sm text-white"></i>
                    </div>
                )
            )}

            {!editProps?.hide && (
                editProps?.url ? (
                    <Link href={editProps?.url} className="bg-info h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-edit text-sm text-white"></i>
                    </Link>
                ) : (
                    <div className="bg-info h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-edit text-sm text-white"></i>
                    </div>
                )
            )}

            {!deleteProps?.hide && (
                <div onClick={deleteProps?.onDelete} className="bg-error h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                    <i className="tabler-trash text-sm text-white"></i>
                </div>
            )}

        </div>
    )
}

export default ColumnAction;
