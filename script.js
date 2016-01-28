var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'http://dodoto.herokuapp.com/api/add/'+window.btoa(sc_m3u8), true);
xmlhttp.send();