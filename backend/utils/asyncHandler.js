// Wraps async route handlers to automatically pass errors to Express's next()
// Usage: export const myHandler = asyncHandler(async (req, res, next) => { ... })
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
