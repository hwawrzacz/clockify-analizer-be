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
const controller = new ClockifyClient();

router.get(`/${USER_ENDPOINT}`, axiosRequestHandler(controller.getUserInfo()));
router.get(
  `/${WORKSPACE_ENDPOINT}`,
  axiosRequestHandler(controller.getWorkspaceList()),
);
router.get(
  `/${WORKSPACES_ENDPOINT}`,
  axiosRequestHandler(controller.getWorkspace()),
);
router.post(`/${TIME_ENTRIES_ENDPOINT}`, (req, res) => {
  const axiosRequest = axiosRequestHandler(controller.getTimeEntries(req.body));
  axiosRequest(req, res);
});
router.get(
  `/${PROJECTS_ENDPOINT}`,
  axiosRequestHandler(controller.getProjects()),
);
// router.get(`/${TASKS_ENDPOINT}`, axiosRequestHandler(controller.getTasks()));
// router.get(`/${TASKS_ENDPOINT}/:taskId`, (req, res) => {
//   const { taskId } = req.params;
//   const axiosRequest = axiosRequestHandler(controller.getTask(taskId));
//   axiosRequest(req, res);
// });

export default router;
