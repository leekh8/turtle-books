function adminRequired(req, res, next) {
  const userRole = req.role;

  if (userRole !== "admin") {
    const e = new Error(
      "관리자 권한이 없으므로, 이 API에 대한 사용을 불허합니다."
    );
    e.statusCode = 403;
    next(e);
  }
  next();
}
module.exports = adminRequired;
