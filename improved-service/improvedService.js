const nameInput = document.querySelector('.name'); //элемент ввода имени
const linkInput = document.querySelector('.link'); //элемент ссылки на фото
const messageInput = document.querySelector('.message'); //элемент ввода сообщения
const showNameRadioNo = document.querySelector('#radio-no');//радио-кнопка нет для проверки
const button = document.querySelector('.form-button');//кнопка отправить 
const resultName = document.querySelector('.result-name');//элемент результата для имени
const resultImage = document.querySelector('.result-image');//элемент результата для фото
const resultMessage = document.querySelector('.result-message');//элемент результата для сообщения
const resultDate = document.querySelector('.result-date');//элемент для показа текущей даты

function checkSpam(str) { //цензура слова
    return str.replace(/viagra|xxx/gi, '***');
}

function formatName(name) { //форматирование имени
    let trimmedName = name.trim();//убираем пробелы у введённого аргумента
    let lowerName = trimmedName.toLowerCase().slice(1);//берём имя со 2 буквы и делаем его строчным
    let upperName = trimmedName.toUpperCase().slice(0, 1);//берём 1 букву имени и делаем заглавной
    let fullName = upperName + lowerName;//соединяем заглавную 1 букву и остальное имя строчными
    return fullName;//выводим имя
}

button.addEventListener('click', function(event) {
    event.preventDefault();//предотвращает отправку формы

    const name = nameInput.value; //получаем значение имени, которое ввёл польхователь
    const link = linkInput.value; //получаем значение картинки, которое ввёл польхователь(ссылка)
    const message = messageInput.value; //получаем значение сообщения, которое ввёл польхователь
    const showName = showNameRadioNo.checked; // Проверяем состояние радио-кнопок

    if (showName) { //если выбрано no, то имя не отображается
        resultName.textContent = '';
    } else if (!name) { //если имя не введено(значение пустое), то отображается username
        resultName.textContent = 'username';
    } else { //если выбрано Yes и введено имя, то всё работает нормально
        const formattedName = formatName(name);//передаём значение, введённое пользователем, как аргумент в функцию formatName
        resultName.textContent = formattedName;
    }
    
    const cleanMessage = checkSpam(message);//передаём значение сообщения пользователя как аргумент в функцию checkSpam для цензуры
    resultMessage.textContent = cleanMessage;//выводим результат

    const now = new Date() //создаём объект текущей даты
    resultDate.textContent = now.toLocaleString('en-GB', {//определяем параментры вывода даты и ВЫВОДИМ результат
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Samara',
        timeZoneName: 'short'
    }).replace(/GMT[+-]\d{4}.*$/, ''); // убираем надпись в скобках, которая выводит название часового пояса в скобках

    if (link) { //если ссылка на аватар введена
        const img = document.createElement('img');//создаётся элемент картинки
        img.src = link; //источник картинки - ссылка, которую предоставил пользователь
        img.alt = 'Avatar';
        resultImage.innerHTML = '';//очистка содержимого элемента resultImage
        resultImage.appendChild(img);//добавляем элемент картинки в div resultImage
    } else { //если ссылка на аватар не введена, то появится стандартная аватарка
        const imgRandom = document.createElement('img');//создаётся элемент картинки
        const images = [ 
            './avatar-images/avatar-1.svg',
            './avatar-images/avatar-2.svg',
            './avatar-images/avatar-3.svg',
            './avatar-images/avatar-4.svg',
            './avatar-images/avatar-5.svg',
            './avatar-images/avatar-6.svg'
        ];//массив фото
        const randomIndex = Math.ceil(Math.random() * images.length);//случайный индекс(число) для массива изображений
        imgRandom.src = images[randomIndex];//источник картинки определяется случайным индексом 
        imgRandom.alt = 'Random Avatar';
        resultImage.innerHTML = '';;
        resultImage.appendChild(imgRandom);//добавляем элемент картинки в div resultImage
    }

    nameInput.value = '';
    linkInput.value = '';
    messageInput.value = '';
});