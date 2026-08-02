import { useState, useEffect, Fragment } from 'react';
import {
  FaLock,
  FaSignInAlt,
  FaSignOutAlt,
  FaSyncAlt,
  FaArrowLeft,
  FaTrash,
  FaUsers,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBuilding,
  FaEnvelope,
  FaPhoneAlt,
  FaUserTag,
  FaCalendarAlt
} from 'react-icons/fa';
import igniteLogo from '../assets/ignite 2.0 - logo.png';

// Uses VITE_API_URL when set (e.g. on Vercel), falls back to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ignite_admin_auth') === 'true';
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError('Failed to fetch user registrations.');
      }
    } catch (err) {
      setError('Error connecting to backend database server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchUsers();
    }
  }, [authenticated]);

  const handleDelete = async (id: string, teamName: string) => {
    if (!window.confirm(`Are you sure you want to delete registration for "${teamName}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert('Failed to delete: ' + data.message);
      }
    } catch (err) {
      alert('Error connecting to backend server.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (password === 'ignite-admin-2026') {
      setAuthenticated(true);
      localStorage.setItem('ignite_admin_auth', 'true');
    } else {
      setLoginError('Invalid Administrator Password. Access Denied.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of Admin Portal?')) {
      setAuthenticated(false);
      localStorage.removeItem('ignite_admin_auth');
      setPassword('');
      setLoginError('');
    }
  };

  // --- UNAUTHENTICATED LOGIN SECTION ---
  if (!authenticated) {
    return (
      <div className="relative min-h-screen w-full bg-[#030706] text-white flex items-center justify-center p-4 selection:bg-[#84E325] selection:text-[#030706] overflow-hidden">
        {/* Ambient Glow & Grid Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,227,37,0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Main Card */}
          <div className="rounded-3xl border border-[#84E325]/40 bg-[#080f09]/90 p-8 shadow-[0_0_80px_rgba(132,227,37,0.2)] backdrop-blur-xl text-center">
            
            {/* Centered IGNITE 2.0 Logo */}
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-[#84E325]/40 bg-white/5 p-3 shadow-[0_0_35px_rgba(132,227,37,0.3)]">
              <img src={igniteLogo} alt="IGNITE 2.0 Logo" className="h-full w-full object-contain filter drop-shadow-[0_0_10px_#84E325]" />
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-[#84E325]/30 bg-[#84E325]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#84E325] mb-3">
                <FaShieldAlt className="text-xs" />
                <span>Administrator Portal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                IGNITE <span className="text-[#84E325] drop-shadow-[0_0_12px_#84E325]">2.0</span>
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#84E325]">
                Think. Build. Ignite the Future.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 text-left">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Admin Access Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none focus:ring-1 focus:ring-[#84E325] transition-all"
                  />
                </div>
              </div>

              {loginError && (
                <div className="flex items-center space-x-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400">
                  <FaExclamationTriangle className="shrink-0 text-sm" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="glow-lime-btn w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Authorize & Login</span>
                <FaSignInAlt className="text-sm" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-[#84E325] transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span>Return to Public Website</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD SECTION ---
  return (
    <div className="min-h-screen w-full bg-[#030706] text-white selection:bg-[#84E325] selection:text-[#030706] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Dashboard Header Bar */}
        <div className="rounded-2xl border border-[#84E325]/30 bg-[#080f09]/90 p-5 shadow-[0_0_40px_rgba(132,227,37,0.15)] backdrop-blur-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src={igniteLogo} alt="IGNITE 2.0" className="h-12 w-12 object-contain filter drop-shadow-[0_0_8px_#84E325]" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  IGNITE <span className="text-[#84E325]">2.0</span> Registrations
                </h1>
                <span className="rounded-full bg-[#84E325]/20 border border-[#84E325]/40 px-2.5 py-0.5 text-xs font-bold text-[#84E325]">
                  {users.length} Total
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Think. Build. Ignite the Future.</p>
            </div>
          </div>

          {/* Header Controls & Explicit Log Out Button */}
          <div className="flex items-center flex-wrap gap-3">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex items-center space-x-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:border-[#84E325] hover:text-[#84E325] transition-all cursor-pointer"
            >
              <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <a
              href="/"
              className="inline-flex items-center space-x-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <FaArrowLeft className="text-xs" />
              <span>Website</span>
            </a>

            {/* Explicit Log Out Section */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Database Content */}
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#080f09] p-12 text-center">
            <FaSyncAlt className="mx-auto text-3xl text-[#84E325] animate-spin mb-3" />
            <p className="text-sm font-semibold text-gray-300">Loading registrations...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400 flex flex-col items-center">
            <FaExclamationTriangle className="text-3xl mb-2" />
            <p className="font-semibold text-sm">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#080f09] p-12 text-center">
            <FaUsers className="mx-auto text-4xl text-gray-600 mb-3" />
            <p className="text-sm font-semibold text-gray-300">No registrations found in the database.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#080f09] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0e1910] text-[#84E325] uppercase tracking-wider text-[11px] font-bold">
                    <th className="p-4">Team & Leader</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Domain</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Reg. Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user, idx) => {
                    const isExpanded = expandedRowId === user.id;
                    let parsedMembers = [];
                    try {
                      if (user.teamMembers) parsedMembers = JSON.parse(user.teamMembers);
                    } catch(e) {}

                    return (
                      <Fragment key={idx}>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{user.teamName || 'Solo'}</div>
                            <div className="text-gray-400 mt-0.5 flex items-center space-x-1">
                              <FaUserTag className="text-[10px] text-[#84E325]" />
                              <span>{user.name}</span>
                            </div>
                            <div className="text-gray-500 mt-0.5 text-[10px]">
                              Size: {user.members} Member(s)
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-300 flex items-center space-x-1">
                              <FaEnvelope className="text-[10px] text-gray-500" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="text-gray-400 mt-0.5 flex items-center space-x-1">
                                <FaPhoneAlt className="text-[10px] text-gray-500" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="text-gray-300 flex items-center space-x-1">
                              <FaBuilding className="text-[10px] text-gray-500" />
                              <span>{user.institutionName || user.college || 'N/A'}</span>
                            </div>
                            <div className="text-gray-500 mt-0.5 text-[10px]">
                              {user.category || 'N/A'}
                            </div>
                          </td>
                          <td className="p-4 text-gray-300">
                            {user.domain || 'N/A'}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              user.paymentStatus === 'Paid'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              <FaCheckCircle className="text-[9px]" />
                              <span>{user.paymentStatus}</span>
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FaCalendarAlt className="text-[10px] text-gray-500" />
                              <span>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setExpandedRowId(isExpanded ? null : user.id)}
                              className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold"
                              title={isExpanded ? 'Hide Details' : 'View Details'}
                            >
                              <span>{isExpanded ? 'Hide' : 'View'}</span>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id, user.teamName || user.name)}
                              className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold"
                              title="Delete Registration"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-[#0a120b] border-b border-white/5">
                            <td colSpan={7} className="p-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-[#84E325] font-bold uppercase tracking-wider text-xs mb-3">Idea Details</h4>
                                  <div className="space-y-4">
                                    <div>
                                      <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Problem Statement</div>
                                      <div className="text-gray-300 text-xs bg-white/5 p-3 rounded-lg border border-white/10 whitespace-pre-wrap break-words">
                                        {user.problemStatement || 'No problem statement provided.'}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Abstract</div>
                                      <div className="text-gray-300 text-xs bg-white/5 p-3 rounded-lg border border-white/10 whitespace-pre-wrap break-words">
                                        {user.abstract || 'No abstract provided.'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-[#84E325] font-bold uppercase tracking-wider text-xs mb-3">Team Members ({parsedMembers.length})</h4>
                                  {parsedMembers.length > 0 ? (
                                    <div className="space-y-2">
                                      {parsedMembers.map((m: any, i: number) => (
                                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
                                          <div className="font-bold text-white">{m.name}</div>
                                          <div className="text-gray-400 mt-1 flex space-x-3">
                                            <span>📞 {m.phone}</span>
                                            <span>✉️ {m.email}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 text-xs italic bg-white/5 p-3 rounded-lg border border-white/10">No additional team members.</div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
