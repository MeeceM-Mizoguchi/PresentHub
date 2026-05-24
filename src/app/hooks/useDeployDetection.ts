import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

declare const __BUILD_TIME__: string;

const CHECK_INTERVAL_MS = 60_000;

async function fetchDeployedBuildTime(): Promise<string | null> {
  try {
    const res = await fetch(`/version.json?_=${Date.now()}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.buildTime ?? null;
  } catch {
    return null;
  }
}

export function useDeployDetection() {
  const { signOut } = useAuth();
  const location = useLocation();
  const detectedRef = useRef(false);
  const signOutRef = useRef(signOut);
  signOutRef.current = signOut;

  const checkAndLogout = useCallback(async () => {
    if (detectedRef.current) return;
    const deployed = await fetchDeployedBuildTime();
    if (!deployed) return;
    if (deployed !== __BUILD_TIME__) {
      detectedRef.current = true;
      await signOutRef.current();
      window.location.replace('/login');
    }
  }, []);

  useEffect(() => {
    checkAndLogout();
    window.addEventListener('focus', checkAndLogout);
    const timer = setInterval(checkAndLogout, CHECK_INTERVAL_MS);
    return () => {
      window.removeEventListener('focus', checkAndLogout);
      clearInterval(timer);
    };
  }, [checkAndLogout]);

  useEffect(() => {
    checkAndLogout();
  }, [location.pathname, checkAndLogout]);
}
