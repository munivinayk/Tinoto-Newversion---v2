import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignupFormProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onLoginClick }) => {
  const { signUp, signInWithGoogle, signInWithFacebook, isOffline } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      console.log('Signup successful, navigating to dashboard');
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred during signup. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google signup error:', error);
      setError('Error signing up with Google');
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await signInWithFacebook();
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Facebook signup error:', error);
      setError('Error signing up with Facebook');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign up for Tinoto</h2>
        {isOffline && (
          <p className="text-yellow-500 text-center mb-4">You are in offline mode. Some features may be limited.</p>
        )}
        <form onSubmit={handleSignup}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-full mb-4">Sign up</button>
        </form>
        {!isOffline && (
          <>
            <div className="flex items-center justify-between mb-4">
              <hr className="w-full border-gray-300 dark:border-gray-600" />
              <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
              <hr className="w-full border-gray-300 dark:border-gray-600" />
            </div>
            <button
              onClick={handleGoogleSignup}
              className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 py-2 rounded-full mb-2 flex items-center justify-center"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
            <button
              onClick={handleFacebookSignup}
              className="w-full bg-blue-600 text-white py-2 rounded-full mb-4 flex items-center justify-center"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>
          </>
        )}
        <div className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account? <button onClick={onLoginClick} className="text-orange-500 hover:underline">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;