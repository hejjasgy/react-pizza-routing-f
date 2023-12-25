import './App.css';
import AddSpeedDial from "./comps/AddSpeedDial";
import {CircularProgress, Typography} from "@mui/material";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import {Route, Routes} from "react-router-dom";
import PizzaCards from "./comps/PizzaCards";

function App(){
    const [isBackdropOpen, setBackdropOpen] = React.useState(false);
    const [isLoadingBackdropOpen, setLoadingBackdropOpen] = React.useState(false);

    return(
       <div style={{textAlign:"center"}}>
           <div>
               <Typography variant="h1" gutterBottom>Pizzák</Typography>
           </div>

           <Backdrop sx={{zIndex:1000}} open={isBackdropOpen} />
           <AddSpeedDial isBackdropOpen={isBackdropOpen} setBackdropOpen={setBackdropOpen}/>

           <Backdrop
               sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
               open={isLoadingBackdropOpen}>
               <CircularProgress color="inherit"/>
           </Backdrop>


           <Routes>
               <Route path="/" element={<PizzaCards isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen} />}>
                   <Route path="*" element={<PizzaCards isLoadingBackdropOpen={isLoadingBackdropOpen} setLoadingBackdropOpen={setLoadingBackdropOpen}/>} />
               </Route>
           </Routes>

       </div>
    );
}

export default App;
