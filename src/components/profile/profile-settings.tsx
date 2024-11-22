import { useState } from 'react';
import { Bell, Shield, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileSettings() {
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    promotionalEmails: false,
    newMessages: true
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showContact: false
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        {/* Notifications */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </h3>
            <div className="mt-4 space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() =>
                        setNotifications((prev) => ({ ...prev, [key]: !value }))
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy Settings
            </h3>
            <div className="mt-4 space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() =>
                        setPrivacy((prev) => ({ ...prev, [key]: !value }))
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Password Change */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Change Password
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button>Update Password</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}