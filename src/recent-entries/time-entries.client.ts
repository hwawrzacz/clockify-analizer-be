import axios, { AxiosResponse } from 'axios';
import createQueryParams from '../query-params';
import { TimeEntry } from './time-entries.model';

/** Responsible for preparing and making requests to Clockify API */
export class TimeEntriesClient {
  static readonly BASE_CLOCKIFY_API_URL = 'https://api.clockify.me/api/v1';
  static readonly API_KEY = process.env.CLOCKIFY_API_KEY;
  static readonly USER_ID = process.env.CLOCKIFY_USER_ID;
  static readonly WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID;
  private readonly WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID;

  private readonly REQUEST_OBJECT;
  private readonly axios;
  private readonly USER_ENDPOINT = 'user';
  private readonly WORKSPACES_ENDPOINT = 'workspaces';
  private readonly TIME_ENTRIES_ENDPOINT = 'time-entries';
  private readonly PROJECTS_ENDPOINT = 'projects';
  private readonly TASKS_ENDPOINT = 'tasks';

  constructor() {
    if (!TimeEntriesClient.API_KEY) {
      throw Error('No API key provided.');
    }

    this.REQUEST_OBJECT = {
      baseURL: TimeEntriesClient.BASE_CLOCKIFY_API_URL,
      headers: {
        'X-Api-Key': TimeEntriesClient.API_KEY || '',
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 seconds
    };
    this.axios = axios.create(this.REQUEST_OBJECT);
  }

  public async getTimeEntries(
    body: Record<string, string> | undefined = undefined,
  ): Promise<TimeEntry[]> {
    // GET /v1/workspaces/{workspaceId}/user/{userId}/time-entries
    const params = createQueryParams(body);
    const response = await this.axios.get<TimeEntry[]>(
      `/${this.WORKSPACES_ENDPOINT}/${TimeEntriesClient.WORKSPACE_ID}/${this.USER_ENDPOINT}/${TimeEntriesClient.USER_ID}/${this.TIME_ENTRIES_ENDPOINT}?${params}`,
    );

    return response.data.map((timeEntryDto) =>
      TimeEntry.fromTimeEntryApiDto(timeEntryDto),
    );
  }

  public async getProjects(): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects
    return this.axios.get(
      `/${this.WORKSPACES_ENDPOINT}/${TimeEntriesClient.WORKSPACE_ID}/${this.PROJECTS_ENDPOINT}`,
    );
  }

  public async getTasks(): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects/{projectId}/tasks
    return this.axios.get(
      `/${this.WORKSPACES_ENDPOINT}/${TimeEntriesClient.WORKSPACE_ID}/${this.TASKS_ENDPOINT}`,
    );
  }

  public async getTask(taskId: number | string): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}
    return this.axios.get(
      `/${this.WORKSPACES_ENDPOINT}/${TimeEntriesClient.WORKSPACE_ID}/${this.TASKS_ENDPOINT}/${taskId.toString()}`,
    );
  }
}
