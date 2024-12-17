import { render } from './render';

export class UserService {
  async fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sendData(url, method = 'GET', data = null, headers = {}) {
    if (data && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  errorMessage() {
    const table = document.querySelector('table');
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Произошла ошибка, данных нет!';
    errorMessage.style.color = 'red';
    table.append(errorMessage);
  }

  async getUsers() {
    try {
      const users = await this.fetchData('http://localhost:4545/users');
      return render(users);
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async addUser(user) {
    try {
      return await this.sendData('http://localhost:4545/users', 'POST', user);
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async removeUser(id) {
    try {
      return await this.sendData(`http://localhost:4545/users/${id}`, 'DELETE');
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async changeUser(id, data) {
    try {
      return await this.sendData(
        `http://localhost:4455/users/${id}`,
        'PATCH',
        data
      );
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async getUser(id) {
    try {
      return await this.fetchData(`http://localhost:4545/users/${id}`);
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async editUsers(id, user) {
    try {
      return await this.sendData(
        `http://localhost:4545/users/${id}`,
        'PUT',
        user
      );
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
      this.errorMessage();
    }
  }

  async filterUsers(filterOptions) {
    try {
      return await this.fetchData(
        `http://localhost:4545/users?${filterOptions}=true`
      );
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
    }
  }

  async getSortUsers(sortOptions) {
    try {
      return await this.fetchData(
        `http://localhost:4545/users?_sort=${sortOptions.name}&_order=${sortOptions.value}`
      );
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
    }
  }

  async getSearchUsers(str) {
    try {
      return await this.fetchData(
        `http://localhost:4545/users?name_like=${str}`
      );
    } catch (error) {
      console.error('Произошла ошибка, данных нет!', error.message);
    }
  }
}
