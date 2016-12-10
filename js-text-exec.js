/*
	js文字列を実行する
		promiseを返す
*/

// var
const option = {
   capture: false,
   once: true,
   passive: false
}

function jsTextExec(text){
	if( typeof text!=='string' ){
		throw new TypeError('Invalid argument');
	}

	return new Promise( (resolve, reject)=>{
		const script = document.createElement('script');
		script.addEventListener('load', resolve, option);
		script.addEventListener('error', reject, option);
		script.text = text;
		document.head.appendChild(script);
		document.head.remove(script);
	});
}

export default jsTextExec;
