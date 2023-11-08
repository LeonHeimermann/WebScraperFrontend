import {Checkbox, FormControlLabel, Grid, Link, Paper, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import Stack from "@mui/material/Stack";
import {filterValidData} from "../utils/InformationFilterUtils";
import {AppContext} from "../App";
import {getBackendNormalizedUrl} from "../utils/Utils";

function RelevantInformationContainerComponent(props: any) {
    const [filterLength, setFilterLength] = useState(true);
    const [filterPunctuation, setFilterPunctuation] = useState(true);
    const [filterWordCount, setFilterWordCount] = useState(true);

    const ri = props.ri;

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
                  sx={{height: "50vh", border: 1, borderRadius: 1, borderColor: 'grey.500'}}>
                <Stack direction="row" spacing={5} sx={{
                    mx: "4vh",
                    mt: "1vh",
                    mb: "1vh"
                }}>
                    <Typography sx={{
                        p: "1vh",
                        border: 1,
                        borderRadius: 5,
                        borderColor: 'grey.400'
                    }}>Relevant information</Typography>
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
                </Stack>
                <Paper variant="outlined" sx={{
                    height: "40vh",
                    overflow: 'auto',
                    mx: "4vh",
                    mb: "4vh"
                }}>
                    <RelevantInformationListComponent
                        data={ri}
                        filterLength={filterLength}
                        filterPunctuation={filterPunctuation}
                        filterWordCount={filterWordCount}
                    />
                </Paper>
            </Grid>
        </>
    );
}

function RelevantInformationListComponent(props: any) {
    const data: { [url: string]: string[][] } = props.data;
    const filterLength: boolean = props.filterLength;
    const filterPunctuation: boolean = props.filterPunctuation;
    const filterWordCount: boolean = props.filterWordCount;
    return (
        <>
            <Stack sx={{ml: "2vh"}}>
                {Object.entries(data).map(([url, information]) => {
                    return <RelevantInformationComponent
                        url={url}
                        information={information}
                        filterLength={filterLength}
                        filterPunctuation={filterPunctuation}
                        filterWordCount={filterWordCount}
                    />
                })}
            </Stack>
        </>
    );
}

function RelevantInformationComponent(props: any) {
    const [filterInfo, setFilterInfo] = useState(true);

    const handleFilterInfo = (event: any) => {
        setFilterInfo(event.target.checked);
    }

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
                                            <Paper elevation={1} sx={{m: "0.5vh"}}>
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
                    )
                        ;
                })}
            </Paper>
        </>
    );
}

export default RelevantInformationContainerComponent;

//<Typography sx={{mx: "4vh", mt: "1vh", mb: "2vh"}}>Relevant information</Typography>
