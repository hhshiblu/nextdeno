"use server";
const { connectToDatabase } = require("./db");

class CategoryData {
  constructor() {
    this.db = connectToDatabase();
  }

  //get all categories

  async getAllCategory() {
    let result;
    try {
      const sql = "SELECT * FROM category";

      const [user] = await (await this.db).execute(sql);
      result = user;
    } catch (error) {
      return error;
    } finally {
      //   releaseConnection();
    }
    return result ? result : [];
  }

  // Create a new category
  async createCategory(categoryData) {
    try {
      const sql = "INSERT INTO category (id, slug, name) VALUES (?, ?, ?)";
      const data = [categoryData.id, categoryData.slug, categoryData.name];
      const [response] = await (await this.db).execute(sql, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Update category by id
  async updateCategoryById(categoryData) {
    let result;
    try {
      const sql = "UPDATE category SET name=?,slug=? WHERE id=?";
      const data = [categoryData.name, categoryData.slug, categoryData.id];
      const [response] = await (await this.db).execute(sql, data);
      result = response;
    } catch (error) {
      return error;
    } finally {
      // Optionally release resources if needed
    }
    return result;
  }

  // Delete category by id
  async deleteCategoryById(categoryId) {
    let result;
    try {
      const sql = "DELETE FROM category WHERE id=?";
      const data = [categoryId];
      const [response] = await (await this.db).execute(sql, data);
      result = response;
    } catch (error) {
      return error;
    } finally {
      // Optionally release resources if needed
    }
    return result;
  }
}

module.exports = CategoryData;
