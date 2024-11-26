const { connectToDatabase } = require("./db");

class CartQuery {
  constructor() {
    this.db = null; // Initialize db as null
    this.init();
  }

  async init() {
    this.db = await connectToDatabase(); // Assign the database pool asynchronously
  }

  // Add item to cart or update quantity if the product already exists
  async addToCart({ id, userId, productId, quantity }) {
    try {
      if (!this.db) throw new Error("Database connection is not initialized");

      // Check if the item already exists in the cart
      const checkQuery = `SELECT * FROM cart WHERE userId = ? AND productId = ?`;
      const [existingItem] = await this.db.execute(checkQuery, [
        userId,
        productId,
      ]);

      if (existingItem.length > 0) {
        return {
          success: false,
          message: "Item already exists",
        };
      } else {
        // If the item doesn't exist, insert a new entry
        const insertQuery = `
          INSERT INTO cart (id,userId, productId, quantity)
          VALUES (?,?, ?, ?)
        `;
        await this.db.execute(insertQuery, [id, userId, productId, quantity]);
      }

      return { success: true, message: "Cart updated successfully" };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, error };
    }
  }

  // Get all cart items for a user
  async getCartItems(userId) {
    try {
      const query = `
        SELECT 
          c.id AS cartId,
          c.quantity,
          c.userId,
          p.id AS productId,
         p.productName,
          p.price,
          (c.quantity * p.price) AS totalPrice
        FROM cart c
        JOIN products p ON c.productId = p.id
        WHERE c.userId = ?
      `;
      const [items] = await this.db.execute(query, [userId]);

      const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

      return { items, totalPrice };
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { success: false, error };
    }
  }

  // Get the total number of unique products and quantities in the cart for a user
  async getCartLength(userId) {
    try {
      const query = `
      SELECT 
        COUNT(*) AS uniqueItems,
        SUM(quantity) AS totalQuantity
      FROM cart
      WHERE user_id = ?
    `;
      const [[result]] = await this.db.execute(query, [userId]);

      return {
        uniqueItems: result.uniqueItems || 0,
        totalQuantity: result.totalQuantity || 0,
      };
    } catch (error) {
      console.error("Error fetching cart length:", error);
      return { success: false, error };
    }
  }

  // Increase quantity of a product
  async increaseQuantity(userId, productId) {
    try {
      const query = `
        UPDATE cart
        SET quantity = quantity + 1
        WHERE userId = ? AND productId = ?
      `;
      const [result] = await this.db.execute(query, [userId, productId]);
      return { success: true, result };
    } catch (error) {
      console.error("Error increasing quantity:", error);
      return { success: false, error };
    }
  }

  // Decrease quantity of a product
  async decreaseQuantity(userId, productId) {
    try {
      const query = `
        UPDATE cart
        SET quantity = quantity - 1
        WHERE userId = ? AND productId = ? AND quantity > 1
      `;
      const [result] = await this.db.execute(query, [userId, productId]);

      return { success: true, result };
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      return { success: false, error };
    }
  }
  // Remove product from cart
  async removeCartProduct(userId, productId) {
    try {
      const sql = "DELETE FROM cart WHERE userId = ? AND productId = ?";
      const [result] = await this.db.execute(sql, [userId, productId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw new Error("Failed to remove product from cart");
    }
  }
}

module.exports = CartQuery;
