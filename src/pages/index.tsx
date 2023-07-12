import {Alert, Button, Divider, Grid, Tab, Tabs} from "@mui/material";
import UploadBox from "@/components/upload-box";
import React, {SyntheticEvent, useState} from "react";
import {LoadingButton, TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/system";
import TextUploadBox from "@/components/text-upload-box";
import PlainTextBox from "@/components/plain-text-box";
import WebBox from "@/components/web-box";

const Home = () => {
    const [tabIndex, setTabIndex] = useState<string>('1');

    const handleChangeTab = (e: SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    }

    return (
        <Container>
            <Box sx={{
                fontSize: 25,
                marginTop: 3,
                marginBottom: 2,
            }}>
                MAI 프로젝트
            </Box>
            <Divider />
            <Box sx={styles.description}>
                OpenAI를 이용하여 텍스트를 임베딩하고, 임베딩된 텍스트를 이용하여 유사도를 계산하는 프로젝트입니다.
            </Box>

            <TabContext value={tabIndex}>
                <Tabs value={tabIndex} onChange={handleChangeTab} aria-label={'chat-tab'}>
                    <Tab label='PDF 학습' value='1'/>
                    <Tab label='Text 학습' value='2'/>
                    <Tab label='Web 학습' value='3'/>
                </Tabs>
                <TabPanel sx={styles.tabPanel} value="1">
                    <Alert sx={styles.alert} severity="info">PDF 파일은 최대 3MB 까지만 업로드 가능하도록 제한되어있습니다.</Alert>
                    <UploadBox />
                </TabPanel>
                <TabPanel sx={styles.tabPanel} value='2'>
                    <Alert sx={styles.alert} severity="info">TXT 파일은 최대 3MB 까지만 업로드 가능하도록 제한되어 있습니다.</Alert>
                    <Box sx={{marginTop: 3}}>
                        {/*<TextUploadBox />*/}
                        <PlainTextBox />
                    </Box>
                </TabPanel>
                <TabPanel sx={styles.tabPanel} value='3'>
                    <Alert sx={styles.alert} severity="info">유효한 Sitemap이 없는경우 단일 페이지의 데이터만 수집합니다.</Alert>
                    <WebBox />
                </TabPanel>
            </TabContext>
        </Container>

    );
}

const styles = {
    description: {
        marginTop: 5,
        marginBottom: 5,
    },
    tabPanel: {
        margin: 0,
        padding: 0,
    },
    alert: {
        marginTop: 2,
    }
}


export default Home;
