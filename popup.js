function changeRemoveShortsSectionsOnSubscriptionsState() {
    const toggleRemoveShortsSections = document.getElementById(
        "toggleRemoveShortsSections"
    );
    const toggleSectionsOnSubscriptions = document.getElementById(
        "toggleSectionsOnSubscriptions"
    );
    if (toggleRemoveShortsSections.checked) {
        toggleSectionsOnSubscriptions.removeAttribute("disabled");
    } else {
        toggleSectionsOnSubscriptions.setAttribute("disabled", "disabled");
    }
}

// ! in Future better to iterate through all options

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const toggleRemoveShortsSections = document.getElementById(
        "toggleRemoveShortsSections"
    );
    const toggleSectionsOnSubscriptions = document.getElementById(
        "toggleSectionsOnSubscriptions"
    );
    const toggleRemoveShortsButton = document.getElementById(
        "toggleRemoveShortsButton"
    );
    const toggleRedirectShorts = document.getElementById(
        "toggleRedirectShorts"
    );
    const hint = document.getElementById("hint");

    title.textContent = chrome.i18n.getMessage("popupTitle");
    toggleRemoveShortsSections.nextElementSibling.textContent =
        chrome.i18n.getMessage("toggleRemoveShortsSections");
    toggleSectionsOnSubscriptions.nextElementSibling.textContent =
        chrome.i18n.getMessage("toggleSectionsOnSubscriptions");
    toggleRemoveShortsButton.nextElementSibling.textContent =
        chrome.i18n.getMessage("toggleRemoveShortsButton");
    toggleRedirectShorts.nextElementSibling.textContent =
        chrome.i18n.getMessage("toggleRedirectShorts");
    hint.textContent = chrome.i18n.getMessage("hint");

    chrome.storage.sync.get(
        ["shortsSections", "sectionsSubs", "shortsButton", "redirectShorts"],
        (result) => {
            toggleRemoveShortsSections.checked = result.shortsSections ?? true;
            toggleSectionsOnSubscriptions.checked = result.sectionsSubs ?? true;
            toggleRemoveShortsButton.checked = result.shortsButton ?? true;
            toggleRedirectShorts.checked = result.redirectShorts ?? true;

            changeRemoveShortsSectionsOnSubscriptionsState();
        }
    );

    toggleRemoveShortsSections.addEventListener("change", (event) => {
        chrome.storage.sync.set({ shortsSections: event.target.checked });
        changeRemoveShortsSectionsOnSubscriptionsState();
    });

    toggleSectionsOnSubscriptions.addEventListener("change", (event) => {
        chrome.storage.sync.set({ sectionsSubs: event.target.checked });
    });

    toggleRemoveShortsButton.addEventListener("change", (event) => {
        chrome.storage.sync.set({ shortsButton: event.target.checked });
    });

    toggleRedirectShorts.addEventListener("change", (event) => {
        chrome.storage.sync.set({ redirectShorts: event.target.checked });
    });
});
