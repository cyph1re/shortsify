document.getElementById("replace-button").addEventListener("click", function() {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];

        // Get the current tab's URL
        var url = currentTab.url;

        // Replace the keyword "example" with "shorts"
        var newUrl = url.replace("shorts/", "watch?v=");

        // Update the current tab's URL
        chrome.tabs.create({ url: newUrl });
    });
});
