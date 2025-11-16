import { TimeEntryMapper } from './time-entry.mapper';

export type TagId = string;
export type ProjectId = string;
export type TaskId = string;
export type UserId = string;
export type WorkspaceId = string;
export type DateIsoString = string;
export type DateTimeIsoString = string;

export type TimeEntryType = 'BREAK' | string;

export interface TimeInterval {
  duration: string; // e.g. "8000"
  start: DateTimeIsoString; // ISO Date
  end: DateTimeIsoString; // ISO Date
}

export interface TimeEntryApiDto {
  id: string;
  description: string;
  projectId: ProjectId;
  taskId: TaskId;
  tagIds: TagId[];
  timeInterval: TimeInterval;
  type: TimeEntryType;
  userId: UserId;
  workspaceId: WorkspaceId;
}

export class TimeEntry implements TimeEntryApiDto {
  public id!: string;
  public description!: string;
  public projectId!: ProjectId;
  public taskId!: TaskId;
  public tagIds!: TagId[];
  public timeInterval!: TimeInterval;
  public type!: TimeEntryType;
  public userId!: UserId;
  public workspaceId!: WorkspaceId;

  protected constructor() {}

  public getTimeEntryDate(): DateIsoString | null {
    return this.timeInterval.start.split('T')[0] ?? null;
  }

  public static fromTimeEntryApiDto(dto: TimeEntryApiDto): TimeEntry {
    return TimeEntryMapper.fromTimeEntryApiDto(dto, new TimeEntry());
  }
}
