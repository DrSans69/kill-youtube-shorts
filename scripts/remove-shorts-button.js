function removeShortsParent() {
    const shortsLink = document.querySelector('a[title="YouTube Shorts"]');
    if (shortsLink && shortsLink.parentElement) {
        shortsLink.parentElement.remove();
    }
}

window.addEventListener("load", function () {
    removeShortsParent();

    const observer = new MutationObserver((mutations) => {
        removeShortsParent();
    });

    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);
});
