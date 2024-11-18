const { connectToDatabase } = require("./db");

class TrustData {
  constructor() {
    this.db = connectToDatabase();
  }

  async getAuthUsername() {
    let result;
    try {
      const sql = "SELECT * FROM user";
      //   const data = [userId];
      const [user] = await (await this.db).execute(sql);
      result = user;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async updateUser(userDatat) {
    let result;
    try {
      const sql = "update user set name=? where name=?";
      const data = [userDatat.name, userDatat.target];
      const [user] = await (await this.db).execute(sql, data);
      result = user;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async deleteUser(userId) {
    let result;
    try {
      const sql = "DELETE FROM user WHERE id=?";
      const data = [userId];
      const [user] = await (await this.db).execute(sql, data);
      result = user;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async updateUserInfo(userData) {
    let result;
    try {
      const sql = "UPDATE user SET name=?, email=?, gender=? WHERE id=?";
      const data = [
        userData.name,
        userData.email,
        userData.gender,
        userData.id,
      ];
      const [user] = await (await this.db).execute(sql, data);
      result = user;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async deleteProduct(productId) {
    let result;
    try {
      const sql = "DELETE FROM product WHERE id=?";
      const data = [productId];
      const [product] = await (await this.db).execute(sql, data);
      result = product;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async updateProductStatus(productData) {
    let result;
    try {
      const sql = "UPDATE product SET status=? WHERE id=?";
      const data = [productData.status, productData.id];
      const [product] = await (await this.db).execute(sql, data);
      result = product;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async deleteOrder(orderId) {
    let result;
    try {
      const sql = "DELETE FROM `order` WHERE id=?";
      const data = [orderId];
      const [order] = await (await this.db).execute(sql, data);
      result = order;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
  async updateOrderStatus(orderData) {
    let result;
    try {
      const sql = "UPDATE `order` SET status=? WHERE id=?";
      const data = [orderData.status, orderData.id];
      const [order] = await (await this.db).execute(sql, data);
      result = order;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result;
  }
}

module.exports = TrustData;
