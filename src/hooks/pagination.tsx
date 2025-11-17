export const paginationHelpers = {
    getTotalPages (items: number, limit: number) {
        return Math.round(items/limit)
    },

    getPageNumbersArray (items: number, limit: number) {
        return [...Array(Math.round(items/limit)).keys()].map(x => ++x);
    }    
};