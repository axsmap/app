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
   * 
   * IMPORTANT: We do NOT override permissionState from the error code alone.
   * Chrome can report PERMISSION_DENIED even when site-level permission is
   * "Allowed" (e.g. when macOS system Location Services are disabled for Chrome,
   * or when the request fails for other platform-level reasons).
   * Instead, we query the Permissions API for the true browser permission state
   * and only set permissionState to 'denied' if the Permissions API confirms it.
   */
  const handleError = useCallback(async (error: GeolocationPositionError) => {
    let errorMessage: string;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied. Please enable location permissions to see distances.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is currently unavailable. Please check that location services are enabled on your device and try again.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out. Please try again.';
        break;
      default:
        errorMessage = 'An unknown error occurred while getting your location.';
    }

    // Query the actual browser permission state rather than trusting the error code.
    // Chrome on macOS can fire PERMISSION_DENIED when the site permission is granted
    // but system-level Location Services are off or unavailable.
    let actualPermission: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        actualPermission = result.state as 'granted' | 'denied' | 'prompt';
      } catch {
        // Permissions API not supported — fall back to error code
        if (error.code === error.PERMISSION_DENIED) {
          actualPermission = 'denied';
        }
      }
    } else if (error.code === error.PERMISSION_DENIED) {
      actualPermission = 'denied';
    }

    // If the browser says permission is granted but geolocation still failed,
    // it's a system-level or platform issue — show a more helpful message
    if (error.code === error.PERMISSION_DENIED && actualPermission === 'granted') {
      errorMessage = 'Unable to access location. Your browser has permission, but location services may be disabled at the system level. Please check your device\'s location settings.';
    }

    setState((prev) => ({
      ...prev,
      location: null,
      isLoading: false,
      error: errorMessage,
      permissionState: actualPermission,
    }));
  }, []);

  /**
   * Request user's location
   * 
   * Uses a two-attempt strategy:
   * 1. First attempt with the configured options (e.g. enableHighAccuracy: true)
   * 2. If that fails with TIMEOUT or POSITION_UNAVAILABLE, retry with
   *    enableHighAccuracy: false — Chrome on desktop often succeeds with
   *    low-accuracy mode when high-accuracy fails.
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
      // Get position once — with fallback retry for non-permission errors
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        (error) => {
          // If high accuracy was requested and error is TIMEOUT or POSITION_UNAVAILABLE,
          // retry with low accuracy before giving up
          if (
            enableHighAccuracy &&
            (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE)
          ) {
            console.warn('High accuracy geolocation failed, retrying with low accuracy...');
            navigator.geolocation.getCurrentPosition(
              handleSuccess,
              handleError,
              {
                enableHighAccuracy: false,
                timeout: timeout + 5000, // Give a bit more time on retry
                maximumAge,
              }
            );
          } else {
            handleError(error);
          }
        },
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
