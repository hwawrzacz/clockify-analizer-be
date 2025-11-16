import { defaultRequestHandler } from '../request.handler';
import { TimeEntry } from './time-entries.model';
import express from 'express';
import { RecentEntriesService } from './recent-entries.service';
import { TimeEntriesClient } from './time-entries.client';

const RECENT_TIME_ENTRIES = 'recent-time-entries';

const timeEntriesClient = new TimeEntriesClient();
const timeEntriesService = new RecentEntriesService(timeEntriesClient);
const timeEntriesRouter = express.Router();

timeEntriesRouter.get(`/${RECENT_TIME_ENTRIES}`, (req, res) => {
  const request = defaultRequestHandler<TimeEntry[]>(
    timeEntriesService.getRecentEntries(),
  );
  request(req, res);
});

export default timeEntriesRouter;
