import axios from 'axios';

const $api = axios.create({
  baseURL: 'https://localhost:3049/api',
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await $api.post(
            '/auth/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          return $api(originalRequest);
        } catch (error) {
          console.error('Error refreshing access token:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } else {
        console.error('Refresh token not found');
      }
    }
    return Promise.reject(error);
  },
);

export { $api };
