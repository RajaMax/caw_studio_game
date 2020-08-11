function charCount(str){
	var a=str.split('');
	a.forEach(funtion(s){
	var count=0;
	var obj={}
	for(var j=0;j<a.length;j++){
		if(s==a[j]){
		count++;
	}
		obj[s]=count;
	}
	});
	return obj

	
}

console.log(charCount('dgddkkew'));