const debounce = (callBack, delay) => {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callBack.apply(this, args);
		}, delay);
	};
};

const f = debounce(console.log, 1000);
f(1);
f(2);
setTimeout(() => f(3), 500);
setTimeout(() => f(4), 1600);
