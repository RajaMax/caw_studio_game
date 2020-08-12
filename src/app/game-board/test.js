function charCount(str) {
    var a = str.split('');
    var obj = {}
    a.forEach(function(s){
        var count = 0
	for(var j = 0; j<a.length; j++){
        if (s == a[j]) {
            count++;
        }
        obj[s] = count;
    }
});
var output =''
for(var key in obj){
    output=output+key+obj[key]
}
return output

	
}

console.log(charCount('dgddkkew'));