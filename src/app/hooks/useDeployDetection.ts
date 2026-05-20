import { useEffect, useRef } from 'react';
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
  const detectedRef = useRef(false);

  const checkAndLogout = async () => {
    if (detectedRef.current) return;
    const deployed = await fetchDeployedBuildTime();
    if (!deployed) return;
    if (deployed !== __BUILD_TIME__) {
      detectedRef.current = true;
      await signOut();
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    // Check on mount and on focus
    checkAndLogout();
    window.addEventListener('focus', checkAndLogout);
    const timer = setInterval(checkAndLogout, CHECK_INTERVAL_MS);
    return () => {
      window.removeEventListener('focus', checkAndLogout);
      clearInterval(timer);
    };
  }, []);
}
