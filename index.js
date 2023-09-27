const navBtns = [...document.querySelectorAll(".nav-btn")];
const formCards = [...document.querySelectorAll(".form-card")];
const submissionCard = formCards.pop();

const subType = document.querySelector("#sub-type");
const subDisplay = [...document.querySelectorAll("#sub-display p")];
const subPriceVals = [...document.querySelectorAll(".sub-price-val")];
const subPriceDels = [...document.querySelectorAll(".sub-price-del")];
const yearlySubtext = [...document.querySelectorAll(".yearly-subtext")];

const footer = document.querySelector("#footer");
const nextStepBtn = document.querySelector("#footer div button");
const prevStepBtn = document.querySelector("#footer div p");

let selectedNav = 0;
let formIsValid = true;
let submitted = false;
let subYearly = false;

const updateSubscription = () => {
    subYearly = !subYearly;
    subDisplay.forEach((sub) => sub.classList.toggle("selected-sub"));
    subPriceVals.forEach(
        (price) =>
            (price.innerText = parseInt(
                subYearly ? price.innerText * 10 : price.innerText / 10
            ))
    );
    subPriceDels.forEach((del) => (del.innerText = subYearly ? "yr" : "mo"));
    yearlySubtext.forEach((subtext) =>
        subYearly
            ? (subtext.innerText = "2 months free")
            : (subtext.innerText = "")
    );
};

const updateNextStepBtn = (target) => {
    if (selectedNav === formCards.length - 1 && target < selectedNav) {
        nextStepBtn.innerText = "Next Step";
    } else if (target === formCards.length - 1) {
        nextStepBtn.innerText = "Confirm";
    }
};

const updateSelectedNav = (target) => {
    if (
        selectedNav === formCards.length - 1 &&
        selectedNav < target &&
        formIsValid
    ) {
        submitted = true;
        setTimeout(() => {
            formCards[selectedNav].style.display = "none";
            footer.style.display = "none";
            submissionCard.style.display = "flex";
        }, 500);
    } else if (
        submitted === false &&
        ((target < selectedNav && target >= 0) ||
            (target > selectedNav && target < formCards.length))
    ) {
        updateNextStepBtn(target);
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
subType.addEventListener("click", () => updateSubscription());
nextStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav + 1));
prevStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav - 1));
