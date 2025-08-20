// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode: number;
}

// API Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: string[];
}

// Request Configuration
export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// API Endpoints
export interface ApiEndpoints {
  contact: {
    submit: string;
  };
  // Add more endpoints as needed
}

// Contact API Types
export interface ContactSubmitRequest {
  name: string;
  brand: string;
  phone: string;
  email: string;
}

export interface ContactSubmitResponse {
  id: string;
  submittedAt: string;
  status: 'pending' | 'processed' | 'completed';
}
