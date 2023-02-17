//errorHandler is inbuilt function that we overrride and changed
//pela HTML as error aavti ti now JSON aavse after we changed this

const errorHandler = (err, req, res, next) => {
  //aapni response error chhe eno statusCode hoy to e nakar 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  //status set kairu
  res.status(statusCode);

  //JSON file response trike set kari
  //err.message je aapne throw new Error vadu karyu e
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
