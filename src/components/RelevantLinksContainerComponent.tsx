import {Grid, Link, Paper, Typography} from "@mui/material";
import React, {useContext} from "react";
import Stack from "@mui/material/Stack";
import {filterValidLinks, isValidUrl} from "../utils/LinksFilterUtils";
import {AppContext} from "../App";

function RelevantLinksContainerComponent(props: any) {
    const links: { [url: string]: string[] } = props.links;
    return (
        <>
            <Grid item xs={10}
                  sx={{height: "50vh", border: 1, borderRadius: 1, borderColor: 'grey.500'}}>
                <Stack direction="row">
                    <Typography sx={{
                        mx: "4vh",
                        my: "1vh",
                        p: "1vh",
                        border: 1,
                        borderRadius: 5,
                        borderColor: 'grey.500'
                    }}>Relevant links</Typography>
                </Stack>
                <Paper variant="outlined" sx={{
                    height: "40vh",
                    overflow: 'auto',
                    mx: "4vh",
                    mb: "4vh"
                }}>
                    <RelevantLinksListComponent links={links}/>
                </Paper>
            </Grid>
        </>
    );
}

function RelevantLinksListComponent(props: any) {
    let links: { [url: string]: string[][][] } = props.links;
    links = filterValidLinks(links);
    return (
        <>
            <Stack spacing={2} sx={{m: "2vh"}}>
                {Object.entries(links).map(([url, information]) => {
                    return <RelevantLinksComponent url={url} information={information}/>
                })}
            </Stack>
        </>
    );
}

function RelevantLinksComponent(props: any) {
    const url = props.url;
    const information: string[][][] = props.information;

    const { baseUrl } = useContext(AppContext);

    return (
        <>
            <Paper elevation={4} sx={{m: "2vh", p: "1vh", pb: "2vh"}}>
                <Link href={url} sx={{ml: "0.5vh"}}>{url}</Link>
                <Stack sx={{mt: "2vh"}}>
                    {information.map((info) =>
                        info.map((infoTuple) => {
                            const validUrl = isValidUrl(infoTuple[1]);
                            const fullUrl = validUrl ? infoTuple[1] : `${baseUrl}${infoTuple[1]}`
                            return <Link href={fullUrl}
                                         sx={{mx: "1vh", my: "0.5vh"}}>- {infoTuple[0]} ({infoTuple[1]})</Link>
                        })
                    )}
                </Stack>
            </Paper>
        </>
    );
}

export default RelevantLinksContainerComponent;
