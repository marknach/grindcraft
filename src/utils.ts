import { Rune, Json, Stats } from './types'
import { GRIND_VALUES } from './constants'
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
