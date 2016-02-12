/*
  * this module is compare th two arrays
  * same      -> true;
  * different -> false;

  * array.length.compare
  * array.forEach.compare
*/
exports.compare = function (at, bt){
	if(at.length !== bt.length) return false;

	for(var i in at){
		var count=0;
		for(var j in bt){
			if(at[i]!==bt[j]) count++;
		}
		if(count===at.length) return false;

	}
	return true;
}