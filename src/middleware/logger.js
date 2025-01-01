import colors from 'colors';

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`.red
  );
  next();
};

export default logger;
