import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { Booking, CreateBookingInput, BookingQueryParams } from "../types/booking";

export const getMyBookings = async (
  params?: BookingQueryParams
): Promise<Booking[]> => {
  const response = await AxiosInstance.get<Booking[]>(
    API_ROUTES.BOOKINGS.MY_BOOKINGS,
    { params }
  );
  return response.data;
};

export const getBookingsByService = async (
  serviceId: string
): Promise<Booking[]> => {
  const response = await AxiosInstance.get<Booking[]>(
    API_ROUTES.BOOKINGS.BY_SERVICE(serviceId)
  );
  return response.data;
};

export const getAllBookings = async (
  params?: BookingQueryParams
): Promise<Booking[]> => {
  const response = await AxiosInstance.get<Booking[]>(
    API_ROUTES.BOOKINGS.BASE,
    { params }
  );
  return response.data;
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const response = await AxiosInstance.get<Booking>(
    API_ROUTES.BOOKINGS.BY_ID(id)
  );
  return response.data;
};

export const createBooking = async (
  data: CreateBookingInput
): Promise<Booking> => {
  const response = await AxiosInstance.post<Booking>(
    API_ROUTES.BOOKINGS.BASE,
    data
  );
  return response.data;
};

export const updateBookingStatus = async (
  id: string,
  status: string
): Promise<Booking> => {
  const response = await AxiosInstance.patch<Booking>(
    API_ROUTES.BOOKINGS.BY_ID(id),
    { status }
  );
  return response.data;
};

export const cancelUserBooking = async (id: string): Promise<Booking> => {
  const response = await AxiosInstance.patch<Booking>(
    API_ROUTES.BOOKINGS.CANCEL(id)
  );
  return response.data;
};
