import { rowData } from './data.js';
const body = document.querySelector('body');
const mainContainer = document.createElement('div');
mainContainer.id = 'main-container';
body.setAttribute('data-theme', 'color');
let currentTable;
let currentData = [];
const mainButtons = Object.keys(rowData);
const mainButtonsContainer = document.createElement('div');
mainButtonsContainer.id = 'main-buttons-container';
mainButtons.forEach((name) => {
	const mainButton = document.createElement('button');
	mainButton.classList.add('main-btn');
	mainButton.innerText = name.toUpperCase();
	mainButton.addEventListener('click', tableCreator);
	mainButtonsContainer.appendChild(mainButton);
});
mainContainer.appendChild(mainButtonsContainer);
body.appendChild(mainContainer);
function logoButton() {
	const background = document.createElement('button');
	background.id = 'logo-btn';
	mainContainer.appendChild(background);
	body.appendChild(mainContainer);
	background.addEventListener('click', deleteLogo);
}
logoButton();
function deleteLogo() {
	check(document.getElementById('logo-btn'));
}
function tableCreator() {
	currentTable = this.innerText.toLowerCase();
	check(document.querySelector('table'));
	const table = document.createElement('table');
	table.cellSpacing = '0';
	const headerTr = document.createElement('thead');
	const keys = Object.keys(rowData[currentTable][0]);
	const thTitle = [
		'ID',
		keys[0].toUpperCase(),
		keys[1].toUpperCase(),
		keys[2].toUpperCase(),
		'CREATED',
		'ACTION',
	];
	thTitle.forEach((title) => {
		const th = document.createElement('th');
		th.innerText = title;
		headerTr.appendChild(th);
	});
	table.appendChild(headerTr);
	const values = Object.values(rowData[currentTable]);
	const tbody = document.createElement('tbody');
	values.map((value, index) => {
		const innerValue = Object.values(value);
		const innerTr = document.createElement('tr');
		innerTr.classList.add('data');
		for (let i = 0; i < 6; i++) {
			const td = document.createElement('td');
			switch (i) {
				case 0:
					td.innerText = index + 1;
					td.classList = 'td-id';
					break;
				case 1:
					td.innerText = innerValue[0];
					td.classList = 'td-text';
					break;
				case 2:
					td.innerText = innerValue[1];
					break;
				case 3:
					td.innerText = innerValue[2];
					break;
				case 4:
					const created = rowData[currentTable][index].created;
					const newDate = new Date(created);
					const day = newDate.getDate();
					const month = newDate.getMonth() + 1;
					const year = newDate.getFullYear();
					td.innerText = `${day}-${month}-${year}`;
					break;
				case 5:
					const container = document.createElement('div');
					const btnDelete = document.createElement('button');
					btnDelete.classList.add('btn-delete');
					btnDelete.addEventListener('click', deleteFunction);
					const btnExpand = document.createElement('button');
					btnExpand.classList.add('btn-expand');
					btnExpand.addEventListener('click', expandFunction);
					const checkbox = document.createElement('input');
					checkbox.type = 'checkbox';
					checkbox.addEventListener('click', checkboxLogic);
					container.classList.add('table-buttons');
					container.appendChild(btnDelete);
					container.appendChild(btnExpand);
					container.appendChild(checkbox);
					td.appendChild(container);
					break;
			}
			innerTr.appendChild(td);
			tbody.appendChild(innerTr);
		}
		table.appendChild(tbody);
	});
	mainContainer.appendChild(table);
	body.appendChild(mainContainer);
	if (document.getElementsByClassName('now') != null) {
		const nowElements = document.getElementsByClassName('now');
		const nowElementsArray = Array.from(nowElements);
		nowElementsArray.forEach((element) => element.classList.remove('now'));
	}
	this.classList.add('now');
	data(document.getElementsByClassName('data'));
	deleteLogo();
	searchSectionCreator();
	paginationCreate();
	fullWork();
}
function deleteFunction() {
	this.parentNode.parentNode.parentNode.remove(this);
	data(document.getElementsByClassName('data'));
	fullWork();
}
function expandFunction() {
	const modalBody = document.createElement('div');
	modalBody.id = 'modal';
	const modalContainer = document.createElement('div');
	modalContainer.id = 'modal-container';
	const closeBtn = document.createElement('button');
	closeBtn.id = 'close-btn';
	closeBtn.innerText = 'close';
	closeBtn.addEventListener('click', closeModal);
	const modalTable = document.createElement('table');
	modalTable.id = 'modal-table';
	modalTable.cellSpacing = '0';
	const thead = document.createElement('thead');
	const thKey = document.createElement('th');
	thKey.innerText = 'KEY';
	const thValue = document.createElement('th');
	thValue.innerText = 'VALUE';
	modalContainer.appendChild(closeBtn);
	thead.appendChild(thKey);
	thead.appendChild(thValue);
	modalTable.appendChild(thead);
	const thisParent = this.parentNode.parentNode.parentNode;
	const thisNumber = thisParent.firstChild.innerText - 1;
	const modalKeys = Object.keys(rowData[currentTable][thisNumber]);
	const modalValues = Object.values(rowData[currentTable][thisNumber]);
	for (let i = 0; i < modalKeys.length; i++) {
		const tr = document.createElement('tr');
		for (let t = 0; t < 2; t++) {
			const td = document.createElement('td');
			if (t === 0) {
				td.innerText = modalKeys[i];
			} else {
				if (typeof modalValues[i] != 'object') {
					td.innerText = modalValues[i];
				} else {
					td.innerText = modalValues[i][0];
				}
			}
			tr.appendChild(td);
		}
		modalTable.appendChild(tr);
	}
	modalContainer.appendChild(modalTable);
	modalBody.appendChild(modalContainer);
	const themeBar = document.getElementById('theme-bar-container');
	const select = document.querySelector('select');
	if (select.disabled == true) {
		select.classList.add('blur');
	}
	body.insertBefore(modalBody, themeBar);
	fullWork();
}
function closeModal() {
	const select = document.querySelector('select');
	select.classList.remove('blur');
	this.parentNode.parentNode.remove(this);
}
function checkboxLogic() {
	const container = document.getElementById('section-container');
	const checkboxList = document.querySelectorAll('input[type=checkbox]');
	const arrayFromCheckboxList = Array.from(checkboxList);
	const removeBtn = document.createElement('button');
	removeBtn.id = 'remove-btn';
	removeBtn.innerText = 'Remove All';
	removeBtn.addEventListener('click', removeMultipleElements);
	const checkboxCheck = arrayFromCheckboxList.some(
		(checkbox) => checkbox.checked
	);
	const removeBtnCheck = document.getElementById('remove-btn');
	checkboxList.forEach((checkbox) => {
		if (checkboxCheck && removeBtnCheck === null) {
			container.appendChild(removeBtn);
		} else if (checkboxCheck && removeBtnCheck != null) {
		} else {
			removeBtnCheck.remove(removeBtnCheck);
		}
	});
}
function removeMultipleElements() {
	const checkboxList = document.querySelectorAll('input[type=checkbox]');
	checkboxList.forEach((checkbox) => {
		if (checkbox.checked) {
			checkbox.parentNode.parentNode.parentNode.remove(checkbox);
		}
	});
	this.remove(this);
	data(document.getElementsByClassName('data'));
	fullWork();
}
function searchSectionCreator() {
	check(document.getElementById('section-container'));
	const sectionContainer = document.createElement('div');
	sectionContainer.id = 'section-container';
	const idInput = document.createElement('input');
	idInput.id = 'id-search';
	idInput.type = 'number';
	idInput.addEventListener('input', idSearching);
	const idText = document.createElement('p');
	idText.innerText = 'Search by index';
	const textInput = document.createElement('input');
	textInput.id = 'text-search';
	textInput.type = 'text';
	textInput.addEventListener('input', textSearching);
	const textText = document.createElement('p');
	textText.innerText = 'Search by text';
	sectionContainer.appendChild(idText);
	sectionContainer.appendChild(idInput);
	sectionContainer.appendChild(textText);
	sectionContainer.appendChild(textInput);
	const table = document.querySelector('table');
	mainContainer.insertBefore(sectionContainer, table);
}
function paginationCreate() {
	check(document.getElementById('pagination-container'));
	const paginationContainer = document.createElement('div');
	paginationContainer.id = 'pagination-container';
	const backButton = document.createElement('button');
	backButton.id = 'back-button';
	backButton.addEventListener('click', backPage);
	const forwardButton = document.createElement('button');
	forwardButton.id = 'forward-button';
	forwardButton.addEventListener('click', forwardPage);
	const pageInput = document.createElement('input');
	pageInput.addEventListener('input', fullWork);
	pageInput.id = 'page-input';
	pageInput.type = 'number';
	pageInput.min = 1;
	pageInput.value = 1;
	const paginationText = document.createElement('p');
	paginationText.id = 'pagination-text';
	const select = document.createElement('select');
	select.addEventListener('click', fullWork);
	const option1 = document.createElement('option');
	option1.innerText = '10';
	option1.value = 10;
	const option2 = document.createElement('option');
	option2.innerText = '20';
	option2.value = 20;
	select.appendChild(option1);
	select.appendChild(option2);
	paginationContainer.appendChild(backButton);
	paginationContainer.appendChild(pageInput);
	paginationContainer.appendChild(paginationText);
	paginationContainer.appendChild(forwardButton);
	paginationContainer.appendChild(select);
	mainContainer.appendChild(paginationContainer);
	body.appendChild(mainContainer);
}
body.addEventListener('keyup', playVoice);
const vaderVoice = new Audio('../sounds/vader.mp3');
const yodaVoice = new Audio('../sounds/yoda.mp3');
let word = '';
function playVoice(letter) {
	word += letter.key;
	if (word.toLowerCase().includes('vader')) {
		vaderVoice.play();
		word = '';
	} else if (word.toLowerCase().includes('yoda')) {
		yodaVoice.play();
		word = '';
	}
}
function fullWork() {
	const data = document.getElementsByClassName('data');
	const dataArray = Array.from(data);
	const allData = currentData;
	const allDataArray = Array.from(allData);
	allDataArray.forEach((data) => data.classList.add('hidden'));
	const idInput = document.getElementById('id-search');
	idInput.placeholder = `1 from ${data.length}`;
	const textInput = document.getElementById('text-search');
	textInput.placeholder =
		currentTable === 'films' ? 'Search by title' : 'Search by name';
	const select = document.querySelector('select');
	const selectValue = parseInt(select.value);
	const pageInput = document.getElementById('page-input');
	const pageInputValue = parseInt(pageInput.value);
	const pageMath = Math.ceil(allDataArray.length / selectValue);
	pageInput.max = pageMath;
	for (let i = 0; i < selectValue; i++) {
		const o = i + (pageInputValue - 1) * selectValue;
		if (!allDataArray[o]) {
			break;
		}
		allDataArray[o].classList.remove('hidden');
	}
	if (pageInput.value > pageMath) {
		pageInput.value = pageMath;
		fullWork();
	}
	const paginationText = document.getElementById('pagination-text');
	paginationText.innerText = `z ${pageMath}`;
	const backButton = document.getElementById('back-button');
	const forwardButton = document.getElementById('forward-button');
	check(document.getElementById('no-elements'));
	if (allData.length === 0) {
		backButton.disabled = true;
		forwardButton.disabled = true;
		select.disabled = true;
		pageInput.disabled = true;
		pageInput.value = 1;
		paginationText.innerText = 'z 1';
		const table = document.querySelector('table');
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.id = 'no-elements';
		td.colSpan = 6;
		td.innerText = 'Brak elementów do wyświetlenia';
		tr.appendChild(td);
		table.appendChild(tr);
	} else if (pageInput.value == pageInput.max && pageInput.value == 1) {
		backButton.disabled = true;
		forwardButton.disabled = true;
		select.disabled = true;
		pageInput.disabled = true;
		pageInput.value = 1;
		paginationText.innerText = 'z 1';
	} else {
		backButton.disabled = pageInput.value == 1 ? true : false;
		forwardButton.disabled = pageInput.value == pageInput.max ? true : false;
		pageInput.disabled = false;
		select.disabled = false;
	}
}
function backPage() {
	const input = document.getElementById('page-input');
	const inputValue = parseInt(input.value);
	input.value = inputValue - 1;
	fullWork();
}
function forwardPage() {
	const input = document.getElementById('page-input');
	const inputValue = parseInt(input.value);
	input.value = inputValue + 1;
	fullWork();
}
function idSearching() {
	const textInput = document.getElementById('text-search');
	const data = document.getElementsByClassName('data');
	searchClear(textInput, data);
	const idInput = document.getElementById('id-search');
	if (idInput.value != '') {
		const idList = document.getElementsByClassName('td-id');
		const idListArray = Array.from(idList);
		idListArray.forEach((id) => id.parentNode.classList.add('hidden'));
		const idFiltered = idListArray.filter(
			(id) => id.innerText == idInput.value
		);
		idFiltered.forEach((id) => id.parentNode.classList.remove('hidden'));
		currentData = idFiltered;
		fullWork();
	} else {
		currentData = data;
		fullWork();
	}
}
function textSearching() {
	const idInput = document.getElementById('id-search');
	const data = document.getElementsByClassName('data');
	searchClear(idInput, data);
	const textInput = document.getElementById('text-search');
	const textList = document.getElementsByClassName('td-text');
	const textListArray = Array.from(textList);
	textListArray.forEach((text) => {
		text.parentNode.classList.add('hidden');
	});
	if (textInput.value != '') {
		const textFiltered = textListArray.filter((text) =>
			text.innerText.toLowerCase().includes(textInput.value.toLowerCase())
		);
		const textFilteredMap = textFiltered.map((text) => text.parentNode);
		currentData = textFilteredMap;
		fullWork();
	} else {
		currentData = data;
		fullWork();
	}
}
function themeBar() {
	const background = document.createElement('div');
	background.id = 'theme-bar-container';
	background.maxWidth = '100%';
	const themeContent = document.createElement('div');
	themeContent.id = 'theme-bar';
	const pharagraph = document.createElement('p');
	pharagraph.innerText = 'Write Vader or Yoda to hear their voices';
	const buttonContainer = document.createElement('div');
	buttonContainer.id = 'theme-btn-container';
	const colorBtn = document.createElement('button');
	colorBtn.id = 'btn-color';
	colorBtn.innerText = 'Colorfull theme';
	colorBtn.addEventListener('click', colorfullTheme);
	const darkBtn = document.createElement('button');
	darkBtn.id = 'btn-dark';
	darkBtn.innerText = 'Dark theme';
	darkBtn.addEventListener('click', darkTheme);
	buttonContainer.appendChild(colorBtn);
	buttonContainer.appendChild(darkBtn);
	themeContent.appendChild(pharagraph);
	themeContent.appendChild(buttonContainer);
	background.appendChild(themeContent);
	body.insertBefore(background, mainContainer);
}
themeBar();
function colorfullTheme() {
	body.setAttribute('data-theme', 'color');
}
function darkTheme() {
	body.setAttribute('data-theme', 'dark');
}
function check(element) {
	if (element != null) {
		element.remove(element);
	}
}
function data(newData) {
	currentData = newData;
}
function searchClear(input, data) {
	if (input.value != '') {
		input.value = '';
		currentData = data;
		fullWork();
	}
}
