function get(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            postMessage({
                "args": [xmlhttp.responseText]
            })
        }
    }
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

onmessage = function(e) {
    var args = e.data.args;
    get(args[0]);
};