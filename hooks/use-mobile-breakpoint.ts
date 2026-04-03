import { useEffect, useState } from 'react';

// Breakpoint definitions (can be adjusted to match your design system)
const MOBILE_MAX = 767; // up to 767px
const TABLET_MIN = 768; // 768px - 1023px
const TABLET_MAX = 1023;
const DESKTOP_MIN = 1024; // 1024px and up

export type UseMobileReturn = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
};

// Helper functions that can be used outside React components (non-reactive, read current state)
export function isMobile(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(`(max-width: ${MOBILE_MAX}px)`).matches;
}

export function isTablet(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(`(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX}px)`).matches;
}

export function isDesktop(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`).matches;
}

// React hook - returns reactive values that update on viewport changes
export default function useMobile(): UseMobileReturn {
	const [state, setState] = useState<UseMobileReturn>(() => ({
		isMobile: isMobile(),
		isTablet: isTablet(),
		isDesktop: isDesktop(),
	}));

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mqMobile = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
		const mqTablet = window.matchMedia(`(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX}px)`);
		const mqDesktop = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);

		const update = () => {
			setState({
				isMobile: mqMobile.matches,
				isTablet: mqTablet.matches,
				isDesktop: mqDesktop.matches,
			});
		};

		// Ensure initial state is correct
		update();

		// Modern addEventListener for MediaQueryList, fallback to addListener for older browsers
		const add = (mql: MediaQueryList, fn: () => void) => {
			if (typeof mql.addEventListener === 'function') mql.addEventListener('change', fn);
			else mql.addListener(fn);
		};
		const remove = (mql: MediaQueryList, fn: () => void) => {
			if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', fn);
			else mql.removeListener(fn);
		};

		add(mqMobile, update);
		add(mqTablet, update);
		add(mqDesktop, update);

		return () => {
			remove(mqMobile, update);
			remove(mqTablet, update);
			remove(mqDesktop, update);
		};
	}, []);

	return state;
}
