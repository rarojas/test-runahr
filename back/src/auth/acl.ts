export const checkRole = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) next();
    else {
      res.status(403).json({
        status: 'Access Denied',
        success: false,
        message: 'You are not authorized to access this resource'
      });
    }
  };
};
