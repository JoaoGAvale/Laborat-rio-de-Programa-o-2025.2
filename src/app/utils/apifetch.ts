/*
A ideia da função apiFetch é facilitar a conifuração das requisições de toda a aplicação
*/

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  method?: HttpMethod;
  body?: any;
  auth?: boolean;
  headers?: HeadersInit;
}

export async function apiFetch(
  url: string,
  options: ApiRequestOptions = {}
) {
  const {
    method = "GET",
    body,
    auth = false,
    headers = {}
  } = options;

  const config: RequestInit = {
    method,
    credentials: auth ? "include" : "omit",
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  return response; 
}
