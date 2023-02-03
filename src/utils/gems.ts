import { Rune, Json, Stats } from '../types'
import { GRIND_VALUES, sets } from '../constants'
import mapping from '../mapping'
const eff = require('../rune_eff_plugin.js')

type GemUpgradeInfo = {
    gemType: Stats,
    newEff: number
}

// function getAvailableGemsForRune(rune: Rune) : Stats[] {
//     const availGemsPerSlot = {
//         1: [Stats['ATK%'], Stats['HP%'], Stats['SPD+']],
//         2: [Stats['ATK%'], Stats['HP%'], Stats['SPD+'], Stats['DEF%']],
//         3: [Stats['HP%'], Stats['SPD+'], Stats['DEF%']],
//         4: [Stats['ATK%'], Stats['HP%'], Stats['SPD+'], Stats['DEF%']],
//         5: [Stats['ATK%'], Stats['HP%'], Stats['SPD+'], Stats['DEF%']],
//         6: [Stats['ATK%'], Stats['HP%'], Stats['SPD+'], Stats['DEF%']]
//     }[rune.slot_no]

//     const mainStatIndex = availGemsPerSlot.indexOf(rune.pri_eff[1] as Stats)
//     if (mainStatIndex) {
//         availGemsPerSlot.splice(mainStatIndex, 1)
//     }

//     return availGemsPerSlot
// }

// function getNewEffWithGem(rune: Rune, stat: Stats, useLegend: boolean = false): number {
//     const statIndex = rune.sec_eff.findIndex(el => el[0] === stat)
//     const newVal = mapping.enchanted_gem[stat].range[useLegend ? 5 : 4].max
//     // if rune already has stat, can only calc regem
//     if (statIndex) {
//         let newSubs = rune.sec_eff
//         newSubs[statIndex] = [stat, newVal]
//         const newRune = {
//             ...rune,
//             sec_eff: newSubs
//         }

//         const calculatedEff = eff.getRuneEfficiency(newRune, { flatStatsHalf: true })
//         return calculatedEff.maxHeroGrinded
//     }

//     const gemEffValues = [0,1,2,3].map(sub_slot => {
//         let newSubs = rune.sec_eff
//         newSubs[sub_slot] = [stat, newVal]
//         const newRune = {
//             ...rune,
//             sec_eff: newSubs
//         }
//         const calculatedEff = eff.getRuneEfficiency(newRune, { flatStatsHalf: true })
//         return calculatedEff.maxHeroGrinded
//     })


//     return Math.max(...gemEffValues)
// }


// export function getGemToUse(rune: Rune) : GemUpgradeInfo {
//     const gemTypes = getAvailableGemsForRune(rune)
//     const newEffs = gemTypes.map(gemType => {
//         const newEff = getNewEffWithGem(rune, gemType)
//         return [gemType, newEff]
//     })
//     newEffs.sort((a, b) => b[1] - a[1])


//     return {
//         gemType: newEffs[0][0],
//         newEff : newEffs[0][1]
//     }
// }

// export function createTableData(runes: any[], json: Json, useLegend: boolean): RuneRowData[] {
//     return runes.map(({ rune, upgradeInfo }) => ({
//         id: rune.rune_id,
//         set: sets[rune.set_id],
//         main: Stats[rune.pri_eff[0]],
//         slot: rune.slot_no,
//         innate: rune.prefix_eff[1] ? `${rune.prefix_eff[1]} ${Stats[rune.prefix_eff[0]]}` : '',
//         sub1: rune.sec_eff.length > 0 ? getSubString(rune.sec_eff[0]) : '',
//         sub2: rune.sec_eff.length > 1 ? getSubString(rune.sec_eff[1]) : '',
//         sub3: rune.sec_eff.length > 2 ? getSubString(rune.sec_eff[2]) : '',
//         sub4: rune.sec_eff.length > 3 ? getSubString(rune.sec_eff[3]) : '',
//         currentEff: upgradeInfo.current,
//         maxEff: useLegend ? upgradeInfo.maxLegendGrinded : upgradeInfo.maxHeroGrinded,
//         location: getLocationForRune(rune, json)
//     }))
// }