import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/routes/posts.js';
import logger from './src/middleware/logger.js';
import errorHandler from './src/middleware/errorHandler.js';
import notFound from './src/middleware/notFound.js';

const app = express();
const port = 3000 || process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use('/api/posts', router);

// The catch-all for pages not found!
app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
