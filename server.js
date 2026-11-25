// import express from 'express';
// const app = express();
// const port = 4000;
// // Middleware to read JSON data
// app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Welcome to Product API');
// });

// app.post('/products', (req, res) => {
//    const product = req.body;

//     console.log(product);

//     res.status(201).json({
//         message: 'Product created successfully',
//         data: product
//     });
// });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express from "express";
import connectDB from "./db.js";
import productRoutes from "./routes/productRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Test route




app.use("/api/products", productRoutes);

app.use(errorMiddleware);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});