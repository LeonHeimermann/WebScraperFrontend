import {useContext, useState} from "react";
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import {AppContext} from "../App";

function KeywordListComponent(props: any) {
    const [keyword, setKeyword] = useState<string>('');
    const [keywordList, setKeywordList] = useState<string[]>([]);

    const handleKeywordSearchCallback = props.handleKeywordSearchCallback;
    const { isDataPresent } = useContext(AppContext);

    const addKeyword = () => {
        if (keyword.trim() !== '') {
            setKeywordList([...keywordList, keyword]);
            setKeyword('');
        }
    };

    const removeKeyword = (index: any) => {
        const keywordListTmp = keywordList.filter((_, i) => i !== index);
        setKeywordList(keywordListTmp);
    };

    const handleSearch = () => {
        handleKeywordSearchCallback(keywordList);
    }

    return (
        <Paper variant="outlined" sx={{height: "40vh"}}>
            <Stack sx={{m: "2vh", mt: "1.5vh"}}>
                <TextField
                    label="Neues Wort hinzufügen"
                    variant="outlined"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button disabled={keywordList.length >= 4} variant="contained" sx={{m: "1vh", mb: 0}} onClick={addKeyword}>
                    Hinzufügen
                </Button>
                <List sx={{height: "20vh"}}>
                    {keywordList.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item}/>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => removeKeyword(index)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" disabled={!isDataPresent || keywordList.length === 0} sx={{}} onClick={handleSearch}>
                    Search
                </Button>
            </Stack>
        </Paper>
    );
}

export default KeywordListComponent;