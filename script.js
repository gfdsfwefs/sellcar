// Управління бічним меню
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mainContent.classList.remove('sidebar-active');
});

// Закриття меню при кліку поза ним
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
    }
});

// Кнопки "Улюблене"
const favoriteButtons = document.querySelectorAll('.favorite-btn');
favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.toggle('active');
        button.style.color = button.classList.contains('active') ? 'red' : 'black';
    });
});

// Фільтрація автомобілів
const filterSelects = document.querySelectorAll('.filter-select');
const carCards = document.querySelectorAll('.car-card');

filterSelects.forEach(select => {
    select.addEventListener('change', filterCars);
});

function filterCars() {
    const selectedBrand = document.querySelector('select:nth-child(1)').value;
    const selectedYear = document.querySelector('select:nth-child(2)').value;
    const selectedPrice = document.querySelector('select:nth-child(3)').value;

    carCards.forEach(card => {
        const brand = card.getAttribute('data-brand');
        const year = card.getAttribute('data-year');
        const price = card.getAttribute('data-price');

        const brandMatch = !selectedBrand || brand === selectedBrand;
        const yearMatch = !selectedYear || year === selectedYear;
        const priceMatch = !selectedPrice || price === selectedPrice;

        if (brandMatch && yearMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Анімація появи карток
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

carCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});


// Функція відкриття меню
function openMenu() {
    sidebar.classList.add('active');
    mainContent.classList.add('sidebar-active');
    menuToggle.classList.add('hidden');
}

// Функція закриття меню
function closeMenu() {
    sidebar.classList.remove('active');
    mainContent.classList.remove('sidebar-active');
    menuToggle.classList.remove('hidden');
}

menuToggle.addEventListener('click', openMenu);
closeSidebar.addEventListener('click', closeMenu);

// Закриття меню при кліку поза ним
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        closeMenu();
    }
});

// Додавання активного стану для поточного пункту меню
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});
// Покращена функція пошуку з фільтрацією за різними параметрами
function searchCars() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const carCards = document.getElementsByClassName("car-card");
    
    Array.from(carCards).forEach(card => {
        const title = card.getElementsByTagName("h2")[0].innerText.toLowerCase();
        const description = card.getElementsByTagName("p")[0].innerText.toLowerCase();
        
        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Перемикач теми
const themeToggle = document.getElementById('themeToggle');
let поточнаТема = localStorage.getItem('theme') || 'light';

function встановитиТему(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.title = theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему';
}

встановитиТему(поточнаТема);

themeToggle.addEventListener('click', () => {
    поточнаТема = поточнаТема === 'light' ? 'dark' : 'light';
    встановитиТему(поточнаТема);
});

// Покращений пошук
function виконатиПошук() {
    const пошуковийЗапит = document.getElementById('carSearchInput').value.toLowerCase();
    const карткиАвто = document.querySelectorAll('.car-card');
    
    карткиАвто.forEach(картка => {
        const назва = картка.querySelector('h2').textContent.toLowerCase();
        const опис = картка.querySelector('p').textContent.toLowerCase();
        
        if (назва.includes(пошуковийЗапит) || опис.includes(пошуковийЗапит)) {
            картка.style.display = 'block';
            // Додаємо анімацію при появі карток після пошуку
            картка.style.animation = 'появаКартки 0.5s ease-out';
        } else {
            картка.style.display = 'none';
        }
    });
}

// Додаємо слухач подій для поля пошуку
document.getElementById('carSearchInput').addEventListener('input', виконатиПошук);
function checkUserStatus() {
    // Перевіряємо, чи є користувач в локальному сховищенні
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser'); // Отримуємо email користувача, якщо він увійшов

    if (loggedInUser) {
        // Якщо користувач увійшов, приховуємо кнопки для реєстрації та входу
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
    } else {
        // Якщо користувач не увійшов, показуємо кнопки для реєстрації та входу
        document.getElementById('authButtons').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
    }
}

// Функція для виходу
function logout() {
    // Очищаємо інформацію про увійшовшого користувача з localStorage
    localStorage.removeItem('loggedInUser');
    
    // Переходимо на головну сторінку або сторінку входу
    window.location.href = 'index.html';
}

// Викликаємо перевірку статусу користувача при завантаженні сторінки
window.onload = checkUserStatus;

document.getElementById('closeRegister').addEventListener('click', function() {
    console.log('Закриваємо модальне вікно');
    document.getElementById('registerModal').style.display = 'none'; // Перевірка цього рядка

    console.log('Перенаправлення на index.html');
    window.location.href = '/index.html'; // Перехід на головну сторінку
});
