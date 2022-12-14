import React from 'react';
import styled from 'styled-components'

import { sets, slots } from './constants'
import { Stats } from './types'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

type ToolbarProps = {
    set: number,
    handleSelectSet: (event: any) => void,
    slot: number,
    handleSelectSlot: (event: any) => void,
    json: object,
    handleUploadJson: (event: any) => void,
    stat: Stats | null,
    setStat: (event: any) => void,
    showEquippedOnly: boolean,
    setShowEquipped: (event: any, checked: boolean) => void,
    useLegend: boolean,
    setUseLegend: (event: any, checked: boolean) => void
}

const Wrapper = styled.div`
    display: flex;
    > * {
        margin-right: 15px;
    }
`

function Toolbar({
    set,
    handleSelectSet,
    slot,
    handleSelectSlot,
    json,
    handleUploadJson,
    stat,
    setStat,
    showEquippedOnly,
    setShowEquipped,
    useLegend,
    setUseLegend,
}: ToolbarProps) {
  return (
    <Wrapper>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="set-label">Set</InputLabel>
          <Select
            labelId="set-label"
            id="set-select"
            value={set}
            label="Set"
            onChange={handleSelectSet}
          >
            {Object.entries(sets).map(([key, value]) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="slot-label">Slot</InputLabel>
          <Select
            labelId="slot-label"
            id="slot-select"
            value={slot}
            label="Slot"
            onChange={handleSelectSlot}
          >
            {Object.entries(slots).map(([key, value]) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Grind Type</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            value={stat || ''}
            label="Grind Type"
            onChange={setStat}
          >
            {Object.entries(Stats).filter(([key, value]) => isNaN(Number(key))).slice(0,7).map(([key, value]) => (
              <MenuItem value={value}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControlLabel control={<Checkbox checked={useLegend} onChange={setUseLegend} />} label="Use Legend?" />
      <FormControlLabel control={<Checkbox checked={showEquippedOnly} onChange={setShowEquipped} />} label="Equipped Runes Only?" />
      <Box sx={{ minWidth: 150 }}>
        <input type="file" accept=".json" onChange={handleUploadJson}/>
      </Box>
    </Wrapper>
  );
}

export default Toolbar;
