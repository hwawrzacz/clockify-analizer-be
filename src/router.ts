import express from 'express';
import { axiosRequestHandler } from './request.handler';
import { ClockifyClient } from './clockify.client';

const USER_ENDPOINT = 'user';
const WORKSPACE_ENDPOINT = 'workspace';
const WORKSPACES_ENDPOINT = 'workspaces';
const TIME_ENTRIES_ENDPOINT = 'time-entries';
const PROJECTS_ENDPOINT = 'projects';
const TASKS_ENDPOINT = 'tasks';

const router = express.Router();
const client = new ClockifyClient();

router.get(`/${USER_ENDPOINT}`, axiosRequestHandler(client.getUserInfo()));
router.get(
  `/${WORKSPACE_ENDPOINT}`,
  axiosRequestHandler(client.getWorkspaceList()),
);
router.get(
  `/${WORKSPACES_ENDPOINT}`,
  axiosRequestHandler(client.getWorkspace()),
);
router.post(`/${TIME_ENTRIES_ENDPOINT}`, (req, res) => {
  const axiosRequest = axiosRequestHandler(client.getTimeEntries(req.body));
  axiosRequest(req, res);
});

router.get(`/${PROJECTS_ENDPOINT}`, axiosRequestHandler(client.getProjects()));
// router.get(`/${TASKS_ENDPOINT}`, axiosRequestHandler(client.getTasks()));
// router.get(`/${TASKS_ENDPOINT}/:taskId`, (req, res) => {
//   const { taskId } = req.params;
//   const axiosRequest = axiosRequestHandler(client.getTask(taskId));
//   axiosRequest(req, res);
// });

export default router;
