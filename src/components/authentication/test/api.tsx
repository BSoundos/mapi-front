// api.ts
import axios from 'axios';

interface ErrorResponse {
  message: string;
}

const updateUserFirstName = async (newFirstName: string) => {
  try {
    const response = await axios.put('http://127.0.0.1:8000/profile_management/update-user/user1/', { first_name: newFirstName });
    console.log('User first name updated successfully:', response.data);
  } catch (error: any) {
    const errorResponse: ErrorResponse = error.response.data;
    console.error('Error updating user first name:', errorResponse.message);
  }
};

export { updateUserFirstName };
