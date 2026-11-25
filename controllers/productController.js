import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res,next) => {
    try {
        const { name, price } = req.query;

        // Build search filter
        const filter = {};

        if (name) {
            filter.name = {
                $regex: name,
                $options: "i" // Case-insensitive search
            };
        }

        if (price) {
            filter.price = Number(price);
        }

        const products = await Product.find(filter);
         if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
         return res.status(200).json({
            message: "Products fetched successfully",
            count: products.length,
            products
        });

    } catch (error) {
        next(error);
    }
};


export const getProductById = async (req, res,next) => {
    // Your code here

      const id = req.params.id;
      
    try {
        if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
        message: "Invalid product ID"
    });
}
        const product = await Product.findById(id);
       if(!product){
      
         return res.status(404).json({
        message: "Product not found"
    });
}
       else{
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        });
       }
            
       
   

    } 
       catch (error) {
     next(error);
}
    
};

// export const updateProduct = async (req, res) => {

//     const id = req.params.id;
//     console.log(id);
//     try {
//        // const product = await Product.findByIdAndUpdate(id);
//         console.log("1. Product ID:", id);
//         console.log("2. Request Body:", req.body);
//         const updatedProduct =  await Product.findByIdAndUpdate(
//     id,
//      req.body,
//     {returnDocument: 'after'} 
// );

//        if(!updatedProduct){
//        return res.status(404).send("Product not updated");
//        }
//        else{
//       return res.status(200).json({
//             message: "Product updated successfully",
//             updatedProduct
//         });
//        }
            
       
   

//     } catch (error) {
//       return res.status(500).json({
//             message: error.message
//         });
//     }

// }

export const updateProductpartial = async (req, res,next) => {

    const id = req.params.id;
    
    try {
       // const product = await Product.findByIdAndUpdate(id);
        console.log("1. Product ID:", id);
        console.log("2. Request Body:", req.body);

         if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
        message: "Product not found"
    });
}
if (Object.keys(req.body).length === 0) {
    // Return 400
    return res.status(400).json({
        message: "No fields provided for update"
    });
}
const allowedFields = ["name", "price"];
 const fields = Object.keys(req.body);

let message = "";
if (fields.some(field => !allowedFields.includes(field))) {
    return res.status(400).json({
        message: "Invalid field provided"
    });
}
  // 4. Validate name
        if (req.body.name !== undefined) {
            if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
                return res.status(400).json({
                    message: "Name must be a non-empty string"
                });
            }

            req.body.name = req.body.name.trim();
        }

        // 5. Validate price
        if (req.body.price !== undefined) {
            if (
                typeof req.body.price !== "number" ||
                !Number.isFinite(req.body.price) ||
                req.body.price < 0
            ) {
                return res.status(400).json({
                    message: "Price must be a valid number greater than or equal to 0"
                });
            }
        }
   
if (fields.includes("name") && fields.includes("price")) {
    message = "Product name and price updated successfully";
} else if (fields.includes("name")) {
    message = "Product name updated successfully";
} else if (fields.includes("price")) {
    message = "Product price updated successfully";
}
        
        const updatedProduct =  await Product.findByIdAndUpdate(
    id,
    req.body,
   {returnDocument: 'after',
    runValidators: true
   } 
   
);

       if(!updatedProduct){
      return res.status(404).json({
        message: "Product not found"
    });
       
       }
       else{
        return res.status(200).json({
            message,
            updatedProduct
        });
       }
            
       
   

    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res,next) => {
    try {
        const { name, price } = req.body;
        console.log("Request body:", req.body);
       if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
        message: "Product name is required"
    });

      
}
 if (typeof price !== "number" || price < 0 || !Number.isFinite(price)) {
    return res.status(400).json({
        message: "Price must be a valid number greater than or equal to 0"
    });
}
        const product = await Product.create({
            name: name.trim(),
            price
        });

       return res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
         next(error);
    }
}

export const deleteProduct = async (req, res,next) => {
    const id = req.params.id;
    console.log(id);
    try {
          if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
        message: "Invalid product ID"
    });
}
        const pid = await Product.findByIdAndDelete(id);
        console.log(pid);
       if(!pid){
       return res.status(404).json({
        message: "Invalid product ID"
    });
       }
       else{
        return res.status(204).send();
       }
            
       
   

    } catch (error) {
         next(error);
    }
}
