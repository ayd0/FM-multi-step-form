const navBtns = [...document.querySelectorAll(".nav-btn")];
const formCards = [...document.querySelectorAll(".form-card")];
const submissionCard = formCards.pop();

// plan card
const subType = document.querySelector("#sub-type");
const subDisplay = [...document.querySelectorAll("#sub-display p")];
const subPriceVals = [...document.querySelectorAll(".sub-price-val")];
const subPriceDels = [...document.querySelectorAll(".sub-price-del")];
const yearlySubtext = [...document.querySelectorAll(".yearly-subtext")];

// addon card
const addonBtns = document.querySelectorAll(".addon-btn input");
const addonPrices = document.querySelectorAll(".addon-price");
const addonState = [
    {
        name: "Online service",
        subtext: "Access to multiplayer games",
        priceMo: "+$1/mo",
        priceYr: "+$10/yr",
    },
    {
        name: "Larger storage",
        subtext: "Extra 1TB of cloud save",
        priceMo: "+$2/mo",
        priceYr: "+20/yr",
    },
    {
        name: "Customizable profile",
        subtext: "Custom theme on your profile",
        priceMo: "+$2/mo",
        priceYr: "+20/yr",
    },
];

// footer
const footer = document.querySelector("#footer");
const nextStepBtn = document.querySelector("#footer div button");
const prevStepBtn = document.querySelector("#footer div p");

// local state
let selectedNav = 0;
let formIsValid = true;
let submitted = false;
let subYearly = false;
let totalCost = 0;

const getAddonCostVal = (state, override=false) => {
    let yearly = subYearly;
    if (override) yearly = !subYearly;

    return parseInt(
        state[yearly ? "priceYr" : "priceMo"].match(/\d+/g).join("")
    );
}

const setAddonCost = (e, i) => {
    let state = addonState[i];
    e.target.checked
        ? (totalCost += getAddonCostVal(state))
        : (totalCost -= getAddonCostVal(state));
    console.log(totalCost);
};

const updateAddonSubscription = () => {
    for (let i = 0; i < addonBtns.length; ++i) {
        addonPrices[i].innerText =
            addonState[i][subYearly ? "priceYr" : "priceMo"];
        if (addonBtns[i].checked) {
            let state = addonState[i];
            totalCost -= getAddonCostVal(state, true) - getAddonCostVal(state);
        }
    }
};

const updatePlanSubscription = () => {
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

const updateSubscription = () => {
    subYearly = !subYearly;
    updatePlanSubscription();
    updateAddonSubscription();
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

// event listeners
navBtns.forEach((navBtn) =>
    navBtn.addEventListener("click", (e) =>
        updateSelectedNav(parseInt(e.target.innerText) - 1)
    )
);
subType.addEventListener("click", () => updateSubscription());
for (let i = 0; i < addonBtns.length; ++i) {
    let j = i;
    addonBtns[j].addEventListener("change", (e) => {
        setAddonCost(e, i);
    });
}
nextStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav + 1));
prevStepBtn.addEventListener("click", () => updateSelectedNav(selectedNav - 1));
