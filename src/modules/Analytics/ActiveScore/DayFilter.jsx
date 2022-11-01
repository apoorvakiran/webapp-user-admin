import React, { useState } from 'react';
import { Grid, Paper, styled } from "@mui/material";
import { DashboardData } from "../../../utils/Data/Data";

export const DayFilter = (props) => {
    const [selected, setSelected] = useState(0);

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
        borderColor: "black",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "black",
    }));

    async function onGridSelection(value) {
    }

    return (

        <div className="dashboard" >
            <Grid container  className="timeSelect">
                {DashboardData.map((data, index) => {
                    return (
                        <Grid
                            key={index}
                            item
                            xs={3}
                            onClick={() => {
                                setSelected(index);
                            }}
                        >
                            <Item
                                className={
                                    selected === index ? "gridData activeGrid" : "gridData"
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    onGridSelection(data);
                                }}
                            >
                                {data}
                            </Item>
                        </Grid>
                    );
                })}
            </Grid>
        </div >
    );
};
