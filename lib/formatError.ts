export default function formatError(err: any): string {
  if (!err) return 'An unknown error occurred';

  if (!err.response) {
    if (err.message) return String(err.message);
    return 'Network error: failed to reach server';
  }

  const data = err.response.data;

  if (Array.isArray(data)) {
    return data.map((e: any) => e.msg || JSON.stringify(e)).join('; ');
  }

  if (data && Array.isArray(data.detail)) {
    return data.detail.map((d: any) => d.msg || JSON.stringify(d)).join('; ');
  }

  if (data && typeof data.detail === 'string') {
    return data.detail;
  }

  if (data && (data.message || data.error)) {
    return data.message || data.error;
  }

  if (err.response.statusText) {
    return `${err.response.status} ${err.response.statusText}`;
  }

  try {
    return JSON.stringify(data);
  } catch {
    return 'An error occurred';
  }
}
