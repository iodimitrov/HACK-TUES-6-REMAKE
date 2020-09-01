export const generateSearchQueries = (str) => {
    let i,
        j,
        temp,
        result = [];

    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            temp = str.slice(i, j);
            if (temp !== ' ') {
                result.push(temp.toLowerCase());
            }
        }
    }
    return result;
};
