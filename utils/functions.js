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

export const getBeautifulColor = (value) => {
    if (value === 'black') {
        return { backgroundColor: '#404040', color: 'white' };
    } else if (value === 'blue') {
        return { backgroundColor: '#2196f3', color: 'white' };
    } else if (value === 'red') {
        return { backgroundColor: '#f50057', color: 'white' };
    } else if (value === 'green') {
        return { backgroundColor: '#00e676', color: 'black' };
    } else if (value === 'teal') {
        return { backgroundColor: '#33ab9f', color: 'white' };
    } else if (value === 'yellow') {
        return { backgroundColor: '#ffea00', color: 'black' };
    } else if (value === 'brown') {
        return { backgroundColor: '#d4751c', color: 'white' };
    } else if (value === 'orange') {
        return { backgroundColor: '#ff9100', color: 'black' };
    } else if (value === 'violet') {
        return { backgroundColor: '#673ab7', color: 'white' };
    } else if (value === 'olive') {
        return { backgroundColor: '#999900', color: 'black' };
    } else if (value === 'grey') {
        return { backgroundColor: '#dedede', color: 'black' };
    } else if (value === 'pruple') {
        return { backgroundColor: '#9c27b0', color: 'white' };
    }
};
