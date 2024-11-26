const { connectToDatabase } = require("./db");

class UserData {
  constructor() {
    this.db = connectToDatabase();
  }

  // Get all users
  async getAllUsers() {
    try {
      const sql = "SELECT * FROM users";
      const [users] = await (await this.db).execute(sql);
      return users || [];
    } catch (error) {
      console.error("Error fetching all users:", error.message);
      return [];
    }
  }

  // async getMonthlyUserGrowth() {
  //   try {
  //     const sql = `
  //     SELECT
  //         DATE_FORMAT(created_at, '%b') AS month,
  //         COUNT(*) AS users
  //     FROM users
  //     GROUP BY DATE_FORMAT(created_at, '%Y-%m')
  //     ORDER BY DATE_FORMAT(created_at, '%Y-%m');
  //   `;
  //     const [growthData] = await (await this.db).execute(sql);
  //     return growthData || [];
  //   } catch (error) {
  //     console.error("Error fetching user growth data:", error.message);
  //     return [];
  //   }
  // }
  async getMonthlyUserGrowth() {
    try {
      const sql = `
      SELECT 
          DATE_FORMAT(MIN(created_at), '%b') AS month, 
          COUNT(*) AS users
      FROM users
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

  // Create a new user
  async createUser(userData) {
    try {
      const sql =
        "INSERT INTO users (id, slug, name, phoneNumber, password, active) VALUES (?, ?, ?, ?, ?, ?)";
      const data = [
        userData.id,
        userData.slug,
        userData.name,
        userData.phoneNumber,
        userData.password,
        false, // Default active status is false
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error creating user:", error.message);
      return null;
    }
  }

  async deleteUsersByIds(idArray) {
    try {
      if (!idArray || idArray.length === 0) {
        return { error: "No IDs provided for deletion" };
      }

      const placeholders = idArray.map(() => "?").join(","); // Generate placeholders for each ID
      const sql = `DELETE FROM users WHERE id IN (${placeholders});`;

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
  async deleteUserById(userId) {
    try {
      const sql = "DELETE FROM users WHERE id=?";
      const data = [userId];
      const [response] = await (await this.db).execute(sql, data);
      console.log(response);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      return null;
    }
  }
  async getUserById(userId) {
    try {
      const sql = "SELECT * FROM users WHERE id = ?;";
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
  async toggleUserStatus(userId) {
    try {
      const sql = `
      UPDATE users
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
}

module.exports = UserData;
