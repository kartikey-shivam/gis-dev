import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export function InfoModal({isVisible, onToggleModal}) {
    if (!isVisible) return null;    //info modal is closed
    return(
    <React.Fragment>
      
      <Dialog
        open={onToggleModal}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>About ClimaCrew</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          We analyse satellite and marine data for analyzing the best seaweed spots, apply marine engineering in the identified areas for building sustainable marine farms. This application shows real time marine and weather data for the Indian coastline. You can visit our website to know more.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href="https://www.climacrew.in/">Visit</Button>
          <Button onClick={onToggleModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
       
    )
}

export function InfoButton({onToggleModal}) {
    return(
        <button className="info-button mouse-pointer bg-blue-100 hover:bg-blue-200" onClick={onToggleModal}>
            &#8505;
        </button>
    )
}