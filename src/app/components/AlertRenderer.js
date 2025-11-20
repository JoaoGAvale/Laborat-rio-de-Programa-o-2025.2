"use client";

import ReactDOM from "react-dom";
import { useAlert } from "../context/AlertContext";
import UserAlert from "./Alert";

export default function AlertRenderer() {
  const { alert, closeAlert } = useAlert();

  if (!alert) return null;
  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <UserAlert
      key={alert.timestamp}
      isError={alert.isError}
      topMessage={alert.topMessage}
      bottomMessage={alert.bottomMessage}
      onClose={closeAlert}
      duration={alert.duration || 4000}
    />,
    document.getElementById("alert-root")
  );
}