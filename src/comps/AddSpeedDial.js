import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {AddOutlined, FiberNewOutlined, LocalPizzaOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const actions = [
    { icon: <LocalPizzaOutlined />, name: 'Véletlenszerű', link:"/uj-pizza/random"},
    { icon: <FiberNewOutlined />, name: 'Új',link:"/uj-pizza"},
];

export default function AddSpeedDial(props){
    const navigator = useNavigate();

    const handleOpen = () => props.setBackdropOpen(true);
    const handleClose = () => props.setBackdropOpen(false);

    function handleNavigateTo(value){
        handleClose();
        if(value.includes("random"))value += Date.now();
        navigator(value)
    }

    return (
        <Box sx={{height:"100vh", transform: 'translateZ(0px)', flexGrow: 1, position:"fixed", bottom:"16px", right:"16px", zIndex:1001}}>
            <SpeedDial
                ariaLabel="Új pizza hozzáadása"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<AddOutlined />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={props.isBackdropOpen}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={()=>handleNavigateTo(action.link)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
