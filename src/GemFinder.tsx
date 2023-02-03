import React from 'react';
import styled from 'styled-components'

import { Json } from './types'

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { createTableData } from './utils/gems'

const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 125 },
  { field: 'set', headerName: 'Set', width: 125 },
  { field: 'main', headerName: 'Main Stat', width: 85 },
  { field: 'slot', headerName: 'Slot', width: 50 },
  { field: 'innate', headerName: 'Innate', width: 100 },
  { field: 'sub1', headerName: 'Sub 1', width: 125 },
  { field: 'sub2', headerName: 'Sub 2', width: 125 },
  { field: 'sub3', headerName: 'Sub 3', width: 125 },
  { field: 'sub4', headerName: 'Sub 4', width: 125 },
  { field: 'currentEff', headerName: 'Current Efficiency', width: 80 },
  { field: 'maxEff', headerName: 'Max Efficiency', width: 80 },
  { field: 'location', headerName: 'Location', width: 80 },
];


// export default function GemFinder({ runes, json, useLegend }: { runes: any, json: Json, useLegend: boolean }) {
//   const tableData = createTableData(runes, json, useLegend)
//   return (
//     <Box sx={{ height: '100%' }}>
//       <DataGrid
//         rows={tableData}
//         columns={columns}
//         pageSize={25}
//         rowsPerPageOptions={[5]}
//       />
//     </Box>
//   );
// }
