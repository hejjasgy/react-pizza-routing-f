import {useEffect, useState} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Menu, MenuItem, Typography}from "@mui/material";
import {CheckCircleOutlined, DeleteForeverOutlined, DoNotDisturbAltOutlined, EditOutlined, RemoveRedEyeOutlined,} from "@mui/icons-material";

export default function PizzaCards(props){
    const [getPizzas, setPizzas] = useState({});
    const [isLoadingPending, setLoadingPending] = useState(true);
    const [getUpdateCounter, setUpdateCounter] = useState(0);

    const setLoadingHandlerTrue = () => {
        setLoadingPending(true);
        props.setLoadingBackdropOpen(true);
    }

    const setLoadingHandlerFalse = () => {
        setLoadingPending(false);
        props.setLoadingBackdropOpen(false);
    }

    useEffect(() => {
        setLoadingHandlerTrue()

        async function loadPizzas(){
            await fetch("https://pizza.kando-dev.eu/Pizza").then(async(response) => {
                const data = await response.json();
                setPizzas(data);
                setLoadingHandlerFalse()
            })
        }

        loadPizzas()
    }, [getUpdateCounter]);

    return (
        <div style={{display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center"}}>
            {getPizzas.map(pizza => (
                <Card sx={{width: 345}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={pizza.kepURL}
                            alt={pizza.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {pizza.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Azonosító: {pizza.id}
                            </Typography>
                            <Typography color="text.secondary"
                                        sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                Glutén mentes? {pizza.isGlutenFree ? (
                                <CheckCircleOutlined style={{color: "green", marginLeft: "5px"}}/>) : (
                                <DoNotDisturbAltOutlined style={{color: "red", marginLeft: "5px"}}/>)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <PositionedMenu id={pizza.id}/>
                        </CardActions>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}

function PositionedMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{width:"100%"}}>
            <Button
                id={"positioned-button-for-id-" + props.id}
                aria-controls={open ? "positioned-button-for-id-" + props.id : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Műveletek
            </Button>
            <Menu
                id={"positioned-menu-for-id-" + props.id}
                aria-labelledby={"positioned-button-for-id-" + props.id}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <RemoveRedEyeOutlined sx={{marginRight:"5px"}}/>
                    Megtekintés
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <EditOutlined sx={{marginRight:"5px"}}/>
                    Szerkesztés
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{color:"red"}}>
                    <DeleteForeverOutlined sx={{marginRight:"5px"}}/>
                    Törlés
                </MenuItem>
            </Menu>
        </div>
    );
}