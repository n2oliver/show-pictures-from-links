document.getElementById("showImages").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        
        document.querySelectorAll("a").forEach(function (anchor) {
            let link = anchor ? anchor.href : null,
                img;
            if (anchor &&
                (link.search(".gif") != -1 ||
                    link.search(".jpg") != -1 ||
                    link.search(".jpeg") != -1 ||
                    link.search(".png") != -1)
            ) {
                img = document.createElement("img");
                img.src = link;
                img.style.maxWidth = "320px";
                document.body.append(img);
            } else if (anchor &&
                (link.search(".swf") != -1 ||
                    link.search(".flv") != -1)) {
                img = document.createElement("video");
                img.width = 320;
                img.height = 240;
                img.controls = true;
                let source = document.createElement("source");
                source.src = link;
                img.append(source);
                document.body.append(img);
            }
        });
        return document.body.innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
    });
});