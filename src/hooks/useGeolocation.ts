/**
 * useGeolocation Hook
 * 
 * React hook for accessing and managing the user's geographic location
 * using the browser's Geolocation API.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface GeolocationCoordinates {
  lat: number;
  lng: number;
}

export interface GeolocationState {
  location: GeolocationCoordinates | null;
  isLoading: boolean;
  error: string | null;
  permissionState: 'granted' | 'denied' | 'prompt' | 'unknown';
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean; // If true, continuously watch position
}

/**
 * Hook to get and manage user's geolocation
 * 
 * @param options - Configuration options for geolocation
 * @returns Geolocation state and control functions
 * 
 * @example
 * ```tsx
 * const { location, isLoading, error, permissionState, requestLocation } = useGeolocation();
 * 
 * if (isLoading) return <p>Getting your location...</p>;
 * if (error) return <p>Error: {error}</p>;
 * if (location) return <p>Lat: {location.lat}, Lng: {location.lng}</p>;
 * ```
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 0,
    watchPosition = false,
  } = options;

  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: false,
    error: null,
    permissionState: 'unknown',
  });

  const [watchId, setWatchId] = useState<number | null>(null);

  /**
   * Handle successful geolocation
   */
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    
    setState((prev) => ({
      ...prev,
      location: { lat: latitude, lng: longitude },
      isLoading: false,
      error: null,
      permissionState: 'granted',
    }));
  }, []);

  /**
   * Handle geolocation errors
   */
  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage: string;
    let permissionState: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied. Please enable location permissions to see distances.';
        permissionState = 'denied';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable. Please try again.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out. Please try again.';
        break;
      default:
        errorMessage = 'An unknown error occurred while getting your location.';
    }

    setState((prev) => ({
      ...prev,
      location: null,
      isLoading: false,
      error: errorMessage,
      permissionState,
    }));
  }, []);

  /**
   * Request user's location
   */
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        isLoading: false,
        permissionState: 'denied',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watchPosition) {
      // Continuously watch position
      const id = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
      setWatchId(id);
    } else {
      // Get position once
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
    }
  }, [enableHighAccuracy, timeout, maximumAge, watchPosition, handleSuccess, handleError]);

  /**
   * Clear position watching
   */
  const clearWatch = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  }, [watchId]);

  /**
   * Check permission status (if supported)
   */
  const checkPermission = useCallback(async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        setState((prev) => ({
          ...prev,
          permissionState: result.state as 'granted' | 'denied' | 'prompt',
        }));
        
        // Listen for permission changes
        result.onchange = () => {
          setState((prev) => ({
            ...prev,
            permissionState: result.state as 'granted' | 'denied' | 'prompt',
          }));
        };
      } catch (error) {
        // Permission API not supported or error occurred
        console.warn('Permission API not supported:', error);
      }
    }
  }, []);

  /**
   * Auto-request location on mount (optional)
   */
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  /**
   * Cleanup watch on unmount
   */
  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, [clearWatch]);

  return {
    ...state,
    requestLocation,
    clearWatch,
    checkPermission,
  };
}
