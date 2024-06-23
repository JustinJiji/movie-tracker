import { getAuth } from "firebase/auth";

export const fetchUsers = async () => {
  const token = await getIdToken();
  try {
    const response = await fetch("/admin/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    const nonAdminUsers = data.filter((user) => user.customClaims===undefined);
    return nonAdminUsers; 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to delete a user by ID
export const deleteUser = async (userId) => {
  const token = await getIdToken();
  try {
    const response = await fetch(`/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    // Optionally handle response data
    const data = await response.json();
    console.log("User deleted successfully:", data);
    return data; // Return if necessary
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

async function getIdToken() {
  const user = getAuth().currentUser;
  if (user) {
    return await user.getIdToken();
  } else {
    throw new Error("No user logged in");
  }
}
