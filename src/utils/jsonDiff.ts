const isJsonEqual = (obj1: any, obj2: any): boolean => {
	let props1 = Object.getOwnPropertyNames(obj1);
	let props2 = Object.getOwnPropertyNames(obj2);

	if(props1.length !== props2.length) return false;

	for(let i: number = 0; i < props1.length; i++){
		let prop = props1[i];
		const areBothObjects: boolean = typeof(obj1[prop]) === 'object' && typeof(obj2[prop]) === 'object';

		if((!areBothObjects && (obj1[prop] !== obj2[prop])) || (areBothObjects && !isJsonEqual(obj1[prop], obj2[prop]))){
			return false;
		}
	};

	return true;
}

export {isJsonEqual};