import { Rune, Json, Stats } from './types'
import { GRIND_VALUES, sets } from './constants'
const eff = require('./rune_eff_plugin.js')


function processRune(rune: Rune) {
    const calculatedEff = eff.getRuneEfficiency(rune, { flatStatsHalf: true })
    return {
        current: calculatedEff.current,
        maxHeroGrinded: calculatedEff.maxHeroGrinded,
        maxLegendGrinded: calculatedEff.maxLegendGrinded,
        potentialUpgrade: (calculatedEff.maxLegendGrinded - calculatedEff.current).toFixed(2)
    }
}

type OptionsType = {
    set_id: number,
    slot_id: number,
    stat: Stats | null,
    limit: number
}

export function getRunes(
    json: Json,
    options: OptionsType = {
        set_id: 0,
        slot_id: 0,
        stat: null,
        limit: 250
    }
) {
    let runes = json.runes
        .map(runeJson => ({ rune: runeJson, upgradeInfo: processRune(runeJson) }))
        // .filter(rune => rune.upgradeInfo.maxHeroGrinded >  100 && (rune.upgradeInfo.maxHeroGrinded - rune.upgradeInfo.current) > 3) // top 100 is 111

    if (options.set_id) {
        runes = runes.filter(rune => rune.rune.set_id === options.set_id)
    }

    if (options.slot_id) {
        runes = runes.filter(rune => rune.rune.slot_no === options.slot_id)
    }

    if (options.stat) {
        runes = runes.filter(rune => doesRuneHaveSubstat(rune.rune, options.stat as Stats) && couldUseGrind(rune.rune, options.stat as Stats))
    }

    runes.sort((a, b) => b.upgradeInfo.maxHeroGrinded - a.upgradeInfo.maxHeroGrinded)
        .slice(0, options.limit)

    return runes
}


export function getAverageEfficiency(runes: any[]) {
    return runes.reduce((acc: number, curr: any) => {
       return acc + parseInt(curr.upgradeInfo.current, 10)
    }, 0) / runes.length
}

export function getAnalyticsForRunes(runes: any[]) {
  return {
      avg: getAverageEfficiency(runes).toFixed(2),
  }
}
/*
    sec_eff": [
            [
              2,
              13,
              0,
              6
            ],
*/
export function getImprovementForGrind(rune: Rune, grindType: string, useLegend?: boolean)  {
    return 1;
}

export function couldUseGrind(rune: Rune, grindType: Stats, useLegend?: boolean) {
    const grindQuality = useLegend ? 5 : 4
    const maxGrindValue = GRIND_VALUES[grindType][grindQuality].max
    const currValue = getGrindValueForSub(rune, grindType)
    return maxGrindValue > currValue
}

export function getGrindValueForSub(rune: Rune, property: Stats) {
    const sub = rune.sec_eff.find(sub => sub[0] === property)
    if (!sub) {
        return 0
    }
    return sub[3]
}

export function doesRuneHaveSubstat(rune: Rune, stat: Stats) {
    return rune.sec_eff.some(sub => sub[0] === stat)
}

type RuneRowData = {
    id: number,
    set: string,
    main: string,
    slot: number,
    innate: String,
    sub1: String,
    sub2: String,
    sub3: String,
    sub4: String,
    currentEff: String,
    maxEff: String,
    // effWithGrind: String,
}


export function createTableData(runes: any[]): RuneRowData[] {
    return runes.map(({ rune, upgradeInfo }) => ({
        id: rune.rune_id,
        set: sets[rune.set_id],
        main: Stats[rune.pri_eff[0]],
        slot: rune.slot_no,
        innate: rune.prefix_eff[1] ? `${rune.prefix_eff[1]} ${Stats[rune.prefix_eff[0]]}` : '',
        sub1: rune.sec_eff.length > 0 ? `${rune.sec_eff[0][1]} ${rune.sec_eff[0][3] ? "+ " + rune.sec_eff[0][3] : ''} ${Stats[rune.sec_eff[0][0]]}` : '',
        sub2: rune.sec_eff.length > 1 ? `${rune.sec_eff[1][1]} ${rune.sec_eff[1][3] ? "+ " + rune.sec_eff[1][3] : ''} ${Stats[rune.sec_eff[1][0]]}` : '',
        sub3: rune.sec_eff.length > 2 ? `${rune.sec_eff[2][1]} ${rune.sec_eff[2][3] ? "+ " + rune.sec_eff[2][3] : ''} ${Stats[rune.sec_eff[2][0]]}` : '',
        sub4: rune.sec_eff.length > 3 ? `${rune.sec_eff[3][1]} ${rune.sec_eff[3][3] ? "+ " + rune.sec_eff[3][3] : ''} ${Stats[rune.sec_eff[3][0]]}` : '',
        currentEff: upgradeInfo.current,
        maxEff: upgradeInfo.maxHeroGrinded,
    }))
}