// User Service - Handles user data storage and retrieval

const USER_KEY = 'user';

export function getUser() {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function hasUser() {
  return !!getUser();
}
