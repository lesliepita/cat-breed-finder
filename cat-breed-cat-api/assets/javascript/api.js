export async function getData() {
  const url = "https://api.thecatapi.com/v1/breeds";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Request error: " + res.status);
  }

  const data = await res.json();
  return data;
}
