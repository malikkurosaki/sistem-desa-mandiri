export const fetchApi = {
  host: "",
  init(host: string) {
    this.host = host;
  },

  async login({
    body,
    searchParams,
    token,
  }: {
    body?: string;
    searchParams?: string;
    token?: string;
  }) {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const res = await fetch(`/api/login/${searchParams || ""}`, {
        method: "POST",
        headers,
        body,
        cache: "no-cache",
      });
      return await res.json().catch(() => null);
    } catch {
      return null;
    }
  },
  paths() {
    return {
      login: `${this.host}/api/login/`,
    };
  },
};
