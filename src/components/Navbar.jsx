import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-4">
            <div className="flex items-center bg-white rounded px-3 py-1.5">
              <img
                src="/nextec-logo.png"
                alt="Nextec Inc"
                className="h-8 w-auto"
              />
            </div>
            <span className="text-white text-lg font-semibold hidden sm:inline">×</span>
            <div className="flex items-center bg-white rounded px-3 py-1.5">
              <img
                src="/dupage-logo.png"
                alt="College of DuPage"
                className="h-8 w-auto"
              />
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <span className="text-nextec-gold text-xs">
                    ({user.role})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-nextec-gold hover:bg-yellow-500 text-nextec-purple px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-nextec-gold transition-colors font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-nextec-gold hover:bg-yellow-500 text-nextec-purple px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
