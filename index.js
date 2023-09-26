const navBtns = [...document.querySelectorAll(".nav-btn")];
let selectedNav = 0;
const formCards = document.querySelectorAll(".form-card");
const nextStepBtn = document.querySelector("#footer div button");
const prevStepBtn = document.querySelector("#footer div p");

const updateSelectedNav = (target) => {
    if (
        (target < selectedNav && target >= 0) ||
        (target > selectedNav && target < formCards.length)
    ) {
        navBtns[selectedNav].classList.remove("selected-nav");
        formCards[selectedNav].style.display = "none";
        selectedNav = target;

        navBtns[selectedNav].classList.add("selected-nav");
        formCards[selectedNav].style.display = "block";
    }
};

navBtns.forEach((navBtn) =>
    navBtn.addEventListener("click", (e) =>
        updateSelectedNav(parseInt(e.target.innerText) - 1)
    )
);
nextStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav + 1));
prevStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav - 1));
