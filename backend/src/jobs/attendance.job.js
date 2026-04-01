import cron from 'node-cron';
import { Attendance } from '../modules/attendance/attendance.model.js';
import { checkOutToday } from '../modules/attendance/attendance.service.js';

export const startAttendanceJobs = () => {
  cron.schedule('59 23 * * *', async () => {
    console.log('[CRON] Running end-of-day auto checkout job...');
    
    const dateOpts = new Date();
    const year = dateOpts.getUTCFullYear();
    const month = String(dateOpts.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateOpts.getUTCDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    try {
      const pendingAttendances = await Attendance.find({
        date: dateStr,
        checkIn: { $ne: null },
        checkOut: null,
      });

      console.log(`[CRON] Found ${pendingAttendances.length} pending checkouts.`);

      for (const record of pendingAttendances) {
        try {
          await checkOutToday(record.employee, true);
        } catch (err) {
          console.error(`[CRON] Failed to auto-checkout user ${record.employee}:`, err);
        }
      }
      
      console.log('[CRON] End-of-day auto checkout job completed.');
    } catch (error) {
      console.error('[CRON] Error during auto checkout job:', error);
    }
  });
  
  console.log('[CRON] Scheduled attendance cron jobs.');
};