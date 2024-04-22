import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { useState, useEffect, useRef, createContext } from 'react';
import * as service from '../../services/CustomersService';
import TableCustomers from '../../components/public/customers/TableCustomers';
import ModalCustomers from '../../components/public/customers/ModalCustomers';
import { Customer } from './../../AppTools';

export const CustomersContext = createContext({});

function Customers() {
  const [totalPages, setTotalPages] = useState(0);
  const [activeBackdrop, setActiveBackdrop] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [customer, setCustomer] = useState(new Customer());

  const [customers, setCustomers] = useState([]);
  const [hasCustomers, setHasCustomers] = useState(false);

  const [success, setSuccess] = useState({ open: false, message: '' });
  const [error, setError] = useState({ open: false, message: '' });

  const defaultPageRef = useRef(0);
  const defaultOrientationRef = useRef('asc');
  const defaultOrderRef = useRef('lastName');

  useEffect(() => {
    if (hasCustomers !== customers.length > 0) {
      setHasCustomers(customers.length > 0);
    }
    getCustomers();
  }, [customers.length]);

  const openBackdrop = () => {
    setActiveBackdrop(true);
  };

  const closeBackdrop = () => {
    setActiveBackdrop(false);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openSuccess = (message) => {
    success.message = message;
    setSuccess({ ...success, open: true });
  };
  const closeSuccess = (message) => {
    setSuccess({ ...success, open: false });
    success.message = '';
  };
  const openError = (message) => {
    error.message = message;
    setError({ ...error, open: true });
  };
  const closeError = (message) => {
    setSuccess({ ...error, open: false });
    error.message = '';
  };

  const toastPosition = {
    vertical: 'top',
    horizontal: 'center',
  };

  const getCustomers = async (orientation, order, page) => {
    defaultPageRef.current =
      defaultPageRef.current != page && page != null && page != undefined
        ? page
        : defaultPageRef.current;
    defaultOrientationRef.current =
      defaultOrderRef.current != orientation &&
      orientation != null &&
      orientation != undefined
        ? orientation
        : defaultOrientationRef.current;
    defaultOrderRef.current =
      defaultOrderRef.current != order && order != null && order != undefined
        ? order
        : defaultOrderRef.current;

    openBackdrop();

    const response = await service.getCustomers(
      defaultOrientationRef.current,
      defaultOrderRef.current,
      defaultPageRef.current
    );
    console.log(response);
    if (response?.status == 200) {
      setTotalPages(response.data.totalPages);
      setCustomers(response.data.content);
    } else {
      console.error(response.data.message);
    }
    closeBackdrop();
  };

  return (
    <>
      <Button
        variant='contained'
        color='success'
        startIcon={
          <FontAwesomeIcon style={{ color: 'white' }} icon={faUserPlus} />
        }
        onClick={openModal}
      >
        Cliente
      </Button>

      <CustomersContext.Provider
        value={{
          toast: { success: openSuccess, error: openError },
          modalCustomer: { open: openModal },
          totalPages: totalPages,
          setCustomer: setCustomer,
          customer: customer,
          backdrop: { open: openBackdrop, close: closeBackdrop },
        }}
      >
        <ModalCustomers
          open={showModal}
          onClose={closeModal}
          customers={{ reload: getCustomers }}
          activeBackdropInModal={activeBackdrop}
        />

        {hasCustomers ? (
          <TableCustomers
            customers={{ collection: customers, reload: getCustomers }}
            backdrop={{ open: openBackdrop, close: closeBackdrop }}
            setCustomer={{ setCustomer }}
           
            onClose={close}
            
          />
        ) : (
          <p className='mt-4 text-slate-300'>No hay clientes cargados</p>
        )}
      </CustomersContext.Provider>

      <Snackbar
        open={success.open}
        anchorOrigin={toastPosition}
        autoHideDuration={3000}
        onClose={closeSuccess}
      >
        <Alert onClose={closeSuccess} severity='success' sx={{ width: '100%' }}>
          {success.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error.open}
        anchorOrigin={toastPosition}
        autoHideDuration={3000}
        onClose={closeError}
      >
        <Alert onClose={closeError} severity='error' sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: 'fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activeBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}

export default Customers;
