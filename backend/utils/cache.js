// utils/cache.js (ES Module)
const cache = new Map();

export function setCache(key, value, ttl = 60) {
  const expires = Date.now() + ttl * 1000;
  cache.set(key, { value, expires });
}

export function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expires) {
    cache.delete(key);
    return null;
  }

  return cached.value;
}

export function clearCache(key) {
  cache.delete(key);
}

export function clearAllCache() {
  cache.clear();
}
