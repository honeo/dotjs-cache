/*
	isを元にnot作成
*/
import is from './is.js';

const not = {}

for(let [key, func] of Object.entries(is) ){
	not[key] = (...args)=>{
		return !func(...args);
	}
}

export default not;
