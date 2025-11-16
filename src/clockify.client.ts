import axios, { AxiosResponse } from 'axios';
import createQueryParams from './query-params';

/** Responsible for preparing and making requests to Clockify API */
export class ClockifyClient {
  static readonly BASE_CLOCKIFY_API_URL = 'https://api.clockify.me/api/v1';
  static readonly API_KEY = process.env.CLOCKIFY_API_KEY;
  static readonly USER_ID = process.env.CLOCKIFY_USER_ID;
  static readonly WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID;
  private readonly WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID;

  private readonly REQUEST_OBJECT;
  private readonly clockify;
  private readonly USER_ENDPOINT = 'user';
  private readonly WORKSPACES_ENDPOINT = 'workspaces';
  private readonly TIME_ENTRIES_ENDPOINT = 'time-entries';
  private readonly PROJECTS_ENDPOINT = 'projects';
  private readonly TASKS_ENDPOINT = 'tasks';

  constructor() {
    if (!ClockifyClient.API_KEY) {
      throw Error('No API key provided.');
    }

    this.REQUEST_OBJECT = {
      baseURL: ClockifyClient.BASE_CLOCKIFY_API_URL,
      headers: {
        'X-Api-Key': ClockifyClient.API_KEY || '',
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 seconds
    };
    this.clockify = axios.create(this.REQUEST_OBJECT);
  }

  public async getUserInfo(): Promise<AxiosResponse> {
    // GET /v1/user
    return this.clockify.get(`/${this.USER_ENDPOINT}`);
  }

  public async getWorkspaceList(): Promise<AxiosResponse> {
    // GET /v1/workspaces
    return this.clockify.get(`/${this.WORKSPACES_ENDPOINT}`);
  }

  public async getWorkspace(): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${this.WORKSPACE_ID}`,
    );
  }

  public async getTimeEntries(
    body: Record<string, string>,
  ): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/user/{userId}/time-entries
    const params = createQueryParams(body);
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${ClockifyClient.WORKSPACE_ID}/${this.USER_ENDPOINT}/${ClockifyClient.USER_ID}/${this.TIME_ENTRIES_ENDPOINT}?${params}`,
    );
  }

  public async getRecentTimeEntries(
    body: Record<string, string> | undefined = undefined,
  ): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/user/{userId}/time-entries
    const params = createQueryParams(body);
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${ClockifyClient.WORKSPACE_ID}/${this.USER_ENDPOINT}/${ClockifyClient.USER_ID}/${this.TIME_ENTRIES_ENDPOINT}?${params}`,
    );
  }

  public async getProjects(): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${ClockifyClient.WORKSPACE_ID}/${this.PROJECTS_ENDPOINT}`,
    );
  }

  public async getTasks(): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects/{projectId}/tasks
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${ClockifyClient.WORKSPACE_ID}/${this.TASKS_ENDPOINT}`,
    );
  }

  public async getTask(taskId: number | string): Promise<AxiosResponse> {
    // GET /v1/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}
    return this.clockify.get(
      `/${this.WORKSPACES_ENDPOINT}/${ClockifyClient.WORKSPACE_ID}/${this.TASKS_ENDPOINT}/${taskId.toString()}`,
    );
  }
}
