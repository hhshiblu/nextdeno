const { connectToDatabase } = require("./db");

class SellerAddressData {
  constructor() {
    this.db = connectToDatabase();
  }

  // Get all addresses for a specific seller
  async getSellerAddress(sellerId) {
    try {
      const sql = "SELECT * FROM sellerAddress WHERE sellerId=?";
      const data = [sellerId];
      const [addresses] = await (await this.db).execute(sql, data);
      return addresses || [];
    } catch (error) {
      console.error("Error fetching seller address:", error.message);
      return [];
    }
  }

  // Add a new address for a seller
  async addSellerAddress(addressData) {
    try {
      const sql =
        "INSERT INTO sellerAddress (id, address, district, zilla, upazilla, area, sellerId) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const data = [
        addressData.id,
        addressData.address,
        addressData.district,
        addressData.zilla,
        addressData.upazilla,
        addressData.area,
        addressData.sellerId,
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error adding seller address:", error.message);
      return null;
    }
  }

  // Update a seller's address
  async updateSellerAddress(addressId, updates) {
    try {
      const keys = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = keys.map((key) => `${key}=?`).join(", ");
      const sql = `UPDATE sellerAddress SET ${setClause} WHERE id=?`;
      values.push(addressId);
      const [response] = await (await this.db).execute(sql, values);
      return response;
    } catch (error) {
      console.error("Error updating seller address:", error.message);
      return null;
    }
  }

  // Delete a seller's address
  async deleteSellerAddress(addressId) {
    try {
      const sql = "DELETE FROM sellerAddress WHERE id=?";
      const data = [addressId];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error deleting seller address:", error.message);
      return null;
    }
  }
}

module.exports = SellerAddressData;
