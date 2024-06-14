function changeRemoveShortsSectionsOnSubscriptionsState() {
    const toggleRemoveShortsSections = document.getElementById(
        "toggleRemoveShortsSections"
    );
    const toggleRemoveShortsSectionsOnSubscriptions = document.getElementById(
        "toggleRemoveShortsSectionsOnSubscriptions"
    );
    if (toggleRemoveShortsSections.checked) {
        toggleRemoveShortsSectionsOnSubscriptions.removeAttribute("disabled");
    } else {
        toggleRemoveShortsSectionsOnSubscriptions.setAttribute(
            "disabled",
            "disabled"
        );
    }
}

// ! in Future better to iterate through all options

document.addEventListener("DOMContentLoaded", () => {
    const toggleRemoveShortsSections = document.getElementById(
        "toggleRemoveShortsSections"
    );
    const toggleRemoveShortsSectionsOnSubscriptions = document.getElementById(
        "toggleRemoveShortsSectionsOnSubscriptions"
    );
    const toggleRemoveShortsButton = document.getElementById(
        "toggleRemoveShortsButton"
    );
    const toggleRedirectShorts = document.getElementById(
        "toggleRedirectShorts"
    );

    chrome.storage.sync.get(
        [
            "shortsSections",
            "shortsSectionsOnSubscriptions",
            "shortsSections",
            "toggleRedirectShorts",
        ],
        (result) => {
            toggleRemoveShortsSections.checked = result.shortsSections ?? true;
            toggleRemoveShortsSectionsOnSubscriptions.checked =
                result.shortsSectionsOnSubscriptions ?? true;
            toggleRemoveShortsButton.checked = result.shortsButton ?? true;
            toggleRedirectShorts.checked = result.redirectShorts ?? true;

            changeRemoveShortsSectionsOnSubscriptionsState();
        }
    );

    toggleRemoveShortsSections.addEventListener("change", (event) => {
        chrome.storage.sync.set({ shortsSections: event.target.checked });
        changeRemoveShortsSectionsOnSubscriptionsState();
    });

    toggleRemoveShortsSectionsOnSubscriptions.addEventListener(
        "change",
        (event) => {
            chrome.storage.sync.set({
                shortsSectionsOnSubscriptions: event.target.checked,
            });
        }
    );

    toggleRemoveShortsButton.addEventListener("change", (event) => {
        chrome.storage.sync.set({ shortsButton: event.target.checked });
    });

    toggleRedirectShorts.addEventListener("change", (event) => {
        chrome.storage.sync.set({ redirectShorts: event.target.checked });
    });
});
