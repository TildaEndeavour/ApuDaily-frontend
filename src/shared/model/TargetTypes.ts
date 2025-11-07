export const TargetTypes = {
    POST: 1,
    COMMENTARY: 2
} as const;

export type TargetTypes = typeof TargetTypes[keyof typeof TargetTypes];