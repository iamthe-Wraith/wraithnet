import dayjs from "dayjs";

export const debounce = (func: (...args: any[]) => void, wait: number, immediate?: boolean) => {
	let timeout: number;
	// tslint:disable-next-line: only-arrow-functions space-before-function-paren
	return function () {
		const args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) {
				func(args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
		if (callNow) {
			func(args);
		}
	};
};

export const getKeyTarService = () => {
    return process.env.NODE_ENV === 'production'
        ? 'wraithnet'
        : 'wraithnet-dev';
};

export const noop = () => {};