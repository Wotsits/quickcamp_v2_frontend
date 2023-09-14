import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

type DataTableComponentProps = {
    /** Mandatory, the data to be displayed */
    rows: any[];
    /** Mandatory, the column spec */
    columns: GridColDef[];
}

export default function DataTable({rows, columns}: DataTableComponentProps) {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    );
  }