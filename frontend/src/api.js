
const API_BASE_URL = "http://localhost:8000";
console.log("api.js loaded");
export async function apiFetch(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  console.log("apiFetch called:", url);
  console.log("Access token exists:", Boolean(accessToken));
  console.log(
    "Refresh token exists:",
    Boolean(localStorage.getItem("refresh_token"))
  );

  const sendRequest = (token) => {
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await sendRequest(accessToken);

  console.log("Initial response status:", response.status);

  if (response.status !== 401) {
    return response;
  }

  console.log("401 received. Trying to refresh token...");

  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.log("Refresh token is missing.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.assign("/login");
    return response;
  }

  try {
    const refreshResponse = await fetch(
      "http://localhost:8000/accounts/api/v1/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    console.log("Refresh response status:", refreshResponse.status);

    if (!refreshResponse.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await refreshResponse.json();

    console.log("New access token received:", Boolean(data.access));

    if (!data.access) {
      throw new Error("No access token returned");
    }

    localStorage.setItem("access_token", data.access);

    if (data.refresh) {
      localStorage.setItem("refresh_token", data.refresh);
    }

    response = await sendRequest(data.access);

    console.log("Retry response status:", response.status);

    if (response.status === 401) {
      throw new Error("Authentication failed after refresh");
    }

    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.assign("/login");

    return response;
  }
}
