function handleReplaceButtonClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];

        // Get the current tab's URL
        var url = currentTab.url;

        if (!isYouTubeURL(url)) {
            alert("This is not a YouTube URL.");
            return;
        }
        if (url.includes("watch?v=")) {
            alert("This video is already a video.");
            return;
        }
        // Check if the URL already contains "shorts/" and replace it with "watch?v="
        var newUrl = url.replace("shorts/", "watch?v=");

        // Create a new tab with the modified URL
        chrome.tabs.create({ url: newUrl }, function(newTab) {
            // Add a delay before pausing the video in the current tab (t1)
            setTimeout(function() {
                // Execute a script in the current tab (t1) to pause the video
                chrome.scripting.executeScript({
                    target: { tabId: currentTab.id },
                    function: function() {
                        var video = document.querySelector("video");
                        if (video) {
                            video.pause();
                        }
                    },
                });
            }, 3000); // 3000 milliseconds (3 seconds) delay before pausing the video in t1
        });
    });
}

function isYouTubeURL(url) {
    return /^https:\/\/www\.youtube\.com\//.test(url);
}

// Add a click event listener to the "replace-button" element when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    var replaceButton = document.getElementById("replace-button");

    if (replaceButton) {
        replaceButton.addEventListener("click", handleReplaceButtonClick);
    }
});
