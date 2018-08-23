function getData() {
  // URL variables
  var host = "http://api.giphy.com/v1/gifs/search?";
  var key = "api_key=xoN7vPMbBTxPggtU41O19l5Hifgwytpb";
  // Get input value
  var string = document.getElementById('search').value;
  // If space, add + for search process
  var term = string.replace(/\s/g, "+");
  var search = "&q=" + term;
  var limit = "&limit=100";
  var url = host + key + search + limit;

  sendRequest(url);
}



function sendRequest(url) {
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function() {
    if (xml.status == 200 && xml.readyState == 4) {
      // Parse data
      var giphy = JSON.parse(xml.responseText);
      // Create data object
      var gifData = {};
      // Get array of data objects
      gifData.array = giphy.data;

      // Return with gifs
      var i;
      var gifContainer = document.getElementById('gif-container');
      gifContainer.innerHTML = "";

      for (i = 0; i <= gifData.array.length; i++) {
        // Create img element with gif as src
        var gifHTML = '<img class="gif" src="';
        gifHTML += giphy.data[i].images.original.url;
        gifHTML += '" />';
        //Place the img inside of id="gif-container"
        gifContainer.insertAdjacentHTML('beforeend', gifHTML);
      }
    }
  }
  xml.open("GET", url, true);
  xml.send();
}
