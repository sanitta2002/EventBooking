export const AUTH_MESSAGES = {
  USER_ALREADY_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  REGISTRATION_SUCCESS: 'Registration successful',
  LOGIN_SUCCESS: 'Login successful',
} as const

export const SERVICE_MESSAGES = {
  SERVICE_ALREADY_EXISTS: 'Service already exists',
  SERVICE_NOT_FOUND: 'Service not found',
  SERVICE_DELETED: 'Service deleted successfully',
} as const;


export const BOOKING_MESSAGES = {
  SERVICE_NOT_FOUND: 'Service not found',
  SERVICE_NOT_AVAILABLE: 'Service is not available on the selected date',
  SERVICE_ALREADY_BOOKED: 'Service is already booked for the selected date',
  PAST_DATE_NOT_ALLOWED: 'Booking date cannot be in the past',
  INVALID_DATE_RANGE:""
} as const;