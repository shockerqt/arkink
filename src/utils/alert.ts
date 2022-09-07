import { useState } from 'react';

export type AlertType = 'success' | 'danger';

export interface Alert {
  message: string;
  type: AlertType;
  dismiss: () => void;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<{ [id: number]: Alert }>({});

  const addAlert = (message: string, type: AlertType = 'success', time = 0) => {
    const id = Date.now();
    let timeout: number;

    const dismiss = () => {
      setAlerts((current) => {
        const newAlerts = { ...current };
        delete newAlerts[id];
        return newAlerts;
      });

      if (timeout) clearTimeout(timeout);
    };

    setAlerts((current) => ({
      ...current,
      [id]: { message, type, dismiss },
    }));

    if (time > 0) timeout = setTimeout(dismiss, time);
  };

  return { alerts, addAlert };
};
