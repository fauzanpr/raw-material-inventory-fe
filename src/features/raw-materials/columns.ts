import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    {
        field: "code",
        headerName: "Kode",
        flex: 1,
        minWidth: 150,
    },
    {
        field: "name",
        headerName: "Nama",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "stock",
        headerName: "Stok",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "unit",
        headerName: "Unit",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "description",
        headerName: "Deskripsi",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "categoryName",
        headerName: "Kategori",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "created_by",
        headerName: "Dibuat Oleh",
        flex: 1,
        minWidth: 250,
    }
]