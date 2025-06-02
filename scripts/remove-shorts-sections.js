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

// Related And Results

function removeShortsSectionsByTag() {
    const sections = document.querySelectorAll("ytd-reel-shelf-renderer");
    sections.forEach((section) => {
        section.remove();
    });
}

function removeShortsSectionsFromRelated() {
    console.log(location.href);

    if (!location.href.includes("/watch")) return;

    removeShortsSectionsByTag();
}

chrome.storage.sync.get(["sectionsRelated"], (result) => {
    if (!result.sectionsRelated) return;

    removeShortsSectionsFromRelated();

    const observer = new MutationObserver(() => {
        removeShortsSectionsFromRelated();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});

function removeShortsSectionsFromResults() {
    if (!location.href.includes("/results")) return;

    removeShortsSectionsByTag();
}

chrome.storage.sync.get(["sectionsResults"], (result) => {
    if (!result.sectionsResults) return;

    removeShortsSectionsFromResults();

    const observer = new MutationObserver(() => {
        removeShortsSectionsFromResults();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});
