/**
 * ChordBeat Notification Service
 * Handles browser push/system notifications for studio events (audio export, recording saved, etc.)
 */

export const isNotificationSupported = () => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getNotificationPermission = () => {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
};

export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return Notification.permission;
  }
};

export const sendNotification = (title, options = {}) => {
  if (!isNotificationSupported()) return null;
  if (Notification.permission !== 'granted') return null;

  try {
    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      silent: false,
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  } catch (error) {
    console.warn('Could not display notification:', error);
    return null;
  }
};

const notificationService = {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendNotification,
};

export default notificationService;

