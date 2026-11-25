import express from "express";
import { getProducts,getProductById,updateProductpartial,createProduct,deleteProduct} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
//router.put("/:id", updateProduct);
router.patch("/:id", updateProductpartial);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
export default router;