/**
 * Model for coupling filters for Houses
 */

export interface HouseFilter {
    name?: string
    region?: string
    words?: string
    hasWords?: boolean
    hasTitles?: boolean
    hasSeats?: boolean
    hasDiedOut?: boolean
    hasAncestralWeapons?: boolean
}