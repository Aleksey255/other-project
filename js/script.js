'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  todoData.forEach((item) => {
    localStorage.setItem('key', JSON.stringify(todoData));
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML =
      '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '	<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function () {
      const index = todoData.indexOf(item);
      todoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value !== '') {
    const newTodo = {
      text: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);
    headerInput.value = '';
    render();
  }
});

const data = localStorage.getItem('key');
const parsedData = JSON.parse(data);

if (parsedData !== null) {
  todoData = parsedData;
  render();
}
