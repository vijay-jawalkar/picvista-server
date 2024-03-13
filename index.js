require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const connectToMongoDB = require("./db/connectToMongoDB.js")
const expressSession = require("express-session")
const usersRouter = require("./models/user.model.js")
const passport = require("passport")
const MemoryStore = require('memorystore')(expressSession)

const userRoutes = require("./routes/user.route.js")


// it will create session and save data on server
app.use(expressSession({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser(usersRouter.serializeUser())
  passport.deserializeUser(usersRouter.deserializeUser())

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


app.use('/profileuploads', express.static('./public/images/profile'));
app.use('/postuploads', express.static('./public/images/post'));
app.use("/api/auth", userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    connectToMongoDB()
  console.log(`Example app listening on port ${port}`)
})
