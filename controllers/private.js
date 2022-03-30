exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    data: "You have access to this private data",
  });
};
