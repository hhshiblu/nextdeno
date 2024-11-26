const { connectToDatabase } = require("./db");

class ProductQuery {
  constructor() {
    this.db = null; // Initialize db as null
    this.init();
  }

  async init() {
    this.db = await connectToDatabase(); // Assign the database pool asynchronously
  }

  // insert value for create Product
  async saveProductInfo(productData) {
    try {
      if (!this.db) throw new Error("Database connection is not initialized");
      const keys = Object.keys(productData);
      const values = Object.values(productData).map((value) =>
        Array.isArray(value) ? JSON.stringify(value) : value
      );

      // Dynamically construct the SQL query
      const placeholders = keys.map(() => "?").join(", "); // Example: '?, ?, ?'
      const query = `INSERT INTO products (${keys.join(
        ", "
      )}) VALUES (${placeholders})`;

      const [result] = await this.db.query(query, values);
      return { success: true };
    } catch (error) {
      console.error("Error saving product info:", error);
      return { success: false, error };
    }
  }
  // get all products query
  async getProducts() {
    try {
      const sql = "SELECT * FROM products";
      const [product] = await this.db.execute(sql);
      return product;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return error;
    }
  }
  //get product use slug  ..alug also primary key
  async getProductBySlug(slug) {
    try {
      const sql = "SELECT * FROM products WHERE slug = ?  AND active  =1 ";
      const [product] = await (await this.db).execute(sql, [slug]);
      return product[0];
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return error;
    }
  }

  // update product status with slug
  async updateProductStatus(id) {
    try {
      const sql = `
      UPDATE products
      SET active = CASE
          WHEN active = 1 THEN 0
          ELSE 1
      END
      WHERE id = ?;
    `;
      const [result] = await (await this.db).execute(sql, [id]);

      if (result.affectedRows === 0) {
        return { error: "product not found or status not updated" };
      }

      return true;
    } catch (error) {
      return { error: "Failed to toggle product status" };
    }
  }

  //query and search for products
  async getProductsBySearchParams({
    minPrice,
    maxPrice,
    category,
    name,
    productName,
    rating,
  }) {
    try {
      // Start building the SQL query
      let sql = "SELECT * FROM products WHERE 1=1"; // "1=1" is a placeholder for AND conditions

      // Array to hold parameters for prepared statements
      const params = [];

      // Dynamically add conditions based on the provided search parameters
      if (minPrice) {
        sql += " AND price >= ?";
        params.push(minPrice);
      }

      if (maxPrice) {
        sql += " AND price <= ?";
        params.push(maxPrice);
      }

      if (category) {
        sql += " AND category = ?";
        params.push(category);
      }

      if (name) {
        sql += " AND name LIKE ?";
        params.push(`%${name}%`); // Use LIKE to search for partial matches
      }

      if (productName) {
        sql += " AND product_name LIKE ?";
        params.push(`%${productName}%`); // Use LIKE for product_name search
      }

      if (rating) {
        sql += " AND rating >= ?";
        params.push(rating); // Filter products by minimum rating
      }

      console.log("SQL Query:", sql);
      console.log("Parameters:", params);

      // Execute the query with the dynamic SQL and parameters
      const [products] = await this.db.execute(sql, params);

      // Return the filtered products
      return products;
    } catch (error) {
      console.error("Error fetching products by search parameters:", error);
      return { success: false, error };
    }
  }

  // Delete product by slug

  async deleteProductById(id) {
    try {
      // SQL query to delete a product by its slug
      const sql = "DELETE FROM products WHERE id = ?";

      // Execute the query with the slug as the parameter
      const [result] = await this.db.execute(sql, [id]);

      // If no rows were affected, the product wasn't found
      if (result.affectedRows === 0) {
        return { success: false, message: "Product not found" };
      }

      return true;
    } catch (error) {
      console.error("Error deleting product by slug:", error);
      return { success: false, error };
    }
  }

  //delete multiple products use slug

  async deleteProductsByIds(ids) {
    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        return { success: false, message: "No ids provided" };
      }

      const placeholders = ids.map(() => "?").join(",");
      const sql = `DELETE FROM products WHERE id IN (${placeholders});`;

      const [result] = await this.db.execute(sql, ids);
      if (result.affectedRows === 0) {
        return {
          success: false,
          message: "No products found for the given slugs",
        };
      }

      return true;
    } catch (error) {
      console.error("Error deleting products by slugs:", error);
      return { success: false, error };
    }
  }
}

module.exports = ProductQuery;
