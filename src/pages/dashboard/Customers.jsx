import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import * as service from '../../services/CustomerService';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const defaultPageRef = useRef(0);
  const defaultOrientationRef = useRef('asc');
  const defaultOrderRef = useRef('lastName');

  useEffect(() => {
    getCustomers();
  }, []);

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

    const response = await service.getCustomers(
      defaultOrientationRef.current,
      defaultOrderRef.current,
      defaultPageRef.current
    );
    if (response?.status == 200) {
      setCustomers(response.data.content);
      console.log(response);
    } else {
      console.error(response.data.message);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Customers;
