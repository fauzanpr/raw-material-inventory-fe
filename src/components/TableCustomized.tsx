/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ReactNode } from 'react';
import React, { useState } from 'react'

import Link from 'next/link';

import type { GridColDef, GridPaginationModel, GridRenderCellParams, GridRowId, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid'

import { Button, TextField as CustomTextField } from '@mui/material';

import ColumnAction from './columns-components/ColumnAction';
import DeleteDialog from './dialog/DeleteDialog';


type TTableCustomized = {
    columns: GridColDef[];
    rows: any[];
    rowsCount: number;
    hideAction?: boolean;
    loading?: boolean;
    pagination?: {
        paginationModel?: GridPaginationModel;
        paginationControl?: (model: GridPaginationModel) => void;
    }
    addProps?: {
        hide?: boolean;
        redirectUrl?: string;
        onAdd?: () => void;
        buttonLabel?: string;
    };
    renderAdditionalActions?: ReactNode;
    deleteProps?: {
        hide?: boolean;
        onDelete?: (id: GridRowId, onClose?: () => void) => void;
        isPending?: boolean;
    };
    editProps?: {
        hide?: boolean;
        redirectUrl?: (id: string) => string;
        onEdit?: () => void;
    };
    showProps?: {
        hide?: boolean;
        redirectUrl?: (id: string) => string;
        onShow?: () => void;
    }
    onSearch?: (value: string) => void;
    searchPlaceholder?: string;
    renderActionsTable?: (props: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => ReactNode;
};

function TableCustomized({ columns, rows, loading, hideAction, addProps, deleteProps, editProps, showProps, pagination, rowsCount, renderAdditionalActions, renderActionsTable, onSearch, searchPlaceholder }: TTableCustomized) {
    const [deleteState, setDeleteState] = useState<{
        cond: boolean;
        id: GridRowId
    }>({
        cond: false,
        id: ""
    });

    return (
        <>
            <DeleteDialog
                state={deleteState}
                onClose={() => {
                    setDeleteState({
                        cond: false,
                        id: ""
                    })
                }}
                onDelete={deleteProps?.onDelete || (() => {})}
                deletePending={deleteProps?.isPending || false}
            />
            <div className='w-full flex flex-col gap-2 items-end'>
                {renderAdditionalActions ?? renderAdditionalActions}

                <div className='flex gap-2'>
                    {!!onSearch ? (
                        <CustomTextField
                            placeholder={searchPlaceholder ?? "Search here"}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    ) : null}

                    {!addProps?.hide && (
                        addProps?.redirectUrl ? (
                            <Link href={addProps?.redirectUrl}>
                                <Button variant='contained' startIcon={<i className='tabler-plus'></i>} size='medium'>{addProps?.buttonLabel ? addProps?.buttonLabel : "Tambahkan Data"}</Button>
                            </Link>
                        ) : (
                            <Button onClick={addProps?.onAdd} variant='contained' startIcon={<i className='tabler-plus'></i>} size='medium'>{addProps?.buttonLabel ? addProps?.buttonLabel : "Tambahkan Data"}</Button>
                        ))
                    }
                </div>
                <DataGrid
                    rows={rows}
                    columns={!hideAction ? [
                        ...columns,
                        {
                            field: "actions",
                            headerName: "",
                            minWidth: 120,
                            renderCell: (props) => {
                                const { id } = props;

                                return (
                                    <>
                                        {renderActionsTable ? renderActionsTable(props) : null}
                                        <ColumnAction
                                            editProps={{
                                                url: editProps?.redirectUrl && editProps?.redirectUrl(String(id)),
                                                onEdit: editProps?.onEdit,
                                                hide: editProps?.hide
                                            }}
                                            deleteProps={{
                                                onDelete: () => {
                                                    setDeleteState({
                                                        cond: true,
                                                        id: id
                                                    });
                                                },
                                                hide: deleteProps?.hide
                                            }}
                                            showProps={{
                                                hide: showProps?.hide,
                                                onShow: showProps?.onShow,
                                                url: showProps?.redirectUrl && showProps?.redirectUrl(String(id))
                                            }}
                                        />
                                    </>
                                )
                            }
                        }
                    ] : [...columns]}
                    className="bg-white text-sm font-medium w-full"
                    disableColumnMenu
                    loading={loading}
                    disableColumnFilter
                    disableColumnSorting
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton"
                        }
                    }}
                    isRowSelectable={() => false}
                    pagination
                    paginationMode='server'
                    rowCount={rowsCount}
                    paginationModel={pagination?.paginationModel}
                    onPaginationModelChange={(model) => !!pagination?.paginationControl ? pagination?.paginationControl(model) : null}
                />
            </div>
        </>
    )
}

export default TableCustomized
