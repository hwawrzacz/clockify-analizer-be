import { TimeEntriesClient } from './time-entries.client';
import { TimeEntry } from './time-entries.model';

export class RecentEntriesService {
  constructor(private timeEntriesClient: TimeEntriesClient) {}
  public async getRecentEntries(): Promise<TimeEntry[]> {
    try {
      const recentTimeEntries = await this.timeEntriesClient.getTimeEntries();
      return this.getEntriesFromRecentDay(recentTimeEntries);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  private getEntriesFromRecentDay(timeEntries: TimeEntry[]): TimeEntry[] {
    const groupedTimeEntries = this.groupTimeEntriesByStartDate(timeEntries);
    const datesSortedAscending = Object.keys(groupedTimeEntries).sort();
    const recentDate = datesSortedAscending[datesSortedAscending.length - 1];

    return timeEntries.filter((timeEntry: TimeEntry) => {
      const timeEntryDate = timeEntry.getTimeEntryDate();

      return !!timeEntryDate && timeEntryDate === recentDate;
    });
  }

  private groupTimeEntriesByStartDate(
    timeEntries: TimeEntry[],
  ): Record<string, TimeEntry[]> {
    return timeEntries.reduce(
      (groups, entry) => {
        const startDate = entry.getTimeEntryDate(); // extract YYYY-MM-DD
        if (!startDate) return groups;
        if (!groups[startDate]) groups[startDate] = [];
        groups[startDate].push(entry);
        return groups;
      },
      {} as Record<string, TimeEntry[]>,
    );
  }
}
