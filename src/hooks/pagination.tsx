export const paginationHelpers = {
    getTotalPages (items: number, limit: number) {
        return Math.ceil(items/limit)
    },

    getPageNumbersArray (items: number, limit: number) {
        return [...Array(Math.ceil(items/limit)).keys()].map(x => ++x);
    }    
};