import { 
    ProductRegister, 
    bySKU, 
    UpdateProductStock, 
    DeleteProduct, 
    getProducts } from '../models/productsModel.js';
import prepareHateoas from '../helpers/hateoas.js';



const getAllProductsLimits = async (req,res) => {

    console.log(req.query)

    try {

            const {order_by, page, limits} = req.query;
            const products = await getProducts(order_by,limits,page);
            const productsWithHateoas = await prepareHateoas("products", products);
            res.status(200).json(productsWithHateoas);

        
    } catch (error) {
        console.log("error", error);
    }
    

}


export { getAllProductsLimits };