'use strict';

const nameInput = document.getElementById('name');
const positionSelect = document.getElementById('position');
const surnameInput = document.getElementById('surname');
const ageInput = document.getElementById('age');
const categoryInput = document.getElementById('category');
const experienceInput = document.getElementById('experience');
const childrenCheck = document.getElementById('checkbox-1');
const licensesCheck = document.getElementById('checkbox-2');
const saveBtn = document.querySelector('.save');
const tbody = document.querySelector('tbody');
class Worker {
  #dataWorker;
  constructor(name, surName, age, isChildren, dataWorker = []) {
    this.name = name;
    this.surName = surName;
    this.age = age;
    this.isChildren = isChildren;
    this.#dataWorker = dataWorker;
  }
  get dataWorker() {
    return this.#dataWorker;
  }
  set dataWorker(data) {
    this.dataWorker.push(data);
  }
  init() {
    saveBtn.addEventListener('click', () => {
      this.start();
    });
    this.displayWorkers();
  }
  start() {
    if (this.checkfields()) {
      const selectedOptions =
        positionSelect.options[positionSelect.selectedIndex];
      if (selectedOptions.value === 'driver') {
        const driver = this.addDriver();
        this.dataWorker = driver;
        this.addWorker(driver);
        this.clearInputs();
        console.log(this.#dataWorker);
      } else if (selectedOptions.value === 'mechanic') {
        const mechanic = this.addMechanic();
        this.dataWorker = mechanic;
        this.addWorker(mechanic);
        this.clearInputs();
      }
    }
  }
  displayWorkers() {
    const storedData = localStorage.getItem('workers');
    if (storedData) {
      const workers = JSON.parse(storedData);
      workers.forEach((worker) => {
        const row = document.createElement('tr');
        const del = document.createElement('button');
        del.textContent = 'Delete';
        Object.values(worker).forEach((value) => {
          const cell = document.createElement('td');
          if (value === true) {
            cell.textContent = 'Yes';
          } else if (value === false) {
            cell.textContent = 'No';
          } else cell.textContent = value;
          row.append(cell);
        });
        tbody.append(row);
        row.append(del);

        del.addEventListener('click', () => {
          row.remove();
        });
      });
    }
  }
  addWorker(data) {
    const storedData = localStorage.getItem('workers');
    if (storedData) {
      const workers = JSON.parse(storedData);
      workers.push(data);
      localStorage.setItem('workers', JSON.stringify(workers));
    } else {
      localStorage.setItem('workers', JSON.stringify([data]));
    }
    const row = document.createElement('tr');
    const del = document.createElement('button');
    del.textContent = 'Delete';
    Object.values(data).forEach((value) => {
      const cell = document.createElement('td');
      if (value === true) {
        cell.textContent = 'Yes';
      } else if (value === false) {
        cell.textContent = 'No';
      } else cell.textContent = value;
      row.append(cell);
    });
    tbody.append(row);
    row.append(del);

    const workerToRemove = JSON.parse(JSON.stringify(data));
    del.addEventListener('click', () => {
      this.removeWorker(workerToRemove);
      row.remove();
    });
  }
  removeWorker(worker) {
    const storedData = localStorage.getItem('workers');
    if (storedData) {
      const workers = JSON.parse(storedData);
      const index = workers.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(worker)
      );
      if (index !== -1) {
        workers.splice(index, 1);
        localStorage.setItem('workers', JSON.stringify(workers));
      }
    }
  }
  addDriver() {
    const driver = new Driver(
      nameInput.value,
      surnameInput.value,
      ageInput.value,
      categoryInput.value,
      experienceInput.value,
      childrenCheck.checked,
      licensesCheck.checked
    );
    return driver;
  }
  addMechanic() {
    const mechanic = new Mechanic(
      nameInput.value,
      surnameInput.value,
      ageInput.value,
      categoryInput.value,
      experienceInput.value,
      childrenCheck.checked,
      licensesCheck.checked
    );
    return mechanic;
  }
  checkfields() {
    let error = false;

    if (
      positionSelect.selectedIndex === 0 ||
      nameInput.value === '' ||
      surnameInput.value === '' ||
      ageInput.value === '' ||
      categoryInput.value === '' ||
      experienceInput.value === ''
    ) {
      error = true;
    }
    return !error;
  }
  clearInputs() {
    nameInput.value = '';
    surnameInput.value = '';
    ageInput.value = '';
    categoryInput.value = '';
    experienceInput.value = '';
    positionSelect.selectedIndex = 0;
    childrenCheck.checked = false;
    licensesCheck.checked = false;
  }
}

class Driver extends Worker {
  constructor(
    name,
    surName,
    age,
    category,
    experience,
    isChildren,
    isLicenses,
    position = 'Driver'
  ) {
    super(name, surName, age, isChildren);
    this.isLicenses = isLicenses;
    this.position = position;
    this.category = category;
    this.experience = experience;
  }
}
class Mechanic extends Worker {
  constructor(
    name,
    surName,
    age,
    category,
    experience,
    isChildren,
    isLicenses,
    position = 'Mechanic'
  ) {
    super(name, surName, age, isChildren);
    this.isLicenses = isLicenses;
    this.position = position;
    this.category = category;
    this.experience = experience;
  }
}

const worker = new Worker();
worker.init();
