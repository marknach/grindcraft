export type Rune = {
    rune_id: number
    slot_no: number
    set_id: number
    pri_eff: Array<Number>
    sec_eff: Array<Array<any>>
    prefix_eff: Array<any>
    occupied_type?: number
    class: number
}

export type Unit = {
    runes: Rune[]
}

export type Json = {
    unit_list: Unit[]
    runes: Rune[]
}

export enum Stats {
    'HP+' = 1,
    'HP%' = 2,
    'ATK+' = 3,
    'ATK%' = 4,
    'DEF+' = 5,
    'DEF%' = 6,
    'SPD+' = 8,
    'CR%' = 9,
    'CDmg%' = 10,
    'RES%' = 11,
    'ACC%' = 12
}
