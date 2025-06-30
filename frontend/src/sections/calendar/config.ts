export type EventProps = {
    Id: number | string;
    Subject: string;
    StartTime: string;
    EndTime: string;
    IsAllDay?: boolean;
    Location?: string;
    Description?: string;
    RecurrenceRule?: string;
    RecurrenceID?: number;
    RecurrenceException?: string;
    FollowingID?: number;
    StartTimezone?: string;
    EndTimezone?: string;
    CategoryColor?: string;
    IsReadonly?: boolean;
    Status?: string;
    Priority?: string;
    UserId?: number;
  }