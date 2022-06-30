import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: '#727272',
        fontFamily: "Montserrat",
        // padding: '5px',
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Montserrat",
        fontWeight: 600,
        // padding: '5px'
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, role, title, email, phone, device, macid, hand) {
    return { name, role, title, email, phone, device, macid, hand };
}

const rows = [
    createData('Amy Wang', 'User', 'Beef Cutter', 'Amy.Wang@Johnsonville.com', '415-321-4567', 'SS_GW4', '02-11-34-DF-33-44', 'Left'),
    createData('Blake Fernandez', 'User', 'Beef Packer', 'Blake.Fernandez@Johnsonville.com', '415-321-4567', 'SS_GW4', '02-11-34-DF-33-44', 'Right'),
    createData('Brooke Henderson', 'Admin', 'Experienced Production Lead', 'Brooke.Henderson@Johnsonville.com', '415-321-4567', 'SS_GW4', '02-11-34-DF-33-44', 'Right'),
    createData('Charles Miller', 'User', 'Beef Trimmer', 'Charles.Miller@Johnsonville.com', '415-321-4567', 'SS_GW4', '02-11-34-DF-33-44', 'Left'),
    createData('Christina Williams', 'User', 'Experienced Electrical Maintainence', 'Christina.Williams@Johnsonville.com', '415-321-4567', 'SS_GW4', '02-11-34-DF-33-44', 'Left'),
];

export default function Tables() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className='mobileRenderHead'>Name</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">role</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">Title</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">Email</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">Phone</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">Device</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">MAC ID</StyledTableCell>
                        <StyledTableCell className='mobileRender' align="left">Hand</StyledTableCell>
                        <StyledTableCell className='mobileRenderHead' align="left">Edit</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell className='mobileRenderHead textColor' component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell className='mobileRender' align="left">{row.role}</StyledTableCell>
                            <StyledTableCell className='mobileRender textColor' align="left">{row.title}</StyledTableCell>
                            <StyledTableCell className='mobileRender textColor' align="left">{row.email}</StyledTableCell>
                            <StyledTableCell className='mobileRender textColor' align="left">{row.phone}</StyledTableCell>
                            <StyledTableCell className='mobileRender' align="left">{row.device}</StyledTableCell>
                            <StyledTableCell className='mobileRender' align="left">{row.macid}</StyledTableCell>
                            <StyledTableCell className='mobileRender' align="left">{row.hand}</StyledTableCell>
                            <StyledTableCell className='mobileRenderHead' align="right">ed</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}