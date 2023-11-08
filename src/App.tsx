import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    Button,
    ToggleButtonGroup,
    ToggleButton, Backdrop, LinearProgress
} from "@mui/material";
import RelevantInformationContainerComponent from "./components/RelevantInformationContainerComponent";
import KeywordSearchContainerComponent from "./components/KeywordSearchContainerComponent";
import {getProgress, startSearch} from "./api/ProcessApi";
import {getData} from "./api/InformationApi";
import RelevantLinksContainerComponent from "./components/RelevantLinksContainerComponent";
import {getDataByKeywords} from "./api/KeywordApi";
import Stack from "@mui/material/Stack";


export const AppContext = createContext(
    {
        baseUrl: "",
        urlPath: "",
        maxDepth: 0,
        maxSearchedPages: 0,
        isDataPresent: false
    }
);

function App() {
    const [currentTab, setCurrentTab] = useState('ri');
    const [loadingProgress, setLoadingProgress] = useState<number>(0.0);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [ri, setRi] = useState<{ url: string; information: string[][]; }[]>([]);
    const [links, setLinks] = useState<{ url: string; information: string[]; }[]>([]);
    const [kwi, setKwi] = useState<any>({});
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [urlPath, setUrlPath] = useState<string>("");
    const [maxDepth, setMaxDepth] = useState<number>(0);
    const [maxSearchedPages, setMaxSearchedPages] = useState<number>(0);

    useEffect(() => {
        initData();
    }, []);

    const initData = () => {
        setBaseUrl("https://www.h-brs.de");
        setUrlPath("/de/inf/studienangebot/bachelor/informatik");
        setMaxDepth(1);
        setMaxSearchedPages(100);
        setRi([]);
        setLinks([]);
        setKwi({});
    }

    const handleChangeTab = (event: React.MouseEvent<HTMLElement>, newTab: string) => {
        if (newTab != null) {
            setCurrentTab(newTab);
        }
    };

    const handleKeywordSearchCallback = (keywordList: string[]) => {
        getDataByKeywords(baseUrl, urlPath, maxDepth, maxSearchedPages, keywordList).then((res) => {
            res?.json().then((resJson) => {
                setKwi(resJson);
            })
        })
    }

    const handleSearchClick = () => {
        setIsLoadingData(true);
        startSearch(baseUrl, urlPath, maxDepth, maxSearchedPages);
        const refreshProgress = () => {
            const progress = getProgress(baseUrl, urlPath, maxDepth, maxSearchedPages);
            progress.then((resTmp) => {
                resTmp?.json().then((res) => {
                    setLoadingProgress(res.progress);
                    if (res.finished) {
                        const data = getData(baseUrl, urlPath, maxDepth, maxSearchedPages);
                        data.then((dataTmp) => {
                            dataTmp?.json().then((dataJson) => {
                                setRi(dataJson.ri);
                                setLinks(dataJson.links);
                                setIsDataPresent(true);
                                setIsLoadingData(false);
                                setLoadingProgress(0.0);
                            });
                        });
                        clearInterval(intervalId);
                    }
                });
            });
        }
        const intervalId = setInterval(refreshProgress, 1000);
    };

    const handleResetClick = () => {
        initData();
        setIsDataPresent(false);
    }

    return (
        <>
            <AppContext.Provider value={{
                baseUrl: baseUrl,
                urlPath: urlPath,
                maxDepth: maxDepth,
                maxSearchedPages: maxSearchedPages,
                isDataPresent: isDataPresent
            }}>
                <Container maxWidth="lg" sx={{my: "5vh"}}>
                    <Box sx={{
                        border: 2,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        borderColor: 'grey.800',
                        backgroundColor: "#ddebee"
                    }}>
                        <Typography color="grey.700" variant="h5" sx={{ml: "2vh", my: "2vh"}}>Web Parser</Typography>
                    </Box>
                    <Box sx={{border: 2, borderTop: 0, borderColor: 'grey.800'}}>
                        <Grid sx={{py: "5vh"}} container>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    value={baseUrl}
                                    onChange={(event) => setBaseUrl(event.target.value)}
                                    label="Base-Url"
                                    variant="outlined"
                                    disabled={isDataPresent}/>
                            </Grid>
                            <Grid item xs={0.3}>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    value={urlPath}
                                    onChange={(event) => setUrlPath(event.target.value)}
                                    label="Path-Url"
                                    variant="outlined"
                                    disabled={isDataPresent}/>
                            </Grid>
                            <Grid item xs={0.3}>
                            </Grid>
                            <Grid item xs={0.7}>
                                <TextField
                                    value={maxDepth}
                                    onChange={(event) => setMaxDepth(parseInt(event.target.value))}
                                    size="medium"
                                    label="Depth"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{min: 1, max: 5}}
                                    sx={{width: {sm: 200, md: 70}}}
                                    disabled={isDataPresent}
                                />
                            </Grid>
                            <Grid item xs={0.3}>
                            </Grid>
                            <Grid item xs={0.7}>
                                <TextField
                                    value={maxSearchedPages}
                                    onChange={(event) => setMaxSearchedPages(parseInt(event.target.value))}
                                    size="medium"
                                    label="Max. pages"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{min: 1, max: 5}}
                                    sx={{width: {sm: 200, md: 100}}}
                                    disabled={isDataPresent}
                                />
                            </Grid>
                            <Grid item xs={1.5}>
                            </Grid>
                            <Grid item xs={3}>
                                {!isDataPresent &&
                                    <Button sx={{mt: 1}} variant="contained"
                                            onClick={handleSearchClick}>Search</Button>}
                                {isDataPresent &&
                                    <Button sx={{mt: 1}} variant="contained" onClick={handleResetClick}>Reset</Button>}
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{pt: "3vh", pb: "1vh"}}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={currentTab}
                                        exclusive
                                        onChange={handleChangeTab}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="ri">Relevant Information</ToggleButton>
                                        <ToggleButton value="rl">Relevant Links</ToggleButton>
                                        <ToggleButton value="kw">Keywords</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            {currentTab === 'ri' &&
                                <RelevantInformationContainerComponent ri={ri}/>}
                            {currentTab === 'rl' &&
                                <RelevantLinksContainerComponent links={links}/>}
                            {currentTab === 'kw' &&
                                <KeywordSearchContainerComponent
                                    kwi={kwi}
                                    handleKeywordSearchCallback={handleKeywordSearchCallback} />}
                        </Grid>
                    </Box>
                    <Box sx={{
                        height: "5vh",
                        border: 2,
                        borderTop: 0,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderColor: 'grey.800',
                        backgroundColor: "#ddebee"
                    }}>
                    </Box>
                </Container>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoadingData}
                >
                    <Box sx={{width: '50%'}}>
                        <Stack direction="row" justifyContent="center" sx={{mb: "3vh"}}>
                            <Typography variant="h4" align="center" sx={{
                                p: "1vh",
                                color: "#155fa0",
                                backgroundColor: "white",
                                border: 1,
                                borderRadius: 2,
                                borderColor: '#1e88e5',
                            }}>Loading data. Please wait...</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={loadingProgress * 100}/>
                    </Box>
                </Backdrop>
            </AppContext.Provider>
        </>
    );
}

export default App;
