import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Notification } from "../interfaces/Notification";
import { showErrorToast, showSuccessToast } from "../utils/helper";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    initial: true,
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notifications: Notification[] = [];
        querySnapshot.forEach((doc) => {
          notifications.push({ id: doc.id, ...doc.data() } as Notification);
        });

        // Sort notifications by timestamp in descending order
        notifications.sort((a, b) => b.timestamp - a.timestamp);

        setNotifications(notifications);
      } catch (error) {
        showErrorToast("Failed to fetch notifications");
        console.error("Error fetching notifications: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };
    fetchNotifications();
  }, []);

  const addNotification = async (buttonId: string, message: string) => {
    setLoading((prev) => ({ ...prev, [buttonId]: true }));
    try {
      const newNotification = {
        message,
        read: false,
        timestamp: Date.now(),
      };

      const docRef = await addDoc(
        collection(db, "notifications"),
        newNotification
      );

      setNotifications((prev) => [
        ...prev,
        { id: docRef.id, ...newNotification },
      ]);
      showSuccessToast(`${message} sent successfully`);
    } catch (error) {
      showErrorToast("Failed to send notification");
    }
    setLoading((prev) => ({ ...prev, [buttonId]: false }));
  };

  const updateNotificationStatus = async (id: string, readStatus: boolean) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const notificationDoc = doc(db, "notifications", id);
      await updateDoc(notificationDoc, { read: readStatus });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: readStatus }
            : notification
        )
      );

      showSuccessToast(
        `Notification marked as ${readStatus ? "read" : "unread"}`
      );
    } catch (error) {
      showErrorToast(`Failed to mark as ${readStatus ? "read" : "unread"}`);
    }
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  const markAllAsRead = async () => {
    setLoading((prev) => ({ ...prev, markAll: true }));
    try {
      const q = query(
        collection(db, "notifications"),
        where("read", "==", false)
      );
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        const notificationDoc = doc.ref;
        batch.update(notificationDoc, { read: true });
      });

      await batch.commit();

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.read ? notification : { ...notification, read: true }
        )
      );

      showSuccessToast("All notifications marked as read");
    } catch (error) {
      showErrorToast("Failed to mark all as read");
    }
    setLoading((prev) => ({ ...prev, markAll: false }));
  };

  return {
    notifications,
    addNotification,
    updateNotificationStatus,
    markAllAsRead,
    loading,
  };
};

export default useNotifications;
