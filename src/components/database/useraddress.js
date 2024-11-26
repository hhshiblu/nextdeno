class AddressQuery {
  constructor() {
    this.db = null;
    this.init();
  }

  async init() {
    this.db = await connectToDatabase();
  }

  // Add a new address
  async addAddress(userId, division, district, area, postcode) {
    try {
      const sql = `
        INSERT INTO addresses (userId, division, district, area, postcode)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await this.db.execute(sql, [
        userId,
        division,
        district,
        area,
        postcode,
      ]);
      return result.insertId;
    } catch (error) {
      console.error("Error adding address:", error);
      throw new Error("Failed to add address");
    }
  }

  // Update an address
  async updateAddress(addressId, userId, division, district, area, postcode) {
    try {
      const sql = `
        UPDATE addresses
        SET division = ?, district = ?, area = ?, postcode = ?
        WHERE id = ? AND userId = ?
      `;
      const [result] = await this.db.execute(sql, [
        division,
        district,
        area,
        postcode,
        addressId,
        userId,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating address:", error);
      throw new Error("Failed to update address");
    }
  }

  // Delete an address
  async deleteAddress(addressId, userId) {
    try {
      const sql = "DELETE FROM addresses WHERE id = ? AND userId = ?";
      const [result] = await this.db.execute(sql, [addressId, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw new Error("Failed to delete address");
    }
  }

  // Get addresses for a user
  async getAddressesByUserId(userId) {
    try {
      const sql =
        "SELECT id, division, district, area, postcode FROM addresses WHERE userId = ?";
      const [rows] = await this.db.execute(sql, [userId]);
      return rows;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw new Error("Failed to fetch addresses");
    }
  }
}

module.exports = AddressQuery;
