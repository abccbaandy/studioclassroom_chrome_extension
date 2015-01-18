//key point
//1.change the video url
//flashvars1.src = escape("http://scvod1.goodtv.org/hls-vod/sc/20141210_96199.m3u8")
//2.re-init player
//swfobject.embedSWF("http://w2.goodtv.tv/studio_classroom/flash/GrindPlayer.swf", "player1", "672", "430", "10.2", null, flashvars1, params1, attrs1);


function setVideo () {
    var link = this.value;
    console.log(link);
    if (link==""||link==undefined) {
        return;
    };

    createPlayerIfNotExist();

    var flashvars1 = {
            // Below Video Source is generating by Microsoft Live Smooth Streaming Service via IIS7
               //src: escape("http://webvod1.goodtv.org/SC/HLS/20141213_9ff89/20141213_9ff89-m3u8-aapl.ism/manifest(format=m3u8-aapl)")  //webb old vod

               // src: escape("http://scvod1.goodtv.org/hls-vod/sc/20141210_96199.m3u8" )  
               src: escape(link)  

            // src: escape("http://210.59.248.53/hls-vod/video/HFE0154HDY.mp4.m3u8")
            //, scaleMode: "stretch"
            // , streamType: "live"
            , mimeType: "application/vnd.apple.mpegurl"
            , streamType: "dvr"
        };
        var params1 = {
            allowFullScreen: true
            , allowScriptAccess: "always"
            , bgcolor: "#000000"
        };
        var attrs1 = {
            name: "player"
        };

        swfobject.embedSWF("http://w2.goodtv.tv/studio_classroom/flash/GrindPlayer.swf", "player1", "672", "430", "10.2", null, flashvars1, params1, attrs1);
    }

function initVideoList (linksString) {
    //init select
    var videoList = document.createElement("select");
    videoList.setAttribute("name", "mySelect");
    videoList.setAttribute("id", "mySelect");
    videoList.style.width = "350px";

    var option;

    for (var i = 0; i < linksString.links.length; i++) {
        option = document.createElement("option");
        option.innerHTML = linksString.links[i].url;
        videoList.appendChild(option);
    };

    document.getElementsByClassName("title")[0].appendChild(videoList);

    //default not select anything
    videoList.selectedIndex = "-1";

    /* setting an onchange event */
    videoList.onchange = setVideo;
    // videoList.setAttribute("onchange", setVideo(videoList.value));
}

function createPlayerIfNotExist () {
    if (document.getElementById("player1")==null) {
        // var player = document.createElement("div");
        // player.setAttribute("id", "player1");
        // player.setAttribute("class", "player1");
        // document.getElementById("media-player").appendChild(player);
        // $('#media-player img').remove();
        $('#media-player').attr("id", "player1");
        $('#media-player').attr("class", "player1");
    };
}

function workerCallback(event) {
    var args = event.data.args;
    // console.log(args);

    initVideoList(JSON.parse(args[0]));
}

function getVideolinks () {
    var worker = new Worker(chrome.runtime.getURL('httpReguest.js'));
    worker.onmessage = workerCallback;
    worker.postMessage({
        "args": ["https://dodoto.herokuapp.com/api/links"]
        // "args": ["http://127.0.0.1:3000/api/links"]
    });
}

//start here
getVideolinks();