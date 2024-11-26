const { connectToDatabase } = require("./db");

class SellerData {
  constructor() {
    this.db = connectToDatabase();
  }

  // Get all sellers
  async getAllSellers() {
    try {
      const sql = "SELECT * FROM sellers";
      const [sellers] = await (await this.db).execute(sql);
      return sellers || [];
    } catch (error) {
      console.error("Error fetching all sellers:", error.message);
      return [];
    }
  }
  //growth

  async getMonthlySellerGrowth() {
    try {
      const sql = `
      SELECT 
          DATE_FORMAT(MIN(created_at), '%b') AS month, 
          COUNT(*) AS users
      FROM sellers
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY MIN(created_at);
    `;
      const [growthData] = await (await this.db).execute(sql);
      return growthData || [];
    } catch (error) {
      console.error("Error fetching user growth data:", error.message);
      return [];
    }
  }
  // Create a new seller
  async createSeller(sellerData) {
    try {
      const sql =
        "INSERT INTO sellers (id, name, slug, shopName, description, password, category,email,phoneNumber, active) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?,?)";
      const data = [
        sellerData.id,
        sellerData.name,
        sellerData.slug,
        sellerData.shopName,
        sellerData.description,
        sellerData.password,
        sellerData.category,
        sellerData.email,
        sellerData.phoneNumber,
        false, // Default active status is false
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error creating seller:", error.message);
      return null;
    }
  }

  async deleteSellersByIds(idArray) {
    try {
      if (!idArray || idArray.length === 0) {
        return { error: "No IDs provided for deletion" };
      }

      const placeholders = idArray.map(() => "?").join(","); // Generate placeholders for each ID
      const sql = `DELETE FROM sellers WHERE id IN (${placeholders});`;

      const [result] = await (await this.db).execute(sql, idArray);

      if (result.affectedRows === 0) {
        return { error: "No users found to delete" };
      }

      return true;
    } catch (error) {
      console.error("Error deleting users:", error.message);
      return { error: "Failed to delete users" };
    }
  }

  // Delete a user by ID
  async deleteSellerById(userId) {
    try {
      const sql = "DELETE FROM sellers WHERE id=?";
      const data = [userId];
      const [response] = await (await this.db).execute(sql, data);
      console.log(response);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      return null;
    }
  }
  async getSellerById(userId) {
    try {
      const sql = "SELECT * FROM sellers WHERE id = ?;";
      const [user] = await (await this.db).execute(sql, [userId]);

      if (user.length === 0) {
        return { error: "User not found" };
      }

      return user[0]; // Return the first (and expectedly only) result
    } catch (error) {
      console.error("Error fetching user by ID:", error.message);
    }
  }
  // Update user status
  async toggleSellerStatus(userId) {
    console.log(userId);

    try {
      const sql = `
      UPDATE sellers
      SET active = CASE
          WHEN active = 1 THEN 0
          ELSE 1
      END
      WHERE id = ?;
    `;
      const [result] = await (await this.db).execute(sql, [userId]);

      if (result.affectedRows === 0) {
        return { error: "User not found or status not updated" };
      }

      return true;
    } catch (error) {
      console.error("Error toggling user status:", error.message);
      return { error: "Failed to toggle user status" };
    }
  }

  // Update seller information dynamically
  // async updateSellerInfo(sellerId, updates) {
  //   try {
  //     // Dynamically build SQL query based on provided updates
  //     const keys = Object.keys(updates);
  //     const values = Object.values(updates);

  //     // Construct the SET clause
  //     const setClause = keys.map((key) => `${key}=?`).join(", ");
  //     const sql = `UPDATE seller SET ${setClause} WHERE id=?`;

  //     // Add seller ID to the end of the values array
  //     values.push(sellerId);

  //     const [response] = await (await this.db).execute(sql, values);
  //     return response;
  //   } catch (error) {
  //     console.error("Error updating seller info:", error.message);
  //     return null;
  //   }
  // }
}

module.exports = SellerData;
