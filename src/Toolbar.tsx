import React from 'react';
import styled from 'styled-components'

import { sets, slots } from './constants'
import { Stats } from './types'

type ToolbarProps = {
    set: number,
    handleSelectSet: (event: any) => void,
    slot: number,
    handleSelectSlot: (event: any) => void,
    json: object,
    handleUploadJson: (event: any) => void,
    stat: Stats | null,
    setStat: (event: any) => void
}

const Wrapper = styled.div`
    display: flex;
    * {
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
}: ToolbarProps) {
  return (
    <Wrapper>
      <select value={set} onChange={handleSelectSet}>
        {Object.entries(sets).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
      <select value={slot} onChange={handleSelectSlot}>
        {Object.entries(slots).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
      <select value={stat || ''} onChange={setStat}>
        {Object.entries(Stats).filter(([key, value]) => isNaN(Number(key))).slice(0,7).map(([key, value]) => (
          <option value={value}>{key}</option>
        ))}
      </select>
      <input type="file" accept=".json" onChange={handleUploadJson}/>
    </Wrapper>
  );
}

export default Toolbar;
