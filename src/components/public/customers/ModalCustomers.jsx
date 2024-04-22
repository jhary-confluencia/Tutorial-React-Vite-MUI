import React, { useContext, useEffect, useRef } from 'react';
import { CustomersContext } from '../../../pages/dashboard/Customers';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as utilDate from '../../../DateTools';
import { Customer } from '../../../AppTools';
import * as service from '../../../services/CustomersService';

function ModalCustomers(props) {
  const { open, onClose, customers, activeBackdropInModal } = props;
  const { toast, customer, setCustomer, modalCustomer, backdrop } =
    useContext(CustomersContext);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCustomer(new Customer());
      }, 500);
    }
  }, [open]);

  const catchValue = (event) => {
    customer[event.target.name] = event.target.value;
  };

  const inputNameRef = useRef('');
  const inputLastNameRef = useRef('');
  const inputMailRef = useRef('');
  const inputDateRef = useRef('');

  const clearInputs = () => {
    inputNameRef.current.value = '';
    inputLastNameRef.current.value = '';
    inputMailRef.current.value = '';
    inputDateRef.current.value = '';
  };

  const addCustomer = async () => {
    backdrop.open();
    const response = await service.addCustomer(customer);
    console.log(response);
    if (response?.status === 200) {
      toast.success('Cliente agregado con exito');
      onClose();
      customers.reload();
    } else {
      toast.error(response.data.message);
    }
    backdrop.close();
  };

  const updateCustomer = async () => {
    backdrop.open();
    const response = await service.updateCustomer(customer);
    if (response?.status === 200) {
      toast.success('Cliente modificado con exito');
      onClose();
      customers.reload();
    } else {
      toast.error(response.data.message);
    }
    backdrop.close();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth>
        <DialogTitle
          sx={{ backgroundColor: '2e7c33', color: 'white', m: 0, p: 2 }}
        >
          {customer?.id ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex' }}>
            <TextField
              defaultValue={customer?.name}
              name='name'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputNameRef}
              helperText='Nombre'
            />
            <TextField
              defaultValue={customer?.lastName}
              name='lastName'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputLastNameRef}
              helperText='Apellido'
            />
            <TextField
              defaultValue={customer?.mail}
              name='mail'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputMailRef}
              helperText='Email'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                defaultValue={
                  customer?.dateOfBirth
                    ? dayjs(
                        utilDate.formatDefaultDate(
                          new Date(customer?.dateOfBirth)
                        )
                      )
                    : undefined
                }
                name='dateOfBirth'
                sx={{ marginTop: '.5em', marginRight: '.5em' }}
                siz='small'
                helperText='Fecha de nacimiento'
                onBlur={catchValue}
                inputRef={(input) => {
                  inputDateRef.current = input;
                }}
              />
            </LocalizationProvider>
            <Button
              sx={{ marginTop: '.5em', marginRight: '5.em' }}
              onClick={clearInputs}
              color='error'
            >
              Limpiar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ alignContent: 'space-between' }}>
          <Button onClick={onClose} variant='outlined'>
            Cancelar
          </Button>
          <Button
            onClick={customer?.id ? updateCustomer : addCustomer}
            variant='contained'
            color='success'
          >
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
  );
}

export default ModalCustomers;
