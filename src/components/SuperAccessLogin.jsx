import { useState } from 'react';
import { Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { useSuperAccess } from '../context/SuperAccessContext';

const SuperAccessLogin = () => {
  const { login } = useSuperAccess();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = login(formData.id, formData.password);

    if (!result.success) {
      setError(result.error);
      setFormData({ id: '', password: '' });
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nextec-purple via-nextec-blue to-nextec-purple flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          {/* Partnership Logos */}
          {/* <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-xl">
              <img
                src="/nextec-logo.png"
                alt="Nextec Inc"
                className="h-12 w-auto"
              />
            </div>
            <div className="text-2xl font-bold text-white">×</div>
            <div className="bg-white rounded-lg p-4 shadow-xl">
              <img
                src="/dupage-logo.png"
                alt="College of DuPage"
                className="h-12 w-auto"
              />
            </div>
          </div> */}

          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-nextec-gold" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Training Platform</h1>
          <p className="text-gray-200 text-lg">Secure Access Required</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6 text-center">
            <Lock className="h-12 w-12 text-nextec-purple mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-nextec-purple mb-2">
              Super Access Gate
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your super credentials to access the platform
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Super ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Super Access ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-nextec-purple focus:outline-none transition-colors"
                placeholder="Enter super access ID"
                autoComplete="off"
              />
            </div>

            {/* Super Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Super Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-nextec-purple focus:outline-none transition-colors pr-12"
                  placeholder="Enter super access password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-nextec-purple to-nextec-blue hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Access Platform'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              <Lock className="h-3 w-3 inline mr-1" />
              This is a protected demonstration platform. Access is granted for 1 hour.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm opacity-75">
            Nextec Inc × College of DuPage Partnership © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAccessLogin;
