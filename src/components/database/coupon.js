const { connectToDatabase } = require("./db");

class CouponData {
  constructor() {
    this.db = connectToDatabase();
  }

  // Create a new coupon
  async createCoupon(couponData) {
    try {
      const sql =
        "INSERT INTO coupon (id, code, discountAmount, productId, validUntil) VALUES (?, ?, ?, ?, ?)";
      const data = [
        couponData.id,
        couponData.code,
        couponData.discountAmount,
        couponData.productId,
        couponData.validUntil,
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error creating coupon:", error.message);
      return null;
    }
  }

  // Update coupon discount amount and code by productId and id
  async updateCoupon(couponData) {
    try {
      const sql =
        "UPDATE coupon SET discountAmount=?, code=? WHERE id=? AND productId=?";
      const data = [
        couponData.discountAmount,
        couponData.code,
        couponData.id,
        couponData.productId,
      ];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error updating coupon:", error.message);
      return null;
    }
  }

  // Delete coupon by productId and id
  async deleteCoupon(id, productId) {
    try {
      const sql = "DELETE FROM coupon WHERE id=? AND productId=?";
      const data = [id, productId];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      console.error("Error deleting coupon:", error.message);
      return null;
    }
  }
}

module.exports = CouponData;
