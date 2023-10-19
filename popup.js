document.getElementById("replace-button").addEventListener("click", function() {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];

        // Get the current tab's URL
        var url = currentTab.url;

        // Check if the URL already contains "watch?v=" or is not a YouTube URL
        if (url.includes("watch?v=") || !isYouTubeURL(url)) {
            // URL already modified or not a YouTube URL, do nothing
            return;
        }

        // Replace the keyword "shorts/" with "watch?v="
        var newUrl = url.replace("shorts/", "watch?v=");

        // Create a new tab (t2)
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
});

function isYouTubeURL(url) {
    return /^https:\/\/www\.youtube\.com\//.test(url);
}
