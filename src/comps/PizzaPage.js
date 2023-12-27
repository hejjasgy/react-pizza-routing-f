import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Button, ButtonGroup, Divider, InputLabel, MenuItem, Select, Skeleton, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import {CancelOutlined, DeleteForeverOutlined, EditOutlined, SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

export default function PizzaPage(props){
    const navigator = useNavigate();
    const params = useParams();
    const [getPizza, setPizza] = useState({});
    const [getRealPizza, setRealPizza] = useState({});
    const [isEditMode, setEditMode] = useState(false);
    const [isLoadingPending, setLoadingPending] = useState(true);
    const [isUpdating, setUpdating] = useState(false);

    const fetchURL = "https://pizza.kando-dev.eu/Pizza/" + params.pizzaID;

    const setEditModeOn = () => setEditMode(true);
    const setEditModeOff = () => setEditMode(false);

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
                setRealPizza(data);
                if(params.editMode)setEditModeOn()
                setLoadingHandlerFalse()
            }).catch(error => {
                openSnackbar("error", "Nem sikerült betölteni a kért pizzát: " + error);
                navigator(-1);
            })
        }
        loadPizza()
    }, []);

    const handleChange = (event) => {
        setPizza(prevState => ({...prevState,
            [event.target.name]: event.target.value
        }));
    };

    function openSnackbar(type, message){
        props.setSnackbarType(type)
        props.setSnackbarMessage(message);
        props.setSnackbarOpen(true)
    }

    const handleSave = async() => {
        setUpdating(true)
        const pizzaName = getPizza.name;
        const pizzaImageURL = getPizza.kepURL;
        let errors = 0;
        if(pizzaName.length < 3 || pizzaImageURL.length < 3) errors++;

        if(errors != 0){
            openSnackbar("error", "Érvénytelen értékeket észleltünk")
            setUpdating(false)
        }else{
            props.setLoadingBackdropOpen(true)
            await fetch(fetchURL, {
                headers:{"Content-type":"application/json"},
                method:"PUT",
                body: JSON.stringify(getPizza)
            }).then((response) => {
                openSnackbar("success", "A módosításokat elmentettük")
            }).catch((error) => {
                openSnackbar("error", "Hibába ütköztünk: " + error)
            }).finally(()=>{
                setUpdating(false)
                setEditMode(false)
                setRealPizza(getPizza)
                props.setLoadingBackdropOpen(false)
            });
        }
    };

    if(isLoadingPending){
        return (
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Skeleton>
                        <Typography variant="h1" gutterBottom>{getRealPizza.name}</Typography>
                    </Skeleton>
                </div>

                <div style={{display: "flex", flexWrap:"wrap"}}>
                    <div style={{marginInline: "40px"}}>
                        <Skeleton width="545px" height="400px" sx={{marginTop:"-20px"}}></Skeleton>

                        <div style={{marginTop: "40px"}}>
                            <ButtonGroup variant="outlined" aria-label="loading button group">
                               <Skeleton>
                                  <Button disabled>Szerkesztés</Button>
                                  <Button disabled>Törlés</Button>
                                  <Button disabled></Button>
                                </Skeleton>
                            </ButtonGroup>
                        </div>
                    </div>

                    <div style={{flex: "5", marginRight: "40px"}}>
                        <Skeleton width="100%" height="400px" sx={{marginTop:"-20px"}}></Skeleton>
                    </div>

                </div>

            </div>

        );
    }

    return (
        <div>
            <div>
                <Typography variant="h1" gutterBottom>{getRealPizza.name}</Typography>
            </div>

            <div style={{display: "flex"}}>
                <div style={{marginInline: "40px"}}>
                    <Avatar sx={{borderRadius: "16px", width: "545px", height: "343px"}} alt={getPizza.name + " pizza"}
                            src={isEditMode ? getPizza.kepURL : getRealPizza.kepURL}></Avatar>

                    <div style={{marginTop: "40px"}}>
                        <ButtonGroup variant="outlined" aria-label="loading button group">
                            <Button disabled={isUpdating} onClick={isEditMode ? setEditModeOff : setEditModeOn}
                                    color={isEditMode ? "secondary" : "primary"}
                                    startIcon={isEditMode ? (<CancelOutlined/>) : (
                                        <EditOutlined/>)}>{isEditMode ? "Mégsem" : "Szerkesztés"}</Button>
                            <Button disabled={!isEditMode || isUpdating} onClick={()=>{navigator("/pizza-torlese/"+getPizza.id)}} color="error"
                                           startIcon={<DeleteForeverOutlined/>}>Törlés</Button>
                            <LoadingButton disabled={!isEditMode || isUpdating} onClick={handleSave}
                                           loading={isUpdating} loadingPosition="start"
                                           startIcon={<SaveOutlined/>}>Mentés</LoadingButton>
                        </ButtonGroup>
                    </div>
                </div>

                <div style={{flex: "5", marginRight: "40px"}}>
                    <Stack direction="column" divider={<Divider orientation="vertical" flexItem/>} spacing={2}
                           sx={{textAlign: "left"}}>
                        <div>
                            <Typography gutterBottom>Név</Typography>
                            <TextField error={isEditMode ? getPizza.name.length < 3 : getRealPizza.name.length < 3}
                                       required name="name" onChange={handleChange} disabled={!isEditMode || isUpdating}
                                       value={isEditMode ? getPizza.name : getRealPizza.name} fullWidth
                                       id="pizza_name_input" label="Pizza név" variant="outlined"/>
                        </div>

                        <div>
                            <Typography gutterBottom>Kép hivatkozás</Typography>
                            <TextField error={isEditMode ? getPizza.kepURL.length < 3 : getRealPizza.kepURL.length < 3}
                                       required name="kepURL" onChange={handleChange}
                                       disabled={!isEditMode || isUpdating}
                                       value={isEditMode ? getPizza.kepURL : getRealPizza.kepURL} fullWidth
                                       id="pizza_image_url_input" label="Pizza kép" type="url" variant="outlined"/>
                        </div>

                        <div>
                            <Typography gutterBottom>Egyéb információ</Typography>
                            <InputLabel required id="pizza_is_gluten_free_input">Glutén-mentes?</InputLabel>
                            <Select
                                fullWidth
                                name="isGlutenFree"
                                disabled={!isEditMode || isUpdating}
                                labelId="pizza_gluten_mentes_label"
                                id="pizza_gluten_mentes_select"
                                value={isEditMode ? getPizza.isGlutenFree : getRealPizza.isGlutenFree}
                                label="Glutén-mentes?"
                                onChange={handleChange}>
                                <MenuItem value={0}>Igen</MenuItem>
                                <MenuItem value={1}>Nem</MenuItem>
                            </Select>
                        </div>

                    </Stack>
                </div>

            </div>

        </div>
    )

}