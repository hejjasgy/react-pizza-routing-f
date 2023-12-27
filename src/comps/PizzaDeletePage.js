import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Typography} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {CheckCircleOutlined, DeleteForeverOutlined, DoNotDisturbAltOutlined} from "@mui/icons-material";

export default function PizzaDeletePage(props){
    const navigator = useNavigate();
    const params = useParams();
    const [getPizza, setPizza] = useState({});
    const [isLoadingPending, setLoadingPending] = useState(true);
    const [isDeleting, setDeleting] = useState(false);

    const fetchURL = "https://pizza.kando-dev.eu/Pizza/" + params.pizzaID;

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
        async function loadPizza(){
            await fetch(fetchURL).then(async(response) => {
                const data = await response.json();
                setPizza(data);
                setLoadingHandlerFalse()
            }).catch(error => {
                openSnackbar("error", "Nem sikerült betölteni a kért pizzát: " + error);
                navigator(-1);
            })
        }
        loadPizza()
    }, []);

    function openSnackbar(type, message){
        props.setSnackbarType(type)
        props.setSnackbarMessage(message);
        props.setSnackbarOpen(true)
    }

    const handleDialogClose = () =>{
        navigator(-1);
    }

    async function handleDeletePizza(){
        setLoadingHandlerTrue()
        setDeleting(true)
        await fetch(fetchURL, {
            headers: {"Content-type": "application/json"},
            method: "DELETE",
            body: JSON.stringify({id:getPizza.id})
        }).then((response) => {
            openSnackbar("success", "A pizza törölve lett")
            navigator("/")
        }).catch((error) => {
            openSnackbar("error", "Hibába ütköztünk: " + error)
        }).finally(() => {
            setDeleting(false)
            setLoadingHandlerFalse()
        });
    }

    return (
        <div>
            <Dialog
                open={true}
                fullScreen
                aria-labelledby="Betöltés..."
                aria-describedby="Kis türelmet...">
                <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>
                    {isDeleting?"Törüljük a pizzát, kis türelmet...":"Biztosan törölni szeretnéd a pizzát?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {isLoadingPending && !isDeleting?(
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <CircularProgress/>
                        </Box>):(
                        <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Card sx={{width: "90%", margin:"10px"}} style={isDeleting?({filter:"grayscale(1)"}):({})}>
                                <CardActionArea disabled={isDeleting}>
                                    <CardMedia
                                        component="img"
                                        sx={{maxHeight:"700px", height:"80vh"}}
                                        image={getPizza.kepURL}
                                        alt={getPizza.name}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {getPizza.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Azonosító: {getPizza.id}
                                        </Typography>
                                        <Typography color="text.secondary"
                                                    sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            Glutén mentes? {getPizza.isGlutenFree ? (
                                            <CheckCircleOutlined style={{color: "green", marginLeft: "5px"}}/>) : (
                                            <DoNotDisturbAltOutlined style={{color: "red", marginLeft: "5px"}}/>)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                        )}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" disabled={isLoadingPending||isDeleting} onClick={handleDialogClose}>Nem, nincs törlés</Button>
                    <LoadingButton
                        loading={isDeleting}
                        loadingPosition="start"
                        startIcon={<DeleteForeverOutlined />}
                        variant="outlined"
                        color="error"
                        onClick={()=>{handleDeletePizza()}}>
                        Igen, pizza törlése
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )


}