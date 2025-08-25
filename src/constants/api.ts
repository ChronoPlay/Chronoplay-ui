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
export const PROFILE_API = `${API_BASE}/user/user`;
export const USER_PROFILE_API = `${API_BASE}/user/get_user`;
export const GET_POSSIBLE_EXCHANGE_API = `${API_BASE}/transaction/get_possible_exchange`;
export const INITIATE_EXCHANGE_API = `${API_BASE}/transaction/exchange`;
export const GET_TRANSACTION_HISTORY_API = `${API_BASE}/transaction/get_transactions`;
export const NOTIFICATIONS_API = `${API_BASE}/notification/get_notifications`;
export const READ_NOTIFICATION_API = `${API_BASE}/notification/mark_as_read`;