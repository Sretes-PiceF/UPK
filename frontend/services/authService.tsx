// services/authService.ts

/**
 * Stores authentication data in localStorage
 */
export const storeAuthData = (token: string): void => {
    try {
        const now = new Date();
        const expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

        localStorage.setItem('token', token);
        localStorage.setItem('token_expiry', expiryDate.toISOString());
    } catch (error) {
        console.error('Failed to store auth data:', error);
        throw new Error('Failed to store token');
    }
};

/**
 * Clears all authentication data
 */
export const clearAuthData = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
};

/**
 * Checks if token exists and not expired
 */
export const checkTokenExpiry = (): boolean => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('token_expiry');

    if (!token || !expiry) return false;

    return new Date() < new Date(expiry);
};

/**
 * Gets valid token if exists and not expired
 */
export const getValidToken = (): string | null => {
    return checkTokenExpiry() ? localStorage.getItem('token') : null;
};