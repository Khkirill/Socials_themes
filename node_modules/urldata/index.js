/*
  extract url or data-url from css
  - value - css value
*/
function urldata(value){
  if(!value){
    return;
  }
  var result = [];
  var urlCursor = value.indexOf("url");
  var start = 0;
  var end = 0;
  while(urlCursor >= 0){
    start = urlCursor + 3;

    while(value[start] === " "){ start++; }

    if(value[start] === "("){
      start ++;
    } else {
      return result;
    }

    while(value[start] === " "){ start++; }

    var openQuote = value[start];
    if(openQuote === "\'" || openQuote === "\""){
      start++;
    } else {
      openQuote = "";
    }

    if(!openQuote){
      while(value[start] === " "){ start++; }
    }

    if (!openQuote) {
        end = value.indexOf(")", start);
    } else {
        end = start;
        while(value[end] !== openQuote && end < value.length) { end++; }
        while(value[end] !== ")" && end < value.length){ end++; }
    }
    
    if(end < 0){
      return result;
    } else if (end === value.length) {
      return result;
    }
    end--;
    while(value[end]===" "){
      end--;
    }
    if(!!openQuote){
      if(value[end] === openQuote){
        end--;
      } else {
        start--;
      }
    }
    result[result.length] = value.slice(start, end + 1);
    urlCursor = value.indexOf("url", end);
  }
  return result;
}

module.exports = urldata;
