export function createData(
        ingredient: string,
        supplier: string,
        unitSize: number,
        costPerUnit: number,
        costPerGram: number,
        index: number
    ) {
        return {
            ingredient,
            supplier,
            unitSize,
            costPerUnit,
            costPerGram,
            index,
        };
    }