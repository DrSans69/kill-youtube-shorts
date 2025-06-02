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

function removeShortsSectionsFromResults() {
    if (!location.href.includes("/results")) return;

    removeShortsSectionsByTag();
}

chrome.storage.sync.get(["sectionsRelated", "sectionsResults"], (result) => {
    if (!result.sectionsRelated && !result.sectionsResults) return;

    let removeShortsSections;
    if (result.sectionsRelated && result.sectionsResults) {
        removeShortsSections = removeShortsSectionsByTag;
    } else if (result.sectionsRelated) {
        removeShortsSections = removeShortsSectionsFromRelated;
    } else if (result.sectionsResults) {
        removeShortsSections = removeShortsSectionsFromResults;
    }

    removeShortsSections();

    const observer = new MutationObserver(() => {
        removeShortsSections();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});
