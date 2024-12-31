import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    theme,
    notifications: true,
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });

    // If theme is changed, update the theme globally
    if (name === "theme") {
      toggleTheme(value);
    }
  };

  const handleSaveSettings = () => {
    try {
      // Simulate API call to save settings
      toast.success("Settings saved successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to save settings.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h1 className="mb-4">Settings</h1>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleSettingChange}
            className="form-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleSettingChange}
            className="form-check-input"
            id="notificationsCheck"
          />
          <label className="form-check-label" htmlFor="notificationsCheck">
            Enable Notifications
          </label>
        </div>
        <button onClick={handleSaveSettings} className="btn btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
