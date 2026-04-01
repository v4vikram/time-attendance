import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';
import { startAttendanceJobs } from './jobs/attendance.job.js';

const startServer = async () => {
  await connectDB();
  
  startAttendanceJobs();

  app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });
};

startServer();
