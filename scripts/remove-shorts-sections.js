function removeShortsSectionsAll() {
    const sections = document.querySelectorAll("[is-shorts]");
    sections.forEach((section) => {
        section.parentElement.parentElement.remove();
    });
}

function removeShortsSectionsNoSubscriptions() {
    if (!location.href.includes("/feed/subscriptions")) {
        removeShortsSectionsAll();
    }
}

chrome.storage.sync.get(["shortsSections", "sectionsSubs"], (result) => {
    if (!result.shortsSections) return;

    const removeShortsSections = result.sectionsSubs
        ? removeShortsSectionsAll
        : removeShortsSectionsNoSubscriptions;

    removeShortsSections();

    const observer = new MutationObserver(() => {
        removeShortsSections();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});
