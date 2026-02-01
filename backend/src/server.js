import express from "express" 
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware 
app.use(rateLimiter);
app.use(cors({
    origin: "http://localhost:5173",
}

));

app.use(express.json());  // this middleware helps to parse json data in req body


// our simple custom middleware to log req method and req url
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and req url is ${req.url}`);

    next(); 
});


app.use("/api/notes", notesRoutes);
// app.use("/api/products", productsRoutes);
// app.use("/api/payments", paymentsRoutes);
// app.use("/api/emails", emailsRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    });
});



