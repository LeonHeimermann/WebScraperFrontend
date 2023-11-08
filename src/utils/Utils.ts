import {baseUrl} from "../base-data";

const NORMALIZED_PAGE_URL = `${baseUrl}/normalized-page?base_url={base_url}&url_path={url_path}&max_depth={max_depth}&max_searched_pages={max_searched_pages}&normalized_page_url={normalized_page_url}`

export const getBackendNormalizedUrl = (baseUrl: string, urlPath: string, maxDepth: number, maxSearchedPages: number, normalizedPageUrl: string) => {
    return NORMALIZED_PAGE_URL
        .replace('{base_url}', baseUrl)
        .replace('{url_path}', urlPath)
        .replace('{max_depth}', maxDepth.toString())
        .replace('{max_searched_pages}', maxSearchedPages.toString())
        .replace('{normalized_page_url}', normalizedPageUrl);
}