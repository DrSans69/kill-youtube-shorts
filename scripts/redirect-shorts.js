function isShorts(url) {
    const shortsPattern =
        /https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
    return url.match(shortsPattern);
}

function fromShortsToRegular(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

function handleNavigation(event) {
    const url = event.destination.url;
    match = isShorts(url);
    if (match) {
        location = fromShortsToRegular(match[1]);
    }
}

chrome.storage.sync.get("redirectShorts", (result) => {
    if (result.redirectShorts) {
        const url = location.href;
        match = isShorts(url);
        if (match) {
            location.replace(fromShortsToRegular(match[1]));
        }

        navigation.addEventListener("navigate", handleNavigation);
    }
});
