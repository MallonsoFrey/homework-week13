const birthdayInput = document.querySelector('#days-to-birthday') //получаем элемент поля ввода
const button = document.querySelector('#button') //получаем кнопку "посчитать"
let output = document.querySelector('#output') //получаем элемент поля вывода результата
let errorMessage = document.querySelector('#error-message') //получаем элемент поля вывода сообщение об ошибке

button.addEventListener('click', function() { //когда нажимаем на кнопку, то:
    const currentDate = new Date() //создаем текущую дату
    const birthdayValue = birthdayInput.value//берём значение поля ввода даты, выбранное пользователем 
    //Если пользователь не выбрал дату, значение birthdayInput.value будет пустой строкой 
    
    if (!birthdayValue) { //!birthdayValue значит, что birthdayValue - пустая строка(в JS пустая строка('') (true)
        errorMessage.style.display = 'block' //сообщение об ошибке отображается
    } else {//если дата выбрана корректно
        const birthday = new Date(birthdayValue) //проеобразуем строку из поля ввода в объект даты
        const daysToBirthday = Math.round((birthday - currentDate)/(24*3600*1000))//преобразование из миллисекунд в дни
        output.textContent = `До дня рождения ${daysToBirthday} ${getDaySuffix(daysToBirthday)}`//отображаем в поле вывода с правильным падежом через функцию, используя аргумент daysToBirthday
    }
})

//Скрываем сообщение об ошибке, когда вводим дату
//Событие input срабатывает каждый раз, когда пользователь что-то вводит или изменяет в поле ввода
birthdayInput.addEventListener('input', function() {
    const birthdayValue = birthdayInput.value //определяем переменную во второй раз, чтобы использовать в этой функции
    errorMessage.style.display = birthdayValue ? 'none' : 'block'; //если значение непустое - блок не отображается, если пустое - отображается
});

//функция принимает число days и возвращает правильное склонение слова "день"
function getDaySuffix(days) {
    let lastDigit = days % 10; //например, lastDigit = 25 % 10 будет 5
    let lastTwoDigits = days % 100; //например, lastTwoDigits = 111 % 100 будет 11


    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) { //в русском языке числительные от 11 до 19 имеют особое склонение, не зависящее от последней цифры
        return "дней";
    }

//Если число не попадает в диапазон от 11 до 19, функция переходит к switch, который проверяет значение последней цифры (lastDigit)
    switch (lastDigit) {
        case 1:
            return "день";
        case 2:
        case 3:
        case 4:
            return "дня";
        default:
            return "дней";
    }
}
