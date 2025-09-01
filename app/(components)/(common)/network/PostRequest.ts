/**
 * Makes a POST request and returns a typed response.
 * @param url - API endpoint
 * @param body - Request payload (object)
 * @returns Parsed JSON response
 */
export async function postRequest<T>(
  url: string,
  body: string,
  header: Record<string, string>
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: header,
    body: body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return (await response.json()) as T;
}
