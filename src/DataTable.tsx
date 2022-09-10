import * as React from 'react';
import Box from '@mui/material/Box';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTableData } from './utils'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 125 },
  { field: 'set', headerName: 'Set', width: 125 },
  { field: 'main', headerName: 'Main Stat', width: 125 },
  { field: 'slot', headerName: 'Slot', width: 80 },
  { field: 'innate', headerName: 'Innate', width: 125 },
  { field: 'sub1', headerName: 'Sub 1', width: 125 },
  { field: 'sub2', headerName: 'Sub 2', width: 125 },
  { field: 'sub3', headerName: 'Sub 3', width: 125 },
  { field: 'sub4', headerName: 'Sub 4', width: 125 },
  { field: 'currentEff', headerName: 'Current Efficiency', width: 80 },
  { field: 'maxEff', headerName: 'Max Efficiency', width: 80 },
];


export default function DataTable({ runes }: { runes: any }) {
    const tableData = createTableData(runes)
  return (
    <Box sx={{ height: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}
