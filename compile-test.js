var normalizeStr = function(str){
    var pattern = /[A-Z]/g;
    var normalizedStr = str;

    if(pattern.test(str)){
        var char = str.charAt(pattern.lastIndex-1);
        normalizedStr = str.replace(char, "/" + char.toLowerCase());
    }

    if(pattern.test(normalizedStr)){
        normalizedStr = normalizeStr(normalizedStr);
    }

    return normalizedStr;
};

var str = "AministTrations";

console.log(normalizeStr(str));