import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, RefreshCw } from 'lucide-react';

const Settings = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ full_name: fullName });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      {/* Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Settings</h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {userProfile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{userProfile?.full_name || user?.email || 'Admin User'}</h4>
            <p className="text-gray-500">{userProfile?.role || 'Administrator'}</p>
            <p className="text-xs text-gray-400 mt-1">ID: {user?.id?.slice(0, 8)}...</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={userProfile?.role || 'admin'}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-500"
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Saved!
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="font-medium text-gray-800">
              {userProfile?.created_at
                ? new Date(userProfile.created_at).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium text-gray-800">
              {userProfile?.updated_at
                ? new Date(userProfile.updated_at).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Connection Status</h3>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 font-medium">Connected to Supabase</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Your data is being synced with the Supabase database in real-time.
        </p>
      </div>
    </div>
  );
};

export default Settings;
