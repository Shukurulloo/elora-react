import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
return (
<div className={"static-frame"}>
    <Container>
        <Stack className="info">
            <Stack className="static-box">
                <Box className="static-num">5</Box>
                <Box className="static-text">Restourants</Box>
            </Stack>
            <Divider height="64" width="2" bg="#8cdd00"/>
            <Stack className="static-box">
                <Box className="static-num">9</Box>
                <Box className="static-text">Experience</Box>
            </Stack>
            <Divider height="64" width="2" bg="#8cdd00"/>
            <Stack className="static-box">
                <Box className="static-num">30+</Box>
                <Box className="static-text">Menu</Box>
            </Stack>
            <Divider height="64" width="2" bg="#8cdd00"/>
            <Stack className="static-box">
                <Box className="static-num">220+</Box>
                <Box className="static-text">Clients</Box>
            </Stack>
        </Stack>
    </Container>
</div>)
}