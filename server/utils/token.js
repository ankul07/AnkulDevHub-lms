const sendToken = (student, statusCode, res) => {
  const token = student.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("studentToken", token, options).json({
    success: true,
    data: student,
    message: "Student Login Successfully",
  });
};

module.exports = sendToken;
