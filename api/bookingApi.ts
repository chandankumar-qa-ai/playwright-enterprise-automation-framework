import type { APIRequestContext, APIResponse } from '@playwright/test';

export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
};

export class BookingApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBooking(booking: Booking) {
    const response = await this.request.post('/booking', { data: booking });
    return response;
  }

  async getBooking(bookingId: number) {
    const response = await this.request.get(`/booking/${bookingId}`);
    return response;
  }

  async updateBooking(bookingId: number, booking: Booking, token: string) {
    const response = await this.request.put(`/booking/${bookingId}`, {
      data: booking,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response;
  }

  async deleteBooking(bookingId: number, token: string) {
    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response;
  }
}
