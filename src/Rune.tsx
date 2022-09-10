import React from 'react';
import styled from 'styled-components'

import { sets } from './constants'
import { Stats } from './types'

const Container = styled.div`
  border: 1px solid black;
  padding: 8px;
  width: 150px;
`

function Rune({ rune }: { rune: any }) {
  return (
    <Container>
        <h2>{sets[rune.rune.set_id]} slot {rune.rune.slot_no} {Stats[rune.rune.pri_eff[0]]}</h2>
        {rune.rune.prefix_eff[0] > 0 && (
            <div>INNATE: {rune.rune.prefix_eff[1]} {Stats[rune.rune.prefix_eff[0]]}</div>
        )}
        {rune.rune.sec_eff.map((stat: any) => (
            <div>{stat[1]} {stat[3] ? "+ " + stat[3] : ''} {Stats[stat[0]]}</div>
        ))}
        <p>
          <div>Current Eff: {rune.upgradeInfo.current}</div>
          <div>Max Hero Eff: {rune.upgradeInfo.maxHeroGrinded}</div>
        </p>
    </Container>
  );
}

export default Rune;
