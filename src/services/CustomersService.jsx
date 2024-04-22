import axios from 'axios';
import QueryString from 'qs';
import * as utilService from '../ServiceTools';

const URL_BASE = 'http://192.168.237.65:5176/api/customers';

export const addCustomer = async (customer) => {
  utilService.removeNullValues(customer);

  const data = QueryString.stringify(customer, { allowDots: true });

  const config = {
    method: 'POST',
    url: `${URL_BASE}/add`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateCustomer = async (customer) => {
  utilService.removeNullValues(customer);

  const data = QueryString.stringify(customer, { allowDots: true });

  const config = {
    method: 'PUT',
    url: `${URL_BASE}/update`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export async function getCustomers(orientation, order, page) {
  const data = new FormData();

  if (orientation) {
    data.append('orientation', orientation);
  }
  if (order) {
    data.append('order', order);
  }
  if (page) {
    data.append('page', page);
  }

  const config = {
    method: 'POST',
    url: `${URL_BASE}/list`,
    data: { orientation, order, page },
  };
  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export const deleteCustomer = async (customerId) => {
  utilService.removeNullValues(customerId);

  const config = {
    method: 'DELETE',
    url: `${URL_BASE}/delete/${customerId}`,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
