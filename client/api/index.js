import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

export default class Api {
  constructor(options = {}) {
    this.client = axios.create();
    this.token = options.token || null;

    this.client.interceptors.response.use(
      data => {
        return data;
      },
      async error => {
        const { status } = error.response;
        if (status === 404 || status === 409 || status === 401) {
          const data = await Promise.resolve(error.response);

          return data;
        }
      }
    );
  }

  async registerLoginUser({ userName, password }, method) {
    const { data } = await this.client.post(`${BASE_URL}auth/${method}`, {
      userName: userName.trim(),
      password: password.trim()
    });

    return data;
  }

  async fetchUser() {
    const { data } = await this.client(`${BASE_URL}user`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return data;
  }

  async getEvents() {
    const { data } = await this.client(`${BASE_URL}events`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return data;
  }

  async addEvent(event) {
    const { data } = await this.client.post(
      `${BASE_URL}event/save`,
      { ...event },
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );

    return data;
  }

  async deleteEvent(id) {
    const { data } = await this.client.post(
      `${BASE_URL}event/delete`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );

    return data;
  }
}
