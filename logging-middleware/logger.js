import axios from 'axios';

// You should set this after authentication
let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

export async function log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    // Optionally handle logging errors here
  }
} 