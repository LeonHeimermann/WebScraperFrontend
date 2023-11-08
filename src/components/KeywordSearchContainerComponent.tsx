import {Checkbox, FormControlLabel, Grid, Link, Paper, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import Stack from "@mui/material/Stack";
import KeywordListComponent from "./KeywordListComponent";
import {filterValidData} from "../utils/InformationFilterUtils";
import {AppContext} from "../App";
import {getBackendNormalizedUrl} from "../utils/Utils";

function KeywordSearchContainerComponent(props: any) {
    const [filterLength, setFilterLength] = useState(true);
    const [filterPunctuation, setFilterPunctuation] = useState(true);
    const [filterWordCount, setFilterWordCount] = useState(true);

    const kwi = props.kwi;
    const handleKeywordSearchCallback = props.handleKeywordSearchCallback;
    const handleFilterLength = (event: any) => {
        setFilterLength(event.target.checked);
    }

    const handleFilterPunctuation = (event: any) => {
        setFilterPunctuation(event.target.checked);
    }

    const handleFilterWordCount = (event: any) => {
        setFilterWordCount(event.target.checked);
    }

    return (
        <>
            <Grid item xs={10}
                  sx={{height: "50vh", border: 1, borderRadius: 1, borderColor: 'grey.800'}}>
                <Stack direction="row" spacing={"3vh"} sx={{m: "4vh"}}>
                    <Stack spacing={"2vh"} sx={{maxWidth: "20%"}}>
                        <KeywordListComponent handleKeywordSearchCallback={handleKeywordSearchCallback}/>
                    </Stack>
                    <Stack sx={{maxWidth: "75%"}}>
                        <Stack direction="row" sx={{
                            border: 1,
                            borderRadius: 5,
                            borderColor: 'grey.400'
                        }}>
                            <Typography sx={{p: "1vh"}}>Filter:</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={filterLength} onChange={handleFilterLength} color="primary"/>
                                }
                                label="Length"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={filterPunctuation} onChange={handleFilterPunctuation}
                                              color="primary"/>
                                }
                                label="Punctuation"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={filterWordCount} onChange={handleFilterWordCount}
                                              color="primary"/>
                                }
                                label="Word count"
                            />
                        </Stack>
                        <Paper variant="outlined" sx={{
                            height: "33.5vh",
                            width: "100%",
                            overflow: 'auto',
                            mt: "2vh"
                        }}>
                            <KeywordSearchComponent
                                kwi={kwi}
                                filterLength={filterLength}
                                filterPunctuation={filterPunctuation}
                                filterWordCount={filterWordCount}/>
                        </Paper>
                    </Stack>
                </Stack>
            </Grid>
        </>
    )
        ;
}

function KeywordSearchComponent(props: any) {
    const kwi: { [keyword: string]: any[] } = props.kwi;

    const filterLength: boolean = props.filterLength;
    const filterPunctuation: boolean = props.filterPunctuation;
    const filterWordCount: boolean = props.filterWordCount;

    return (
        <>
            <Stack sx={{mx: "2vh"}}>
                {Object.entries(kwi).map(([keyword, information]) => {
                    return (
                        <>
                            <Paper variant="outlined" sx={{mt: "2vh"}}>
                                <Typography sx={{p: "1vh", ml: "2vh"}}>
                                    {keyword}
                                </Typography>
                                <KeywordUrlComponent
                                    data={information[0]}
                                    filterLength={filterLength}
                                    filterPunctuation={filterPunctuation}
                                    filterWordCount={filterWordCount}/>
                            </Paper>
                        </>
                    )
                })}
            </Stack>
        </>
    );
}

function KeywordUrlComponent(props: any) {
    const data: { [url: string]: string[][] } = props.data;

    const filterLength: boolean = props.filterLength;
    const filterPunctuation: boolean = props.filterPunctuation;
    const filterWordCount: boolean = props.filterWordCount;

    return (
        <>
            <Stack sx={{ml: "2vh"}}>
                {Object.entries(data).map(([url, information]) => {
                    return <KeywordComponent
                        url={url}
                        information={information}
                        filterLength={filterLength}
                        filterPunctuation={filterPunctuation}
                        filterWordCount={filterWordCount}/>
                })}
            </Stack>
        </>
    )
}

function KeywordComponent(props: any) {
    const [filterInfo, setFilterInfo] = useState(true);

    const url = props.url;

    const filterLength: boolean = props.filterLength;
    const filterPunctuation: boolean = props.filterPunctuation;
    const filterWordCount: boolean = props.filterWordCount;

    const { baseUrl, urlPath, maxDepth, maxSearchedPages } = useContext(AppContext);
    const normalizedUrl = getBackendNormalizedUrl(baseUrl, urlPath, maxDepth, maxSearchedPages, url);

    let information: string[][] = props.information;
    if (filterInfo) {
        information = filterValidData(information, filterLength, filterPunctuation, filterWordCount);
    }

    const handleFilterInfo = (event: any) => {
        setFilterInfo(event.target.checked);
    }

    return (
        <>
            <Paper elevation={2} sx={{mt: "2vh"}}>
                <Stack direction="row" spacing={2} justifyContent="space-between"
                       sx={{ml: "1vh", mr: "5vh", mt: "1vh"}}>
                    <Link href={url} sx={{p: "1vh", ml: "2vh"}}>{url}</Link>
                    <Stack direction="row" justifyContent="space-between" sx={{width: "45vh"}}>
                        <Link href={normalizedUrl} target="_blank" sx={{p: "1vh", ml: "2vh"}}>View normalized page</Link>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filterInfo}
                                    onChange={handleFilterInfo}
                                    color="primary"
                                />
                            }
                            label="Filter information"
                        />
                    </Stack>
                </Stack>
                {information.map((info) => {
                    return (
                        <>
                            <Paper elevation={2} sx={{m: "1vh", py: "1vh"}}>
                                {info.map((i) => {
                                    return (
                                        <>
                                            <Paper elevation={6} sx={{m: "1vh"}}>
                                                <Typography
                                                    sx={{
                                                        p: "1vh"
                                                    }}>{i}</Typography>
                                            </Paper>
                                        </>
                                    );
                                })}
                            </Paper>
                        </>
                    );
                })}
            </Paper>
        </>
    );
}

export default KeywordSearchContainerComponent;