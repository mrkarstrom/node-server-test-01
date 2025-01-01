import e from 'express';
import router from './src/routes/posts.js';
import logger from './src/middleware/logger.js';
import errorHandler from './src/middleware/errorHandler.js';
import notFound from './src/middleware/notFound.js';
const app = e();
const port = 3000 || process.env.PORT;

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use('/api/posts', router);

app.use(logger);

// The catch-all for pages not found!
app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
