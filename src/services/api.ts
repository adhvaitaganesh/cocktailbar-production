import axios, { AxiosResponse } from 'axios';
import { 
  AuthUser, 
  AuthCredentials,
  AuthResponse,
  Booking, 
  ContactRequest, 
  Announcement 
} from './types';
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const tokenValue = Cookies.get('token');
  
  if (tokenValue) {
    config.headers.authorization = `Bearer ${tokenValue}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}); 

/*export interface AuthService {
  login: (credentials: AuthCredentials) => Promise<AxiosResponse<AuthResponse>>;
  register: (credentials: AuthCredentials) => Promise<AxiosResponse<AuthResponse>>;
  verifyCredentials: (credentials: AuthCredentials) => Promise<AxiosResponse<AuthResponse>>;
}*/

export const auth = {
  login: async (credentials: AuthCredentials) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { 
        expires: 7, // Cookie expires in 7 days
        path: '/' 
      });
    }
    return response;
  },
  register: (credentials: AuthCredentials) => 
    api.post<AuthResponse>('/auth/register', credentials),
  verifyCredentials: (credentials: AuthCredentials) => 
    api.post<AuthResponse>('/auth/verify-credentials', credentials),
  checkStatus: () => 
    api.get<AuthResponse>('/auth/check-status'),
  logout: async () => {
    const response = await api.post('/auth/logout');
    Cookies.remove('token', { path: '/' });
    return response;
  },
};

export const bookings = {
  create: (bookingData: Omit<Booking, '_id' | 'status'>) => 
    api.post<Booking>('/bookings/new', bookingData),
  getAll: () => 
    api.get<Booking[]>('/bookings/getBookings'),
  updateStatus: (id: string, status: Booking['status']) => 
    api.patch<Booking>(`/bookings/${id}`, { status }),
  delete: (id: string) => 
    api.delete<{ message: string }>(`/bookings/${id}`),
};

export const requests = {
  create: (requestData: Omit<ContactRequest, '_id' | 'status' | 'date'>) => 
    api.post<ContactRequest>('/requests', requestData),
  getAll: () => 
    api.get<ContactRequest[]>('/requests'),
  updateStatus: (id: string, status: ContactRequest['status']) => 
    api.patch<ContactRequest>(`/requests/${id}`, { status }),
};

export const announcements = {
  create: (announcementData: Omit<Announcement, '_id'>) => 
    api.post<Announcement>('/announcements', announcementData),
  getAll: () => 
    api.get<Announcement[]>('/announcements'),
  update: (id: string, data: Partial<Announcement>) => 
    api.patch<Announcement>(`/announcements/${id}`, data),
  delete: (id: string) => 
    api.delete<Announcement>(`/announcements/${id}`),
};

// Error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      alert(error.response.data.error);
      //window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api; 