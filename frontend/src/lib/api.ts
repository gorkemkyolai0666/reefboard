const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4034/api';

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'İstek başarısız' }));
    throw new ApiError(response.status, error.message || 'İstek başarısız');
  }

  return response.json();
}

function listRequest(endpoint: string, token: string, params?: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.set(key, String(value));
    });
  }
  const qs = query.toString();
  return request(`${endpoint}${qs ? `?${qs}` : ''}`, { token });
}

export const api = {
  auth: {
    register: (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      centerName: string;
      phone?: string;
      city?: string;
      district?: string;
    }) => request('/auth/register', { method: 'POST', body: data }),

    login: (data: { email: string; password: string }) =>
      request('/auth/login', { method: 'POST', body: data }),

    me: (token: string) => request('/auth/me', { token }),
  },

  dashboard: {
    stats: (token: string) => request('/dashboard/stats', { token }),
  },

  students: {
    list: (token: string, params?: { page?: number; status?: string; certLevel?: string }) =>
      listRequest('/students', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/students', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/students/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/students/${id}`, { method: 'DELETE', token }),
  },

  courses: {
    list: (token: string, params?: { page?: number; status?: string; courseType?: string }) =>
      listRequest('/courses', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/courses', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/courses/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/courses/${id}`, { method: 'DELETE', token }),
  },

  divelogs: {
    list: (token: string, params?: { page?: number; studentId?: string }) =>
      listRequest('/divelogs', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/divelogs', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/divelogs/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/divelogs/${id}`, { method: 'DELETE', token }),
  },

  equipment: {
    list: (token: string, params?: { page?: number; condition?: string; equipmentType?: string }) =>
      listRequest('/equipment', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/equipment', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/equipment/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/equipment/${id}`, { method: 'DELETE', token }),
  },

  center: {
    get: (token: string) => request('/center', { token }),
    update: (token: string, data: Record<string, unknown>) =>
      request('/center', { method: 'PATCH', body: data, token }),
  },
};

export { ApiError };
