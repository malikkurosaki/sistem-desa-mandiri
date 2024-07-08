/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/page.tsx)
 */
export const pagePathPageTsx = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `page.tsx${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(dev-test)/test-division/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(dev-test)/test-division/page.tsx)
 */
export const pagePathTestDivision = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/test-division${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(auth)/welcome/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(auth)/welcome/page.tsx)
 */
export const pagePathWelcome = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/welcome${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(auth)/verification/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(auth)/verification/page.tsx)
 */
export const pagePathVerification = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/verification${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/search/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/search/page.tsx)
 */
export const pagePathSearch = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/search${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/profile/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/profile/page.tsx)
 */
export const pagePathProfile = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/profile${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/home/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/home/page.tsx)
 */
export const pagePathHome = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/home${searchParams}`;
};

/**
 *
 *  [/Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/detail-feature/page.tsx](file:///Users/bip/Documents/projects/bip/sistem-desa-mandiri/src/app/(application)/detail-feature/page.tsx)
 */
export const pagePathDetailFeature = (params?: {
  searchParams?: Record<string, any>;
}) => {
  let searchParams = "";
  if (params && params.searchParams) {
    searchParams = "?" + new URLSearchParams(params.searchParams).toString();
  }
  return `/detail-feature${searchParams}`;
};
