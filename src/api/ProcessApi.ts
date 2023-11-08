import {baseUrl} from "../base-data";

const POST_CREATE_GRAPH_URL = `${baseUrl}/create-graph`
const GET_PROGRESS_URL = `${baseUrl}/progress`

export const startSearch = async (baseUrl: string, urlPath: string, maxDepth: number, maxSearchedPages: number) => {
    const body = {
        base_url: baseUrl,
        url_path: urlPath,
        max_depth: maxDepth,
        max_searched_pages: maxSearchedPages,
    };
    const response = await fetch(POST_CREATE_GRAPH_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (response.status !== 200) {
        console.error("An error occurred while starting process")
    }
}

export const getProgress = async (baseUrl: string, urlPath: string, maxDepth: number, maxSearchedPages: number) => {
    const response = await fetch(
        GET_PROGRESS_URL + `?base_url=${baseUrl}&url_path=${urlPath}&max_depth=${maxDepth}&max_searched_pages=${maxSearchedPages}`
    );
    if (response.status !== 200) {
        console.error("An error occurred while starting process")
    } else {
        return response;
    }
}