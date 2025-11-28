export async function fetcher(url: string | URL | Request) {
  const res = await fetch(url);

  return res.json();
}
