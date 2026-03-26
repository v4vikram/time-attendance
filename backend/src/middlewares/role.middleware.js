import { ApiError } from '../utils/ApiError.js';

// Restrict access to users with one of the allowed roles.
// Assumes `protect` middleware ran earlier and set `req.user`.
export const restrictTo = (...allowedRoles) => (req, res, next) => {
  const userRole = req.user?.role;
  if (!userRole || !allowedRoles.includes(userRole)) {
    throw new ApiError(403, 'Forbidden');
  }
  next();
};