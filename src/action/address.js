import AddressQuery from "@/components/database/address";
const addressQuery = new AddressQuery();

// Add a new address
export const addAddress = async (
  userId,
  division,
  district,
  area,
  postcode
) => {
  try {
    const addressId = await addressQuery.addAddress(
      userId,
      division,
      district,
      area,
      postcode
    );
    return { success: true, message: "Address added successfully", addressId };
  } catch (error) {
    console.error("Error adding address:", error);
    return { success: false, error: error.message };
  }
};

// Update an existing address
export const updateAddress = async (
  addressId,
  userId,
  division,
  district,
  area,
  postcode
) => {
  try {
    const success = await addressQuery.updateAddress(
      addressId,
      userId,
      division,
      district,
      area,
      postcode
    );
    if (success) {
      return { success: true, message: "Address updated successfully" };
    } else {
      return {
        success: false,
        message: "Address not found or no changes made",
      };
    }
  } catch (error) {
    console.error("Error updating address:", error);
    return { success: false, error: error.message };
  }
};

// Delete an address
export const deleteAddress = async (addressId, userId) => {
  try {
    const success = await addressQuery.deleteAddress(addressId, userId);
    if (success) {
      return { success: true, message: "Address deleted successfully" };
    } else {
      return { success: false, message: "Address not found" };
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    return { success: false, error: error.message };
  }
};

// Get all addresses for a user
export const getAddressesByUserId = async (userId) => {
  try {
    const addresses = await addressQuery.getAddressesByUserId(userId);
    return { success: true, addresses };
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { success: false, error: error.message };
  }
};
