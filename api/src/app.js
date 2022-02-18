const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const config = require('./services/config');

// require route directory
const profilesRoutes = require('./routes/profiles');
const postsRoutes = require('./routes/posts');
const fileRoutes = require('./routes/files');
const selectRoutes = require('./routes/select');
const authRoutes = require('./routes/auth');
const logs = require('./middlewares/logs');
const errors = require('./middlewares/errors');
const middlewareServices = require('./services/middlewares');
const googleStrategy = require('./services/strategies/google.strategy');
const facebookStrategy = require('./services/strategies/facebook.strategy');

app.use(logs(middlewareServices));
app.use(cors());

const portApp = config.appPort;

googleStrategy().registerStrategy();
facebookStrategy().registerStrategy();

app.use(googleStrategy().passport.initialize());
app.use(facebookStrategy().passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/profiles', profilesRoutes);
app.use('/posts', postsRoutes);
app.use('/files', fileRoutes);
app.use('/select', selectRoutes);
app.use('/auth', authRoutes);

// eslint-disable-next-line no-unused-vars
app.use(errors);

app.listen(portApp, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at: http://localhost:${portApp}`);
});
