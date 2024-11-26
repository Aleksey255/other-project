const container = document.querySelector('.container');
const carsSelect = document.createElement('select');
const carsOption = document.createElement('option');
const carsItem = document.createElement('div');

carsOption.innerHTML = 'Выберите тачку';

container.append(carsSelect);
container.append(carsItem);
carsSelect.append(carsOption);

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const renderCarsOption = (cars) => {
  cars.cars.forEach((car) => {
    const carOption = document.createElement('option');

    carOption.innerHTML = car.brand;

    carsSelect.append(carOption);
  });
};

const renderCars = (cars) => {
  const carName = document.createElement('p');

  carName.innerHTML = `<b>Тачка:</b> ${cars.brand} ${cars.model}`;

  const carPrice = document.createElement('p');

  carPrice.innerHTML = `<b>Цена:</b> ${cars.price} $`;

  carsItem.append(carName, carPrice);
};

const removeCars = () => {
  carsItem.textContent = '';
};

getData('cars.json').then((data) => {
  renderCarsOption(data);

  carsSelect.addEventListener('change', (e) => {
    const selectedCar = e.target.value;

    if (selectedCar === 'bmw') {
      removeCars();
      renderCars(data.cars[0]);
    } else if (selectedCar === 'volvo') {
      removeCars();
      renderCars(data.cars[1]);
    }
  });
});
