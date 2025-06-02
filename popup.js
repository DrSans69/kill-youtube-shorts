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

document.addEventListener("DOMContentLoaded", () => {
    const options = [
        {
            id: "toggleRemoveShortsSections",
            message: "toggleRemoveShortsSections",
            storageKey: "shortsSections",
            default: false,
        },
        {
            id: "toggleSectionsOnSubscriptions",
            message: "toggleSectionsOnSubscriptions",
            storageKey: "sectionsSubs",
            default: false,
        },
        {
            id: "toggleSectionsOnRelated",
            message: "toggleSectionsOnRelated",
            storageKey: "sectionsRelated",
            default: false,
        },
        {
            id: "toggleSectionsOnResults",
            message: "toggleSectionsOnResults",
            storageKey: "sectionsResults",
            default: false,
        },
        {
            id: "toggleRemoveShortsButton",
            message: "toggleRemoveShortsButton",
            storageKey: "shortsButton",
            default: false,
        },
        {
            id: "toggleRedirectShorts",
            message: "toggleRedirectShorts",
            storageKey: "redirectShorts",
            default: false,
        },
    ];

    const title = document.getElementById("title");
    const hint = document.getElementById("hint");

    title.textContent = chrome.i18n.getMessage("popupTitle");
    hint.textContent = chrome.i18n.getMessage("hint");

    // Set label text for each option
    options.forEach((opt) => {
        const el = document.getElementById(opt.id);
        if (el && el.nextElementSibling) {
            el.nextElementSibling.textContent = chrome.i18n.getMessage(
                opt.message
            );
        }
    });

    // Get all storage keys at once
    chrome.storage.sync.get(
        options.map((opt) => opt.storageKey),
        (result) => {
            options.forEach((opt) => {
                const el = document.getElementById(opt.id);
                if (el) {
                    el.checked = result[opt.storageKey] ?? opt.default;
                }
            });
            changeRemoveShortsSectionsOnSubscriptionsState();
        }
    );

    // Add event listeners for each option
    options.forEach((opt) => {
        const el = document.getElementById(opt.id);
        if (el) {
            el.addEventListener("change", (event) => {
                chrome.storage.sync.set({
                    [opt.storageKey]: event.target.checked,
                });
                if (opt.id === "toggleRemoveShortsSections") {
                    changeRemoveShortsSectionsOnSubscriptionsState();
                }
            });
        }
    });
});
