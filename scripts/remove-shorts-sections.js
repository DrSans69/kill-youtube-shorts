function removeShortsSectionsAll() {
    const sections = document.querySelectorAll("[is-shorts]");
    sections.forEach((section) => {
        if (
            section &&
            section.parentElement &&
            section.parentElement.parentElement
        ) {
            section.parentElement.parentElement.remove();
        }
    });
}

function removeShortsSectionsNoSubscriptions() {
    if (!location.href.includes("/feed/subscriptions")) {
        removeShortsSectionsAll();
    }
}

let removeSections = true;
let removeSectionsOnSubscriptions = true;

function initializeShortsSectionsRemovments() {
    if (!removeSections) return;

    const removeShortsSections = removeSectionsOnSubscriptions
        ? removeShortsSectionsAll
        : removeShortsSectionsNoSubscriptions;

    removeShortsSections();

    const observer = new MutationObserver((mutations) => {
        removeShortsSections();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
}

function main() {
    initializeShortsSectionsRemovments();
}

window.addEventListener("load", main);
