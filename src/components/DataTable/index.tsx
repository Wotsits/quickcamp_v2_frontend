import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { TableContainer } from "@mui/material";

type DataTableComponentProps = {
  /** Mandatory, the data to be displayed */
  rows: any[];
  /** Mandatory, the column spec */
  columns: GridColDef[];
};

export default function DataTable({ rows, columns }: DataTableComponentProps) {
  return (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          checkboxSelection
        />
  );
}
