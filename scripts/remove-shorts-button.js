function removeShortsButton() {
    const shortsLink = document.querySelector('a[title="YouTube Shorts"]');
    if (shortsLink && shortsLink.parentElement) {
        shortsLink.parentElement.remove();
    }
}

window.addEventListener("load", function () {
    removeShortsButton();

    const observer = new MutationObserver((mutations) => {
        removeShortsButton();
    });

    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);
});
