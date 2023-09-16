import { Dayjs } from "dayjs";

export type Event = {
  eventId: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  userId: number;
  placed: boolean;
  booked: boolean;
  placedDate: string;
  placedTime: string;
};
