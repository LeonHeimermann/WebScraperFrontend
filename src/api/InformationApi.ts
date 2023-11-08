import {baseUrl} from "../base-data";

const GET_DATA_URL = `${baseUrl}/data`

export const getData = async (baseUrl: string, urlPath: string, maxDepth: number, maxSearchedPages: number) => {
    const response = await fetch(
        GET_DATA_URL + `?base_url=${baseUrl}&url_path=${urlPath}&max_depth=${maxDepth}&max_searched_pages=${maxSearchedPages}`
    );
    if (response.status !== 200) {
        console.error("An error occurred while starting process")
    } else {
        return response;
    }
}