import { TimeEntry, TimeEntryApiDto } from './time-entries.model';

export class TimeEntryMapper {
  public static fromTimeEntryApiDto(
    dto: TimeEntryApiDto,
    timeEntry: TimeEntry,
  ): TimeEntry {
    timeEntry.id = dto.id;
    timeEntry.description = dto.description;
    timeEntry.projectId = dto.projectId;
    timeEntry.taskId = dto.taskId;
    timeEntry.tagIds = dto.tagIds;
    timeEntry.timeInterval = dto.timeInterval;
    timeEntry.type = dto.type;
    timeEntry.userId = dto.userId;
    timeEntry.workspaceId = dto.workspaceId;

    return timeEntry;
  }
}
