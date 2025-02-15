document.getElementById('registerButton').addEventListener('click', function() {
    // Отримуємо значення полів введення
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Перевіряємо, чи заповнені всі поля
    if (email && password) {
        // Перевірка на наявність уже зареєстрованої електронної пошти
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Перевірка, чи вже є користувач з таким емейлом
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('Цей email вже зареєстрований!');
            return;
        }

        // Додаємо нового користувача до списку
        users.push({ email, password });

        // Зберігаємо користувачів у localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Ви успішно зареєстровані!');

        // Перехід на головну сторінку після реєстрації
        window.location.href = 'index.html'; // Перехід на головну сторінку
    } else {
        alert('Будь ласка, заповніть всі поля!');
    }
});

// Функція для закриття модального вікна
document.getElementById('closeRegister').addEventListener('click', function() {
    document.getElementById('registerModal').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Отримуємо дані про зареєстрованих користувачів з localStorage
    let registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Перевіряємо, чи є користувач із таким email
    let user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Якщо користувач знайдений, то вхід успішний
        alert("Вхід успішний!");
        // Перенаправлення на домашню сторінку (або іншу сторінку)
        window.location.href = "homepage.html";
    } else {
        // Якщо користувача немає, то показуємо повідомлення про необхідність реєстрації
        alert("Користувача з таким email не знайдено. Будь ласка, зареєструйтесь.");
    }
});

document.getElementById('registerButton').addEventListener('click', function() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('Цей email вже зареєстрований!');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', email); // Зберігаємо email увійшовшого користувача

            alert('Ви успішно зареєстровані!');
            window.location.href = 'index.html';
        }
    } else {
        alert('Будь ласка, заповніть всі поля!');
    }
});

document.getElementById('closeRegister').addEventListener('click', function() {
    console.log('Закриваємо модальне вікно');
    document.getElementById('registerModal').style.display = 'none'; // Перевірка цього рядка

    console.log('Перенаправлення на index.html');
    window.location.href = '/index.html'; // Перехід на головну сторінку
});
