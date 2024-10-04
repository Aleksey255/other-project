const greeting = document.querySelector('.greeting');
const today = document.querySelector('.today');
const time = document.querySelector('.time');
const newYear = document.querySelector('.new-year');

const daysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const getGreeting = () => {
  const dateNow = new Date();
  const dayOfWeek = dateNow.getDate();
  const dateStop = new Date('1 january 2025').getTime();
  const newYearRemaining = (dateStop - dateNow) / 1000;
  let days = Math.floor(newYearRemaining / 60 / 60 / 24);

  if (dateNow.getHours() > 6 && dateNow.getHours() < 12) {
    greeting.textContent = 'Доброе утро';
  } else if (dateNow.getHours() > 12 && dateNow.getHours() < 18) {
    greeting.textContent = 'Добрый день';
  } else if (dateNow.getHours() > 18 && dateNow.getHours() < 24) {
    greeting.textContent = 'Добрый вечер';
  } else if (dateNow.getHours() > 24 && dateNow.getHours() < 6) {
    greeting.textContent = 'Доброй ночи';
  }

  if (
    (days === 0 && days >= 5 && days <= 20) ||
    (days >= 25 && days <= 30) ||
    (days >= 35 && days <= 40) ||
    (days >= 45 && days <= 50) ||
    (days >= 55 && days <= 60) ||
    (days >= 65 && days <= 70) ||
    (days >= 75 && days <= 80) ||
    (days >= 85 && days <= 90)
  ) {
    newYear.textContent = `До нового года осталось ${days} дней`;
  } else if (
    days === 1 &&
    days === 21 &&
    days === 31 &&
    days === 41 &&
    days === 51 &&
    days === 61 &&
    days === 71 &&
    days === 81
  ) {
    newYear.textContent = `До нового года остался ${days} день`;
  } else if (
    (days >= 2 && days <= 4) ||
    (days >= 22 && days <= 24) ||
    (days >= 32 && days <= 34) ||
    (days >= 42 && days <= 44) ||
    (days >= 52 && days <= 54) ||
    (days >= 62 && days <= 64) ||
    (days >= 72 && days <= 74) ||
    (days >= 82 && days <= 84)
  ) {
    newYear.textContent = `До нового года осталось ${days} дня`;
  }
  
  today.textContent = `Сегодня: ${daysOfWeek[dayOfWeek]}`;
  time.textContent = `Текущее время: ${dateNow.toLocaleTimeString('en')}`;
};

setInterval(getGreeting, 1000);
