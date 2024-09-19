const adminmiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.is_Admin;
    if (!adminRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminmiddleware;
    