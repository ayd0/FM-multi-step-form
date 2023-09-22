const navBtns = [...document.querySelector("#nav").children];
let selectedNav = 0;

const setSelectedNav = (e) => {
    navBtns[selectedNav].classList.remove('selected-nav');
    selectedNav = parseInt(e.target.innerText) - 1;
    navBtns[selectedNav].classList.add('selected-nav');
}

navBtns.forEach(navBtn => navBtn.addEventListener('click', (e) => setSelectedNav(e)));