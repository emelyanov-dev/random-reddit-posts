export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


let _cache = new Map();

export async function cacheFetch(url) {
  if(_cache.has(url) && _cache.get(url).timestamp + 120000 >= Date.now()) {
    return _cache.get(url).result
  }

  const result = await fetch(url).then(response => response.json());

  _cache.set(url, {
    result,
    timestamp: Date.now()
  });

  return result
}