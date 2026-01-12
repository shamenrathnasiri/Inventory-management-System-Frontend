import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, register, loadUser } from "../../services/AuthService";
import { setUser } from "../../services/UserService";
import { 
  Shield, 
  Package, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Boxes,
  BarChart3,
  Truck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

function LoginPage({ onSuccess }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setMounted] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setFieldErrors({ confirmPassword: ["Passwords do not match"] });
        setLoading(false);
        return;
      }

      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        });
      }

      const user = await loadUser();
      setUser(user);
      if (onSuccess) onSuccess();
    } catch (err) {
      const validationErrors = err?.response?.data?.errors;
      if (validationErrors) {
        setFieldErrors(validationErrors);
      } else {
        setError(
          err?.response?.data?.message ||
            (isLogin ? "Login failed. Please check your credentials." : "Registration failed. Please try again.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Boxes, title: "Smart Inventory", desc: "Real-time stock tracking" },
    { icon: BarChart3, title: "Analytics", desc: "Powerful insights & reports" },
    { icon: Truck, title: "Supply Chain", desc: "End-to-end management" },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-grade protection" },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl" />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      {/* Left Section - Branding */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative z-10 flex-col justify-between p-12 xl:p-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
         
          <span className="text-2xl font-bold text-white ">
            INVENTORY<span className="text-red-500"> SYSTEM</span>
          </span>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
           
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Manage Your
              <span className="block mt-2 bg-linear-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent">
                Inventory Smarter
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Streamline operations, reduce costs, and gain real-time visibility 
              across your entire supply chain with our enterprise-grade solution.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center mb-3 group-hover:from-red-500/30 group-hover:to-rose-500/30 transition-all">
                  <feature.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="flex items-center gap-6 text-slate-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span>&copy; {currentYear} Inventory System</span>
        </motion.div>
      </motion.div>

      {/* Right Section - Login Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div 
            className="flex lg:hidden items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Invent<span className="text-red-500">ory</span>
            </span>
          </motion.div>

          {/* Glassmorphism Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-red-500/20 via-rose-500/20 to-red-500/20 rounded-3xl blur-xl opacity-70" />
            
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-2xl font-bold text-white mb-2"
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLogin ? "Welcome back" : "Create account"}
                </motion.h2>
                <p className="text-slate-400">
                  {isLogin ? "Enter your credentials to continue" : "Start your journey with us"}
                </p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Name Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <div className={`relative group ${focusedField === 'name' ? 'ring-2 ring-red-500/50' : ''} rounded-xl transition-all`}>
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className={`w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-red-400' : 'text-slate-500'}`} />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all"
                          />
                        </div>
                        {fieldErrors.name && (
                          <p className="mt-2 text-sm text-red-400">{fieldErrors.name[0]}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className={`relative group ${focusedField === 'email' ? 'ring-2 ring-red-500/50' : ''} rounded-xl transition-all`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-red-400' : 'text-slate-500'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@company.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-2 text-sm text-red-400">{fieldErrors.email[0]}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className={`relative group ${focusedField === 'password' ? 'ring-2 ring-red-500/50' : ''} rounded-xl transition-all`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-red-400' : 'text-slate-500'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-red-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-2 text-sm text-red-400">{fieldErrors.password[0]}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                      <div className={`relative group ${focusedField === 'confirmPassword' ? 'ring-2 ring-red-500/50' : ''} rounded-xl transition-all`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className={`w-5 h-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-red-400' : 'text-slate-500'}`} />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-red-400 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {fieldErrors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-400">{fieldErrors.confirmPassword[0]}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

            
                

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-linear-to-r from-red-600 via-rose-600 to-red-600 bg-size-[200%_100%] group-hover:animate-shimmer transition-all" />
                  <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Button Content */}
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{isLogin ? "Sign in" : "Create account"}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50" />
                </div>
                
              </div>

              {/* Toggle Login/Register */}
              <p className="mt-8 text-center text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setFieldErrors({});
                  }}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-6 text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
          
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
