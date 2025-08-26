// utils/storage.js
export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl, // expiry timestamp
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key); // clean up expired
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
}
