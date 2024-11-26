const { connectToDatabase } = require("./db");

class UserAddressData {
  constructor() {
    this.db = connectToDatabase();
  }

  // Get all addresses for a specific user
  async getUserAddress(userId) {
    try {
      const sql = "SELECT * FROM userAddress WHERE userId=?";
      const data = [userId];
      const [addresses] = await (await this.db).execute(sql, data);
      return addresses || [];
    } catch (error) {
      console.error("Error fetching user address:", error.message);
      return [];
    }
  }

  // Add a new address for a user
  async addUserAddress(addressData) {
    try {
      const sql =
        "INSERT INTO userAddress (id, address, district, zilla, upazilla, area, userId) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const data = [
        addressData.id,
        addressData.address,
        addressData.district,
        addressData.zilla,
        addressData.upazilla,
        addressData.area,
        addressData.userId,
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error adding user address:", error.message);
      return null;
    }
  }

  // Update a user's address
  async updateUserAddress(addressId, updates) {
    try {
      const keys = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = keys.map((key) => `${key}=?`).join(", ");
      const sql = `UPDATE userAddress SET ${setClause} WHERE id=?`;
      values.push(addressId);
      const [response] = await (await this.db).execute(sql, values);
      return response;
    } catch (error) {
      console.error("Error updating user address:", error.message);
      return null;
    }
  }

  // Delete a user's address
  async deleteUserAddress(addressId) {
    try {
      const sql = "DELETE FROM userAddress WHERE id=?";
      const data = [addressId];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error deleting user address:", error.message);
      return null;
    }
  }
}

module.exports = UserAddressData;
