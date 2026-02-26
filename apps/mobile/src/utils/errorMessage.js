export function getApiErrorMessage(err, fallback) {
  if (err.response?.data?.error?.message) {
    return err.response.data.error.message;
  }

  if (err.code === 'ECONNABORTED') {
    return 'Request timed out. Check backend server and network.';
  }

  if (err.message === 'Network Error') {
    return 'Cannot reach backend API. Set EXPO_PUBLIC_API_BASE_URL to your backend IP:4000/api/v1.';
  }

  return fallback;
}
