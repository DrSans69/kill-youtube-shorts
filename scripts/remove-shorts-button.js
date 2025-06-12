function removeShortsButton() {
    const shortsLink = document.querySelector('a[title$="Shorts"]');
    if (shortsLink && shortsLink.parentElement) {
        shortsLink.parentElement.remove();
    }
}

chrome.storage.sync.get("shortsButton", (result) => {
    if (!result.shortsButton) return;

    removeShortsButton();

    const observer = new MutationObserver(() => {
        removeShortsButton();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});
