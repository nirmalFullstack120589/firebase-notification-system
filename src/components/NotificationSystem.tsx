import React from "react";
import useNotifications from "../hooks/useNotifications";
import Button from "./Button";
import { notificationButtons } from "../utils/constants";
import Loader from "./Loader";

const NotificationSystem: React.FC = () => {
  const {
    notifications,
    addNotification,
    updateNotificationStatus,
    markAllAsRead,
    loading,
  } = useNotifications();

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.read
  );

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-center">
        Firebase Notification System
      </h1>
      <div className="my-4 flex justify-center gap-4">
        {notificationButtons?.map(({ id, btnText, message }) => (
          <Button
            key={id}
            onClick={() => addNotification(id, message)}
            loader={loading[id]}
            disabled={loading[id]}
            className={`${
              loading[id]
                ? "bg-purple-700"
                : "bg-purple-500 hover:bg-purple-700"
            }`}
          >
            {btnText}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-semibold">
          Total Notifications: {notifications.length}
        </h2>
        {notifications?.length > 0 && (
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-xl">
              Unread:{" "}
              <span className="text-red-500">
                {notifications.filter((n) => !n.read).length}
              </span>
            </p>

            {hasUnreadNotifications && (
              <Button
                onClick={() => markAllAsRead()}
                loader={loading.markAll}
                loaderClass="w-4 h-4 mr-0.5"
                disabled={loading.markAll}
                className={`py-1 px-3 ${
                  loading.markAll
                    ? "bg-teal-700"
                    : "bg-teal-500 hover:bg-teal-700"
                }`}
              >
                Mark all as Read
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 border rounded-lg">
        {!loading.initial ? (
          notifications?.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`border-b last:border-0 flex justify-between items-center p-4 ${
                    !notification.read ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <span className="rounded-full bg-blue-500 h-3 w-3 block mt-0.5"></span>
                    )}
                    <p>{notification.message}</p>
                  </div>

                  {!notification.read && (
                    <Button
                      onClick={() =>
                        updateNotificationStatus(notification.id, true)
                      }
                      loader={loading[notification.id]}
                      loaderClass="h-3 w-3 mr-0"
                      disabled={loading[notification.id] || loading.markAll}
                      className={`py-1 px-3 text-sm ${
                        loading[notification.id] || loading.markAll
                          ? "bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-700"
                      }`}
                    >
                      Mark as Read
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center p-4 font-semibold">
              No notifications found
            </p>
          )
        ) : (
          <div className="p-4 flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSystem;
