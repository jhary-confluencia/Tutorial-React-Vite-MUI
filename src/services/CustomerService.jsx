import axios from 'axios';
import QueryString from 'qs';
import * as utilService from '../ServiceTools';

const URL_BASE = 'localhost:8080/api';

export async function getCustomers(name, email, create_date) {
  const data = new FormData();

  if (name) {
    data.append('name', name);
  }
  if (email) {
    data.append('email', email);
  }
  if (create_date) {
    data.append('create_date', create_date);
  }

  const config = {
    method: 'POST',
    url: `${URL_BASE}/user/list`,
    data: data,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
