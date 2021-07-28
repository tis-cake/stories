import { onErrorShowModal } from '../utils/error';
import { adaptUsersToClient } from './adapter';
import { getMockData } from '../mock/data';

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

const URL = 'https://api.github.com/users';

class Api {
  static loadUsers() {
    return fetch(URL)
      .then(Api.checkStatus)
      .then(Api.toJSON)
      .then(Api.adaptDataToClient)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
      const { status, statusText } = response;
      onErrorShowModal(status, statusText);
      throw new Error(`${status}: ${statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static adaptDataToClient(response) {
    return adaptUsersToClient(response);
  }

  static catchError(err) {
    throw err;
  }

  getData() {
    return Api.loadUsers()
      .then((users) => getMockData(users));
  }
}

export { Api };
