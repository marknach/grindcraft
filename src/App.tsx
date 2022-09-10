import React, { useState } from 'react';
import DataTable from './DataTable'
import { getRunes, getAnalyticsForRunes } from './utils'
import initJson from './furyn.json'
import Toolbar from './Toolbar'
import { Stats } from './types'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';

function App() {
  const [set, setSet] = useState(0)
  const [slot, setSlot] = useState(0)
  const [stat, setStat] = useState<Stats | null>(null)
  const [json, setJson] = useState(initJson)
  const [runes, setRunes] = useState(getRunes(json))
  const limit = 250

  const handleSelect = (event: any) => {
    const newSet = parseInt(event.target.value, 10)
    setSet(newSet)
    setRunes(getRunes(json, { set_id: newSet, slot_id: slot, stat, limit }))
  }

  const handleSelectSlot = (event: any) => {
    const newSlot = parseInt(event.target.value, 10)
    setSlot(newSlot)
    setRunes(getRunes(json, { set_id: set, slot_id: newSlot, stat, limit }))
  }

  const handleSelectStat = (event: any) => {
    const newStat = parseInt(event.target.value, 10) as Stats
    setStat(newStat)
    setRunes(getRunes(json, { set_id: set, slot_id: slot, stat: newStat, limit }))
  }

  const handleUpload = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const newJson = JSON.parse(event.target.result)
      setJson(newJson)
      setRunes(getRunes(newJson))
      setSet(0)
      setSlot(0)
      setStat(null)
    });
    reader.readAsText(file);
  }

  const stats = getAnalyticsForRunes(runes)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ height: '100vh', padding: 4 }}>
          <Toolbar
            set={set}
            handleSelectSet={handleSelect}
            slot={slot}
            handleSelectSlot={handleSelectSlot}
            json={json}
            handleUploadJson={handleUpload}
            stat={stat}
            setStat={handleSelectStat}
          />
          <p>Average Eff of selection: {stats.avg}</p>

          <DataTable runes={runes} />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default App;
