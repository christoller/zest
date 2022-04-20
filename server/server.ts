if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
import express, { Request, Response } from "express";
import { userRoutes, sessionRoutes, pantryRoutes} from './routes/index';
import path from "path";

const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');

( async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB connected');


const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;



app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.use(session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collection: 'sessions',
        ttl: parseInt(process.env.SESSION_LIFETIME) / 1000
      }),
      cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000000
      }
    }));

// Set Routes
const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/sessions', sessionRoutes);
    apiRouter.use('/pantry', pantryRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}

app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

  } catch (err) {
    console.log(err)
  }
})();