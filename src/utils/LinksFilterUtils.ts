export const filterValidLinks = (linkDataDict: { [url: string]: string[][][] }) => {
    let foundLinks = new Set<string>();
    let output: { [url: string]: string[][][] } = {};
    for (const [url, linkDataFull] of Object.entries(linkDataDict)) {
        let linkDataTmp: string[][][] = []
        for (const linkDataOuter of linkDataFull) {
            let notFoundLinks: string[][] = [];
            for (const linkData of linkDataOuter) {
                const currentUrl = linkData[1];
                if (!foundLinks.has(currentUrl)) {
                    foundLinks.add(currentUrl)
                    if (isValidUrl(currentUrl) || isRelativeValidUrl(currentUrl)) {
                        notFoundLinks.push(linkData)
                    }
                }
            }
            linkDataTmp.push(notFoundLinks);
        }
        if (linkDataTmp.length > 0) {
            output[url] = linkDataTmp;
        }
    }
    return output;
}

export function isValidUrl(url: string) {
    const urlPattern = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/i;

    return urlPattern.test(url);
}

export function isRelativeValidUrl(url: string) {
    const relativePathPattern = /^\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/i;
    return relativePathPattern.test(url);
}