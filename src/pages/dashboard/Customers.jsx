import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useState, useEffect, useRef, createContext } from 'react';
import * as service from '../../services/CustomersService';
import TableCustomers from '../../components/public/customers/TableCustomers';
import ModalCustomers from '../../components/public/customers/ModalCustomers';
import { Customer } from './../../AppTools';

export const CustomersContext = createContext({})

function Customers() {
  const [totalPages, setTotalPages] = useState(0)
  const [activeBackdrop, setActiveBackdrop] = useState(false);
  
  const [showModal, setShowModal] = useState(false)
  const [customer, setCustomer ] = useState(new Customer())

  const [customers, setCustomers] = useState([]);
  const [hasCustomers, setHasCustomers] = useState(false)

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
    setShowModal(true)
  };
  const closeModal = () => {
    setShowModal(false)
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
      setTotalPages(response.data.totalPages)
      setCustomers(response.data.content);
    } else {
      console.error(response.data.message);
    }
    closeBackdrop();
  };

  console.log(customers);

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
        totalPages: totalPages,
        setCustomer: setCustomer,
        customer: customer
      }}
      >
        <ModalCustomers
        open={showModal}
        onClose={closeModal}
        customers={{reload: getCustomers}}/>


{hasCustomers?(
  
  <TableCustomers
  customers={{collection: customers, reload: getCustomers}}
  backdrop={{open: openBackdrop, close: closeBackdrop}}
/>
):(
  <p className='mt-4 text-slate-300'>No hay clientes cargados</p>
)}

</CustomersContext.Provider>

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
