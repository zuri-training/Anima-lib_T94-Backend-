const connection= require("./src/db/index")
const app = require("./src/app");
const dotenv = require('dotenv');
const userRoutes = require("./src/routes/user/users");
const authRoutes = require("./src/routes/user/Auth");


dotenv.config()
// database connection
connection();

// routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);






const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));