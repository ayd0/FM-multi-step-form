const navBtns = [...document.querySelectorAll(".nav-btn")];
let selectedNav = 0;
const formCards = document.querySelectorAll('.form-card');

const setSelectedNav = (e) => {
    navBtns[selectedNav].classList.remove('selected-nav');
    formCards[selectedNav].style.display = 'none';
    selectedNav = parseInt(e.target.innerText) - 1;

    navBtns[selectedNav].classList.add('selected-nav');
    formCards[selectedNav].style.display = 'block';
}

navBtns.forEach(navBtn => navBtn.addEventListener('click', (e) => setSelectedNav(e)));