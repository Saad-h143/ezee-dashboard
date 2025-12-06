import { RefreshCw } from 'lucide-react';

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
    <div className="text-center">
      <RefreshCw className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

export default Loading;
