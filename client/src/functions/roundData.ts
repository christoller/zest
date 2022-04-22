export function roundData(data: number, decimal: number) {
        return Math.round(data * Math.pow(10, decimal)) / Math.pow(10, decimal);
    }