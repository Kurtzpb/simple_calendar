// types exports
export type DayType = {
  [date: string]: Array<EventType>;
};

export type EventType = {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
};

export type CalculatedStyles = {
  id: number;
  width: string;
  left: string;
};

export type UserType = {
  userName: string | null;
  token: string | null;
};
