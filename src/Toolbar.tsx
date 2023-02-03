import React from 'react';
import styled from 'styled-components'

import { sets } from './constants'
import { Stats } from './types'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from './context'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

type ToolbarProps = {
    set: number,
    handleSelectSet: (event: any) => void,
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
    json,
    handleUploadJson,
    stat,
    setStat,
    showEquippedOnly,
    setShowEquipped,
    useLegend,
    setUseLegend,
}: ToolbarProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

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

    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minWidth: 150
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
    </Wrapper>
  );
}

export default Toolbar;
