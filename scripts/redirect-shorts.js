function isShorts(url) {
    return url.match(shortsPattern);
}

function fromShortsToRegular(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

function handleNavigation(event) {
    const url = event.destination.url;
    const match = isShorts(url);
    if (match) {
        location = fromShortsToRegular(match[1]);
    }
}

chrome.storage.sync.get("redirectShorts", (result) => {
    if (!result.redirectShorts) return;

    const url = location.href;
    const match = isShorts(url);
    if (match) {
        location.replace(fromShortsToRegular(match[1]));
    }

    navigation.addEventListener("navigate", handleNavigation);
});
