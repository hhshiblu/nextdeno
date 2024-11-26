class WishlistQuery {
  constructor() {
    this.db = null;
    this.init();
  }

  async init() {
    this.db = await connectToDatabase();
  }

  // Add product to wishlist
  async addToWishlist(userId, productId) {
    try {
      // Check if the product is already in the wishlist
      const checkQuery = `
        SELECT * FROM wishlist WHERE userId = ? AND productId = ?
      `;
      const [existing] = await this.db.execute(checkQuery, [userId, productId]);

      if (existing.length > 0) {
        return { success: false, message: "Item already in wishlist" };
      }

      // Insert the product into the wishlist
      const insertQuery = `
        INSERT INTO wishlist (userId, productId) VALUES (?, ?)
      `;
      const [result] = await this.db.execute(insertQuery, [userId, productId]);

      return { success: true };
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return { success: false, error: error.message };
    }
  }

  // Get wishlist items by userId
  async getWishlist(userId) {
    try {
      const query = `
        SELECT w.productId, p.name, p.price, p.image
        FROM wishlist w
        JOIN products p ON w.productId = p.id
        WHERE w.userId = ?
      `;
      const [wishlist] = await this.db.execute(query, [userId]);

      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return { success: false, error: error.message };
    }
  }

  // Remove a product from the wishlist
  async removeFromWishlist(userId, productId) {
    try {
      const query = `
        DELETE FROM wishlist WHERE userId = ? AND productId = ?
      `;
      const [result] = await this.db.execute(query, [userId, productId]);

      if (result.affectedRows === 0) {
        return { success: false, message: "Item not found in wishlist" };
      }

      return { success: true };
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = WishlistQuery;
