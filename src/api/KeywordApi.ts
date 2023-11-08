import {baseUrl} from "../base-data";

const GET_DATA_BY_KEYWORDS_URL = `${baseUrl}/keywords`

export const getDataByKeywords = async (baseUrl: string, urlPath: string, maxDepth: number, maxSearchedPages: number, keywords: string[]) => {
    const keywordsStr = keywordsToString(keywords);
    const response = await fetch(
        GET_DATA_BY_KEYWORDS_URL + `?base_url=${baseUrl}&url_path=${urlPath}&max_depth=${maxDepth}&max_searched_pages=${maxSearchedPages}&keywords=${keywordsStr}`
    );
    if (response.status !== 200) {
        console.error("An error occurred while starting process")
    } else {
        return response;
    }
}

const keywordsToString = (keywords: string[]): string => {
    return keywords.join(',');
}