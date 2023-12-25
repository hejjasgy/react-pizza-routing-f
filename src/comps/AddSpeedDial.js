import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {AddOutlined, FiberNewOutlined, LocalPizzaOutlined} from "@mui/icons-material";

const actions = [
    { icon: <LocalPizzaOutlined />, name: 'Véletlenszerű' },
    { icon: <FiberNewOutlined />, name: 'Új' },
];

export default function AddSpeedDial(props) {
    const handleOpen = () => props.setBackdropOpen(true);
    const handleClose = () => props.setBackdropOpen(false);

    return (
        <Box sx={{height:"100vh", transform: 'translateZ(0px)', flexGrow: 1, position:"fixed", bottom:"16px", right:"16px", zIndex:1001}}>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<AddOutlined />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={props.isBackdropOpen}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
