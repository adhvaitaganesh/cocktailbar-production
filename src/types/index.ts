export interface User {
    _id: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface Booking {
    _id: string;
    name: string;
    date: string;
    time: string;
    guests: number;
    status: 'pending' | 'confirmed';
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Request {
    _id: string;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'replied';
    date: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Announcement {
    _id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    offerTitle: string;
    offerDescription: string;
    promoCode: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  } 