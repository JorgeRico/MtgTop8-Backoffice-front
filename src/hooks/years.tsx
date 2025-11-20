export const getDropdownYears = () => {
    const tempYears: Array<{ key: string; value: number }> = [];
    const now                                              = new Date();

    for (let year = 2016; year <= now.getFullYear(); year++) {
        const item = {
            key   : String(year),
            value : year
        };
        tempYears.push(item);
    }

    return tempYears
}