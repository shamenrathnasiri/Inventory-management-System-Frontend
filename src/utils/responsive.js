// Responsive utility functions

/**
 * Check if the current viewport is mobile size
 * @returns {boolean}
 */
export function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Check if the current viewport is tablet size
 * @returns {boolean}
 */
export function isTablet() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Check if the current viewport is desktop size
 * @returns {boolean}
 */
export function isDesktop() {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= 1024;
}

/**
 * Get current breakpoint name
 * @returns {string}
 */
export function getBreakpoint() {
  if (typeof window === 'undefined') return 'lg';
  const width = window.innerWidth;
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}
