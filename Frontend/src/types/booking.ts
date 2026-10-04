import type { EventService } from "./service";
import type { User } from "./auth";

export interface Booking {
  id: string;
  _id?: string;
  userId: string;
  user?: User;
  serviceId: string;
  service?: EventService;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  pricePerDay: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBookingInput {
  serviceId: string;
  startDate: string;
  endDate: string;
}

export interface BookingQueryParams {
  status?: string;
  serviceId?: string;
}
