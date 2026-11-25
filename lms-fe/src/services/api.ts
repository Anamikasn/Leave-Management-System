const API_BASE_URL = "http://localhost:4000";

type ApiOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
};

export async function apiRequest(
    getAccessTokenSilently: () => Promise<string>,
    endpoint: string,
    options: ApiOptions = {}
): Promise<any> {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "API request failed");
    }

    return data;
}