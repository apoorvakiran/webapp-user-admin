import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Tables from '../Table/index';
import './boxContainer.css';

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
