import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Tables from '../Table/index';
import './boxContainer.css';
import { FormButton } from "../formComponents/FormButton";
import Typography from "@mui/material/Typography";

export default function BoxContainer() {
    return (
        <>
            <CssBaseline />
            <Container data-testid="box-container" maxWidth="lg" className="boxContainer" style={{marginTop:"5em"}}>
                    <Tables data-testid="tables" />
                {/* </Box> */}
            </Container>
        </>
    );
}
