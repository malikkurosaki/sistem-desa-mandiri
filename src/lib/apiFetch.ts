interface Params {
  searchParams?: Record<string, any>;
  token?: string;
  body?: Record<string, any>;
}

async function funPramas(url: string, method: string, params?: Params) {
  const property: Record<string, any> = {};
  if (params) {
    if (params.searchParams) {
      property.searchParams =
        "?" + new URLSearchParams(params.searchParams).toString();
    }

    if (params.body) {
      property.body = JSON.stringify(params.body);
    }

    if (params.token) {
      property.headers.Authorization = `Bearer ${params.token}`;
    }
  }
  property.method = method;
  try {
    const res = await fetch(`${url}${property?.searchParams || ""}`, property);
    return await res.json().catch(() => null);
  } catch {
    return null;
  }
}

export const apiPathTestDevisionListGroupGET = () =>
  `/api/test-devision/list-group/`;
export const apiFetchTestDevisionListGroupGET = async (params?: Params) =>
  funPramas(apiPathTestDevisionListGroupGET(), "GET", params);

export const apiPathTestDevisionListDivisionGET = () =>
  `/api/test-devision/list-division/`;
export const apiFetchTestDevisionListDivisionGET = async (params?: Params) =>
  funPramas(apiPathTestDevisionListDivisionGET(), "GET", params);

export const apiPathTestDevisionListAnggotaRouterTsGET = () =>
  `/api/test-devision/list-anggota/router.ts`;
export const apiFetchTestDevisionListAnggotaRouterTsGET = async (
  params?: Params,
) => funPramas(apiPathTestDevisionListAnggotaRouterTsGET(), "GET", params);

export const apiPathTestDevisionCountDevisionGET = () =>
  `/api/test-devision/count-devision/`;
export const apiFetchTestDevisionCountDevisionGET = async (params?: Params) =>
  funPramas(apiPathTestDevisionCountDevisionGET(), "GET", params);
