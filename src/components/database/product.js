const { connectToDatabase } = require("./db");

class ProductQuery {
  constructor() {
    this.db = connectToDatabase();
  }

  async saveProductInfo(productData) {
    console.log("here db", productData);

    try {
      const sql = `
        INSERT INTO products (
          id,product_name,slug, description, category, price, sku, stock,
          capacity, brand, weight, dimensions,  sizes, colors, keywords
        )
        VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        productData.id,
        productData.productName,
        productData.slug,
        productData.description,
        productData.category,
        parseInt(productData.price),
        productData.sku,
        parseInt(productData.stock, 10),
        productData.capacity,
        productData.brand,
        productData.weight,
        productData.dimensions,
        // JSON.stringify(productData.images), // Convert array to JSON string
        JSON.stringify(productData.sizes), // Convert array to JSON string
        JSON.stringify(productData.colors), // Convert array to JSON string
        JSON.stringify(productData.keywords), // Convert array to JSON string
      ];

      const [result] = await (await this.db).execute(sql, values);
      return { success: true, insertId: result.insertId };
    } catch (error) {
      console.error("Error saving product info:", error);
      return { success: false, error };
    }
  }

  async getProducts() {
    try {
      const sql = "SELECT * FROM products";
      const [product] = await (await this.db).execute(sql);
      return product;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return error;
    }
  }
  async getProductBySlug(slug) {
    try {
      const sql = "SELECT * FROM products WHERE slug = ?";
      const [product] = await (await this.db).execute(sql, [slug]);
      return product[0];
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return error;
    }
  }
}

module.exports = ProductQuery;
