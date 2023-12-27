import './App.css';
import AddSpeedDial from "./comps/AddSpeedDial";
import {
    Button,
    CircularProgress,
    Drawer,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Snackbar,
    SwipeableDrawer,
    Typography
} from "@mui/material";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import {Route, Routes, useNavigate} from "react-router-dom";
import PizzaCards from "./comps/PizzaCards";
import PizzaPage from "./comps/PizzaPage";
import {Alert, LoadingButton} from "@mui/lab";
import PizzaAddPage from "./comps/PizzaAddPage";
import PizzaDeletePage from "./comps/PizzaDeletePage";
import {useState} from "react";
import {CasinoOutlined, CloudUploadOutlined, FiberNewOutlined, HomeOutlined, MenuOutlined} from "@mui/icons-material";

function App(){
    const navigation = useNavigate();
    const [isBackdropOpen, setBackdropOpen] = React.useState(false);
    const [isLoadingBackdropOpen, setLoadingBackdropOpen] = React.useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
    const [getSnackbarMessage, setSnackbarMessage] = React.useState("");
    const [getSnackbarType, setSnackbarType] = React.useState("success");
    const [isDrawerOpen, setDrawerOpen] = useState(false); // alapértelmezett állapot: zárva

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };


    return(
        <div style={{textAlign: "center", padding: "10px"}}>
            <Backdrop sx={{zIndex: 1000}} open={isBackdropOpen}/>
            <AddSpeedDial isBackdropOpen={isBackdropOpen} setBackdropOpen={setBackdropOpen}/>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoadingBackdropOpen}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={getSnackbarType} sx={{width: '100%'}}>
                    {getSnackbarMessage}
                </Alert>
            </Snackbar>

            <LoadingButton sx={{position:"fixed", left:"12px", top:"12px"}} onClick={toggleDrawer} loadingPosition="start" startIcon={<MenuOutlined/>}></LoadingButton>

            <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem key={"homePage"}>
                        <ListItemButton onClick={()=>{navigation("/");setDrawerOpen(false)}}>
                            <ListItemIcon>
                                <HomeOutlined />
                            </ListItemIcon>
                            <ListItemText primary={"Kezdőlap"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"newPizza"}>
                        <ListItemButton onClick={()=>{navigation("uj-pizza");setDrawerOpen(false)}}>
                            <ListItemIcon>
                                <FiberNewOutlined />
                            </ListItemIcon>
                            <ListItemText primary={"Új pizza hozzáadása"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"newRandomPizza"}>
                        <ListItemButton onClick={()=>{navigation("uj-pizza/random");setDrawerOpen(false)}}>
                            <ListItemIcon>
                                <CasinoOutlined />
                            </ListItemIcon>
                            <ListItemText primary={"Új véletlenszerű pizza"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

    <Routes>
        <Route path="/" element={<PizzaCards isLoadingBackdropOpen={isLoadingBackdropOpen}
                                             setLoadingBackdropOpen={setLoadingBackdropOpen}/>}/>
        <Route path="/pizza/:pizzaID" element={<PizzaPage isLoadingBackdropOpen={isLoadingBackdropOpen}
                                                          setLoadingBackdropOpen={setLoadingBackdropOpen}
                                                          setSnackbarOpen={setSnackbarOpen}
                                                          setSnackbarType={setSnackbarType}
                                                          setSnackbarMessage={setSnackbarMessage}/>}/>
        <Route path="/pizza/:pizzaID/:editMode" element={<PizzaPage isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen} setSnackbarOpen={setSnackbarOpen} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage}/>} />
               <Route path="/uj-pizza/" element={<PizzaAddPage isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen} setSnackbarOpen={setSnackbarOpen} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage}/>} />
               <Route path="/uj-pizza/:randomMode" element={<PizzaAddPage isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen} setSnackbarOpen={setSnackbarOpen} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage}/>} />
               <Route path="/pizza-torlese/:pizzaID" element={<PizzaDeletePage isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen} setSnackbarOpen={setSnackbarOpen} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage}/>} />
           </Routes>

       </div>
    );
}


export default App;
