const REMOVE_SUCCESSFUL = 0;
const REMOVE_FAILED_NO_SUBS = 1;

const removeSubtitles = () => {
    const subs = document.querySelector("track");
    try {
        subs.remove();
        return 0;
    } catch (err) {
        return 1;
    }
}

const button = document.getElementById("rmSubsButton");

button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const rmResText = document.getElementById("removingResultText");

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: removeSubtitles,
    })
    .then((injRes) => {
        switch (injRes[0].result) {
            case REMOVE_SUCCESSFUL:
                rmResText.innerText = "Subtitles successfully removed!";
                rmResText.classList.remove("remove-message__warning");
                rmResText.classList.add("remove-message__success");
                console.log("Success!!!");
                break;
            case REMOVE_FAILED_NO_SUBS:
                rmResText.innerText = "No subtitles to remove";
                rmResText.classList.remove("remove-message__success");
                rmResText.classList.add("remove-message__warning");
                console.log("Failure!!!");
                break;
        }
    })   
});