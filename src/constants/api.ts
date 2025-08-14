const ENV = process.env.NEXT_PUBLIC_ENV || "local";

const envMap: Record<string, string | undefined> = {
  local: process.env.NEXT_PUBLIC_BACKEND_BASE_URL_LOCAL,
  dev: process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DEV,
  prod: process.env.NEXT_PUBLIC_BACKEND_BASE_URL_PROD,
};

export const API_BASE = envMap[ENV];

if (!API_BASE) {
  console.error(`❌ Missing BASE_URL for environment: ${ENV}`);
}

export const LOGIN_API = `${API_BASE}/auth/login`;
export const SIGNUP_API = `${API_BASE}/auth/signup`;
