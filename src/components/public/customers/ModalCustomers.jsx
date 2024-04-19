import React, { useContext, useEffect } from 'react';
import { CustomersContext } from '../../../pages/dashboard/Customers';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function ModalCustomers(props) {
  const { open, onClose, customers } = props;
  const { customer, setCustomer } = useContext(CustomersContext);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCustomer(new Customer());
      }, 500);
    }
  }, [open]);

  const catchValue = (event)=> {
customer[event.target.name] = event.target.value
  }

  return (
  <>
  <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
    <DialogTitle
    sx={{backgroundColor: "2e7c33", color:"white", m:0, p:2}}
    >
        {"Agregar Cliente"}
    </DialogTitle>
    <DialogContent dividers>
        <Box sx={{display:"flex"}}>
            <TextField
            name='name'
            sx={{marginTop:".5em", marginRight: ".5em"}}
            variant="outlined"
            size='small'
            onBlur={catchValue}
            inputRef={inputNameRef}
            helperText="Nombre"
            />
            <LocalizationProvider dataAdapter={AdapterDayjs}>
                <DateField
                name="dateOfBirth"
                sx={{marginTop:".5em", marginRight: ".5em"}}
                siz="small"
                helperText="Fecha de nacimiento"
                onBlur={catchValue}
                inputRef={(input)=>{
                    inputDateRef.current = input
                }}
                />
            </LocalizationProvider>

        </Box>
    </DialogContent>
    <DialogActions sx={{alignContent: "space-between"}}>
        <Button onClick={onClose} variant='outlined'>
            Guardar
        </Button>
    </DialogActions>
    <Backdrop
        sx={{ color: 'fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activeBackdropInModal}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
  </Dialog>
  </>
)
}

export default ModalCustomers;
