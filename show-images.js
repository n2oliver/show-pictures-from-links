document.getElementById("showImages").addEventListener('click', () => {
    function modifyDOM() {
        let modal = document.getElementsByClassName("show-image-from-link")[0];
        let div = modal ? modal : document.createElement("div");
        let closeButton = modal ? document.getElementsByClassName("show-image-from-link")[0].querySelector("span") : document.createElement("span");
        if(!modal) {
            div.classList.add("show-image-from-link");
        }
        div.innerHTML = ""
        
        
        
        div.style.position = "fixed";
        div.style.top = "5%";
        div.style.left = "5%";
        div.style.right = "5%";
        div.style.bottom = "5%";
        div.style.zIndex = "1000";
        div.style.background = "#fff";
        div.style.overflow = "scroll";
        div.style.border = "2px solid #ccc";

        closeButton.style.position = "fixed";
        closeButton.style.top = "0px";
        closeButton.style.right = "0px";
        closeButton.style.padding = "5px";
        closeButton.style.margin = "20px";
        closeButton.style.borderRadius = "1em";
        closeButton.style.fontFamily = "Helvetica";
        closeButton.style.color = "#fff";
        closeButton.style.fontWeight = "600";
        closeButton.style.background = "#000";
        closeButton.innerText = "x";

        closeButton.onclick = function(e) {e.target.parentElement.remove()}

        div.append(closeButton);

        

        document.querySelectorAll("a").forEach(function (anchor) {
            let link = anchor ? anchor.href : null,
                img;
            if (anchor &&
                (link.search(".gif") != -1 || link.search(".GIF") != -1 ||
                    link.search(".jpg") != -1 || link.search(".JPG") != -1 ||
                    link.search(".jpeg") != -1 || link.search(".JPEG") != -1 ||
                    link.search(".png") != -1 || link.search(".PNG") != -1)
            ) {
                img = document.createElement("img");
                img.src = link;
                img.style.maxWidth = "320px";
            } else if (anchor &&
                (link.search(".swf") != -1 || link.search(".SWF") != -1 ||
                link.search(".flv") != -1 || link.search(".FLV") != -1 ||
                link.search(".mp4") != -1 || link.search(".MP4") != -1 ||
                link.search(".mov") != -1 || link.search(".MOV") != -1 ||
                link.search(".MPEG") != -1 || link.search(".MPEG") != -1)) {
                img = document.createElement("video");
                img.width = 320;
                img.height = 240;
                img.controls = true;
                let source = document.createElement("source");
                source.src = link;
                img.append(source);
            }
            if(img) {
                div.append(img)
            }
        });
        document.body.append(div);
        return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();'
    });
});