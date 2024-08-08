import React, { FC } from "react";
import NotificationSystem from "./components/NotificationSystem";

const App: FC = () => {
  return (
    <div className="w-full min-h-screen flex justify-center m-6">
      <NotificationSystem />
    </div>
  );
};

export default App;
