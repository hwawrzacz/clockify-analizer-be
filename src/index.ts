import dotenv from "dotenv";
import { Server } from './server'

// Load config via dotenv
dotenv.config();
const server = new Server();
