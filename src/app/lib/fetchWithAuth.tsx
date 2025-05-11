"use client";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  if (typeof window === "undefined") return null;

  const accessToken = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    window.location.href = "/login";
    return null;
  }

  return response;
};
