function isShorts(url) {
    const shortsPattern =
        /https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
    return url.match(shortsPattern);
}

function fromShortsToRegular(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

function redirectIfShort(url) {
    const match = isShorts(url);
    if (match) {
        location.replace(fromShortsToRegular(match[1]));
    }
}

chrome.storage.sync.get("redirectShorts", (result) => {
    if (!result.redirectShorts) return;

    redirectIfShort(location.href);

    window.addEventListener("yt-navigate-finish", () => {
        redirectIfShort(location.href);
    });
});
