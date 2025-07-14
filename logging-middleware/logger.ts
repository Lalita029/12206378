import axios from 'axios';

// You should set these after authentication
let accessToken = '';

export function setAccessToken(token: string) {
  accessToken = token;
}

export async function log(
  stack: 'backend' | 'frontend',
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  pkg: 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service' | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils',
  message: string
) {
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