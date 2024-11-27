const filterByType = (type, ...values) => values.filter(value => typeof value === type), //создаем функцию которая принимает тим и массив значений, потом идет перебор массива значений и создается новый массив со значениями которые равняются типу


	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создание массива в котором содержатся все блоки див с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none');//перебор всех блоков и скрытие их
	}, // эта функция сначала добавляет в массив все дивы с классом dialog__response-block потом перебирает этот массив и навешивает инлайн стиль который скрывает блок

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //получение данных
		hideAllResponseBlocks();// вызвов функции скрытия
		document.querySelector(blockSelector).style.display = 'block';//показ блока с селектором blockSelector
		if (spanSelector) { //проверка на наличие селектора spanSelector
			document.querySelector(spanSelector).textContent = msgText;//если селектор есть показывается в этом блоке msgText этот текст
		}
	}, // эта функция принимает некий блок селектор, текст и спан селектор, потом вызывается функция скрытия блока данных выбирается определенный блок и показывается определенный текст

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //здесь показывает текст ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//здесь показывает текст успешной работы

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//здесь показывает текст отсутствия результатов

	tryFilterByType = (type, values) => {//получение данных
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");// определение постоянной переменной которая разделяет элементы массива запятыми
			const alertMsg = (valuesArray.length) ? //проверка на массив 
				`Данные с типом ${type}: ${valuesArray}` : //если тру то показыавет это сообщение
				`Отсутствуют данные типа ${type}`;//если фолс то это сообщение
			showResults(alertMsg);//вывод сообщения на экран
		} catch (e) {
			showError(`Ошибка: ${e}`); //обработка ошибок
		}
	};// эта функция обрабатывает ошибки и показывает определенный текст

const filterButton = document.querySelector('#filter-btn'); //выбор элемента с id filter-btn

filterButton.addEventListener('click', e => { //навешивание обработчика событий клик
	const typeInput = document.querySelector('#type'); //выбор элемента с id type 
	const dataInput = document.querySelector('#data'); //выбор элемента с id data
	if (dataInput.value === '') { //проверка на пустую строку
		dataInput.setCustomValidity('Поле не должно быть пустым!');//если тру то это сообщение
		showNoResults();// показ сообщения не результатов
	} else { //если фолс
		dataInput.setCustomValidity('');// проверка на валидность
		e.preventDefault();// отмена поведения по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызов функции с данными у которых убрали пробелы с переди и сзади
	}
});// эта функция навешивает обработчик собития клик на кнопку т проверяет валидность данных

