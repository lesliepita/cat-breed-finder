export async function getData() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = 'https://api.thecatapi.com/v1/breeds';

  const res = await fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!res.ok) {
    throw new Error('Request error: ' + res.status);
  }

  const data = await res.json();
  return data;  
}
