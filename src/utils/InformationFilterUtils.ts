export const filterValidData = (
    dataList: string[][],
    filterLength: boolean,
    filterPunctuation: boolean,
    filterWordCount: boolean,
    ) => {
    let dataOutput = dataList;
    if (filterLength) {
        dataOutput = dataOutput.map((data) => data.filter(isValidLength))
    }
    if (filterPunctuation) {
        dataOutput = dataOutput.map((data) => data.filter(isValidPunctuation))
    }
    if (filterWordCount) {
        dataOutput = dataOutput.map((data) => data.filter(isValidWordCount))
    }
    dataOutput = dataOutput.filter((data) => data.length > 0);
    return dataOutput;
}

const isValidLength = (data: string) => {
    return data.length > 30;
}

const isValidPunctuation = (data: string) => {
    const punctuationMatches = data.match(/[.!?]/g);
    if (!punctuationMatches) {
        return false;
    }
    return punctuationMatches.length >= 1;
}

const isValidWordCount = (data: string) => {
    const words = data.split(/\s+/);
    return words.length >= 4;
}