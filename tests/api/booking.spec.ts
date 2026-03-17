import { expect } from '@playwright/test';
import { AuthApi } from '../../api/authApi';
import { BookingApi, Booking } from '../../api/bookingApi';
import { test } from '../../fixtures/apiClient';

const defaultBooking: Booking = {
  firstname: 'Test',
  lastname: 'User',
  totalprice: 123,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2025-01-05',
  },
  additionalneeds: 'Breakfast',
};

test.describe('Restful Booker API', () => {
  test('should generate auth token', async ({ apiRequest }) => {
    const auth = new AuthApi(apiRequest);
    const tokenResponse = await auth.createToken('admin', 'password123');

    expect(tokenResponse.token).toBeTruthy();
  });

  test('should create, read, update and delete a booking', async ({ apiRequest }) => {
    const auth = new AuthApi(apiRequest);
    const booking = new BookingApi(apiRequest);

    const { token } = await auth.createToken('admin', 'password123');

    const createResponse = await booking.createBooking(defaultBooking);
    expect(createResponse.ok()).toBeTruthy();
    const { bookingid } = await createResponse.json();

    const getResponse = await booking.getBooking(bookingid);
    expect(getResponse.ok()).toBeTruthy();
    const fetched = await getResponse.json();
    expect(fetched.firstname).toBe(defaultBooking.firstname);

    const updated: Booking = {
      ...defaultBooking,
      firstname: 'Updated',
      totalprice: 321,
    };

    const updateResponse = await booking.updateBooking(bookingid, updated, token);
    expect(updateResponse.ok()).toBeTruthy();

    const verifyResponse = await booking.getBooking(bookingid);
    const verified = await verifyResponse.json();
    expect(verified.firstname).toBe('Updated');

    const deleteResponse = await booking.deleteBooking(bookingid, token);
    expect(deleteResponse.ok()).toBeTruthy();
  });
});
