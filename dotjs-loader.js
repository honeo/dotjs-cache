/*
	.jsファイルを読み込む
		promiseを返す
*/

// Modules
import {is, not} from '@honeo/type-check';

// var
const option = {
   capture: false,
   once: true,
   passive: false
}

function dotjsLoader(url){
    // console.log('dotjsLoader', url);
	if( not.str(url) ){
		throw new TypeError(`Invalid argument: ${url}`);
	}

	return new Promise( (resolve, reject)=>{
		const script = document.createElement('script');
		script.addEventListener('load', resolve, option);
		script.addEventListener('error', reject, option);
        script.defer = true;
    	script.async = true;
    	script.src = url;
		document.head.appendChild(script);
		document.head.remove(script);
	});
}

export default dotjsLoader;
