export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
  },
  SERVICES: {
    BASE: "/services",
    BY_ID: (id: string) => `/services/${id}`,
  },
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id: string) => `/bookings/${id}`,
    MY_BOOKINGS: "/bookings/mybooking",
    BY_SERVICE: (serviceId: string) => `/bookings/service/${serviceId}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
};
