/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ShoppingBag, 
  MapPin, 
  Trophy, 
  Smartphone, 
  Home,
  User,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  CircleDollarSign,
  Award,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Colors ---
const COLORS = {
  PRIMARY: '#2563EB',
  SIDEBAR_BG: '#0F172A',
  BACKGROUND: '#F8FAFC',
  CARD_BG: '#FFFFFF',
  TEXT_PRIMARY: '#0F172A',
  TEXT_SECONDARY: '#64748B',
  SUCCESS: '#16A34A',
  WARNING: '#CA8A04',
  DANGER: '#DC2626'
};

// --- Types ---
type Screen = 'Welcome' | 'Login' | 'Register' | 'Dashboard' | 'Budget' | 'Shopping' | 'Neighbourhoods' | 'MobileMoney' | 'Achievements';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('Welcome');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [balance, setBalance] = useState(5000);
  
  // Budget State
  const [budgetIncome, setBudgetIncome] = useState<string>("5000");
  
  // Shopping State
  const [cart, setCart] = useState<{name: string, price: number, isNeed: boolean}[]>([]);

  // Experience logic simulation
  useEffect(() => {
    const level = Math.floor(userXP / 100) + 1;
    if (level !== userLevel) setUserLevel(level);
  }, [userXP, userLevel]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser("Admin User");
    setUserXP(prev => prev + 25);
    setActiveScreen('Dashboard');
  };

  const currentMonthNeeds = balance * 0.5;
  const currentMonthWants = balance * 0.3;
  const currentMonthSavings = balance * 0.2;

  // --- UI Components ---

  const SidebarItem = ({ icon: Icon, label, screen }: { icon: any, label: string, screen: Screen }) => (
    <button 
      onClick={() => setActiveScreen(screen)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeScreen === screen 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const StatCard = ({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Only visible when not on Landing/Auth screens for app feel, or always for dashboard */}
      {['Welcome', 'Login', 'Register'].includes(activeScreen) ? null : (
        <aside className="w-72 bg-[#0F172A] p-6 flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <TrendingUp size={24} />
            </div>
            <h1 className="text-white font-bold text-xl tracking-tight">ZamWealth</h1>
          </div>

          <nav className="flex-1 flex flex-col gap-2">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-2 mb-2">Main Menu</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" screen="Dashboard" />
            <SidebarItem icon={Wallet} label="Budget Planner" screen="Budget" />
            <SidebarItem icon={ShoppingBag} label="Shopping Simulator" screen="Shopping" />
            <SidebarItem icon={MapPin} label="Neighbourhoods" screen="Neighbourhoods" />
            <SidebarItem icon={Smartphone} label="Mobile Money" screen="MobileMoney" />
            <SidebarItem icon={Trophy} label="Achievements" screen="Achievements" />
            
            <div className="mt-8">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-2 mb-2">Account</p>
              <button 
                onClick={() => setActiveScreen('Welcome')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>

          <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              {currentUser?.[0] || 'G'}
            </div>
            <div>
              <p className="text-white text-sm font-bold">{currentUser || 'Guest'}</p>
              <p className="text-slate-400 text-xs">Level {userLevel} Expert</p>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeScreen === 'Welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-8 text-center bg-white"
            >
              <div className="max-w-3xl">
                <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-4 block">Zambia Financial Literacy Platform</span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Master Your Financial Future</h1>
                <p className="text-slate-500 text-xl mb-10 leading-relaxed">
                  "Investment in knowledge pays the best interest." <br />
                  Learn budgeting, saving, and investing through interactive simulations.
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setActiveScreen('Register')}
                    className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-3"
                  >
                    Get Started <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveScreen('Login')}
                    className="px-10 py-5 border-2 border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === 'Login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="h-full flex items-center justify-center p-6 bg-slate-50"
            >
              <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                  <p className="text-slate-500 mt-2">Sign in to continue your journey</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Username</label>
                    <input type="text" placeholder="Enter username" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
                    <input type="password" placeholder="Enter password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" required />
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">Sign In</button>
                </form>
                <p className="text-center text-slate-500 mt-8">
                  No account? <button onClick={() => setActiveScreen('Register')} className="text-blue-600 font-bold hover:underline">Register Now</button>
                </p>
              </div>
            </motion.div>
          )}

          {activeScreen === 'Register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="h-full flex items-center justify-center p-6 bg-slate-50"
            >
              <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                  <p className="text-slate-500 mt-2">Start your financial literacy journey</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Income Category</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Student</option>
                      <option>Informal Trader</option>
                      <option>Civil Servant</option>
                      <option>Entrepreneur</option>
                      <option>Farmer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Monthly Income (Kwacha)</label>
                    <input type="number" placeholder="5000" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all mt-4">Create Account</button>
                </form>
                <p className="text-center text-slate-500 mt-6">
                  Already have an account? <button onClick={() => setActiveScreen('Login')} className="text-blue-600 font-bold hover:underline">Sign In</button>
                </p>
              </div>
            </motion.div>
          )}

          {activeScreen === 'Dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-10 space-y-10"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h2>
                  <p className="text-slate-500 mt-1">Track your progress and continue learning</p>
                </div>
                <div className="bg-blue-50 px-6 py-3 rounded-2xl flex items-center gap-4 text-blue-600 border border-blue-100">
                   <div className="text-right">
                     <p className="text-xs font-bold uppercase tracking-wider opacity-70">Experience Points</p>
                     <p className="text-xl font-black">{userXP} XP</p>
                   </div>
                   <Award size={32} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Balance" value={`K ${balance.toLocaleString()}`} icon={Wallet} colorClass="bg-blue-100 text-blue-600" />
                <StatCard label="Monthly Savings" value={`K ${currentMonthSavings.toLocaleString()}`} icon={CircleDollarSign} colorClass="bg-emerald-100 text-emerald-600" />
                <StatCard label="Current Level" value={`Level ${userLevel}`} icon={MapPin} colorClass="bg-purple-100 text-purple-600" />
                <StatCard label="Achievements" value="5 Unlocked" icon={Trophy} colorClass="bg-amber-100 text-amber-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                       <MapPin size={20} className="text-blue-600" /> 
                       Nearby Business Opportunities
                    </h3>
                    <button onClick={() => setActiveScreen('Neighbourhoods')} className="text-blue-600 font-bold text-sm hover:underline">View All Levels</button>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-blue-600 font-bold text-xs uppercase mb-2">Kabulonga Gardens (Level 1)</p>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">Manda Mini Mart</h4>
                      <p className="text-slate-500 text-sm">Retail business simulation. Master your daily cash flow management.</p>
                      <button onClick={() => setActiveScreen('Shopping')} className="mt-4 w-full py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm hover:border-blue-500 transition-all">Launch Simulator</button>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-blue-600 font-bold text-xs uppercase mb-2">Woodlands Heights (Level 2)</p>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">PrimeWear Boutique</h4>
                      <p className="text-slate-500 text-sm">Learn about stock management and pricing strategies for profit.</p>
                      <button className="mt-4 w-full py-3 bg-slate-200 text-slate-500 border-2 border-slate-200 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                        <Lock size={16} /> Locked
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 tracking-tight">Smart Budgeting</h3>
                      <p className="opacity-80 leading-relaxed font-medium">Use the 50/30/20 rule to manage your money effectively.</p>
                    </div>
                    <div>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span>Needs (50%)</span>
                          <span className="font-bold">K {currentMonthNeeds.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                          <div className="bg-white h-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      <button onClick={() => setActiveScreen('Budget')} className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-black/10 hover:bg-slate-100 transition-all">Open Planner</button>
                    </div>
                  </div>
                  <CircleDollarSign size={160} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === 'Neighbourhoods' && (
            <motion.div 
              key="neighbourhoods"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-10"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Zambian Neighbourhoods</h2>
                <p className="text-slate-500 mt-1">Explore different areas and their business opportunities</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
                {[
                  {
                    level: 1,
                    title: "Kabulonga Gardens",
                    tier: "Free Tier",
                    businesses: ["Manda Mini Mart", "ZamFresh Market", "CityConnect Airtime"],
                    focus: "Needs vs Wants, Emergency fund basics",
                    unlocked: true,
                    color: "emerald"
                  },
                  {
                    level: 2,
                    title: "Woodlands Heights",
                    tier: "Paid Tier (K50/month)",
                    businesses: ["CopperTech Electronics", "PrimeWear Boutique", "Savanna Fuel Station"],
                    focus: "Credit management, Saving for capital, Opportunity cost",
                    unlocked: userXP >= 100,
                    color: "blue"
                  },
                  {
                    level: 3,
                    title: "Levy Financial District",
                    tier: "Premium Tier (K100/month)",
                    businesses: ["Zambezi Capital Investments", "Kafue Property Holdings", "FutureGrowth Agro Ventures"],
                    focus: "Stocks & bonds, Real estate investing, Agricultural investments",
                    unlocked: userXP >= 300,
                    color: "purple"
                  },
                  {
                    level: 4,
                    title: "Mukuba Enterprise Park",
                    tier: "Advanced Tier (K200/month)",
                    businesses: ["CopperRise Manufacturing", "ZamTech Innovations", "GreenHarvest Exporters"],
                    focus: "Business registration via PACRA, Revenue vs profit, Tax fundamentals",
                    unlocked: userXP >= 600,
                    color: "amber"
                  }
                ].map((n) => (
                  <div key={n.level} className={`bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col ${!n.unlocked && 'opacity-60 grayscale'}`}>
                    <div className={`h-2 bg-${n.color}-500 w-full`}></div>
                    <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className={`text-${n.color}-600 font-bold text-xs uppercase mb-1`}>Level {n.level}</p>
                          <h3 className="text-2xl font-bold text-slate-900">{n.title}</h3>
                        </div>
                        {!n.unlocked && <Lock size={20} className="text-slate-400" />}
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-slate-500 text-xs font-bold uppercase mb-3 tracking-widest">Key Businesses</p>
                          <div className="flex flex-wrap gap-2">
                            {n.businesses.map(b => (
                              <span key={b} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-medium">{b}</span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs font-bold uppercase mb-2 tracking-widest">Learning Focus</p>
                          <div className="text-slate-700 font-medium flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${n.color}-500 mt-2 shrink-0`}></div>
                            {n.focus}
                          </div>
                        </div>

                        <div className="pt-4 mt-auto">
                          {n.unlocked ? (
                            <button className={`w-full py-4 bg-${n.color}-500 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2`}>
                              Enter Neighbourhood <ChevronRight size={18} />
                            </button>
                          ) : (
                            <div className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold text-center border border-slate-200">
                              Requires Level {n.level} & Access Fee
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeScreen === 'MobileMoney' && (
             <motion.div 
               key="mobilemoney"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="p-10 flex flex-col items-center"
             >
                <div className="max-w-md w-full mb-10 text-center">
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mobile Money Simulator</h2>
                  <p className="text-slate-500 mt-2">Learn to use MTN MoMo and Airtel Money safely without risking real funds.</p>
                </div>

                {/* Phone Simulators Group */}
                <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-5xl">
                  {/* MTN MoMo Simulator */}
                  <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[45px] border-[8px] border-slate-800 shadow-2xl p-3 flex flex-col gap-4">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                    <div className="bg-[#FFCC00] flex-1 rounded-[32px] overflow-hidden flex flex-col">
                      <div className="p-6 pt-10 text-center flex flex-col items-center">
                        <div className="bg-white w-12 h-12 rounded-xl shadow flex items-center justify-center mb-3">
                          <Smartphone size={24} className="text-slate-900" />
                        </div>
                        <h3 className="text-slate-900 font-black text-xl tracking-tighter">MTN MoMo</h3>
                        <div className="mt-4 bg-black/5 rounded-xl p-3 w-full">
                          <p className="text-slate-800 text-[10px] font-bold uppercase opacity-60">Balance</p>
                          <p className="text-slate-900 font-extrabold text-xl tracking-tight">K {balance.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex-1 bg-white mx-1 mb-1 rounded-[28px] p-4 shadow-xl">
                        <div className="grid grid-cols-2 gap-3">
                          {['Send Money', 'Receive', 'Airtime', 'Pay Bills', 'Savings', 'Statement'].map((item) => (
                            <button 
                              key={item}
                              onClick={() => {
                                setUserXP(p => p + 10);
                                alert(`${item} simulation completed on MTN! You earned 10 XP.`);
                              }}
                              className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-100 transition-all active:scale-95"
                            >
                              <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                <Info size={14} className="text-slate-800" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-800 tracking-tight">{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Airtel Money Simulator */}
                  <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[45px] border-[8px] border-slate-800 shadow-2xl p-3 flex flex-col gap-4">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                    <div className="bg-[#E11D48] flex-1 rounded-[32px] overflow-hidden flex flex-col">
                      <div className="p-6 pt-10 text-center flex flex-col items-center">
                        <div className="bg-white w-12 h-12 rounded-xl shadow flex items-center justify-center mb-3">
                          <Smartphone size={24} className="text-rose-600" />
                        </div>
                        <h3 className="text-white font-black text-xl tracking-tighter">Airtel Money</h3>
                        <div className="mt-4 bg-white/10 rounded-xl p-3 w-full border border-white/10">
                          <p className="text-white/70 text-[10px] font-bold uppercase">Balance</p>
                          <p className="text-white font-extrabold text-xl tracking-tight">K {balance.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex-1 bg-white mx-1 mb-1 rounded-[28px] p-4 shadow-xl">
                        <div className="grid grid-cols-2 gap-3">
                          {['Send Money', 'Data', 'Merchant', 'Pay Bills', 'Loans', 'Withdraw'].map((item) => (
                            <button 
                              key={item}
                              onClick={() => {
                                setUserXP(p => p + 10);
                                alert(`${item} simulation completed on Airtel! You earned 10 XP.`);
                              }}
                              className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-100 transition-all active:scale-95"
                            >
                              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                                <Info size={14} className="text-rose-600" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-800 tracking-tight">{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md w-full">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info size={18} className="text-blue-600" /> 
                    Safety Tips
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Always keep your PIN secret
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Check your balance regularly
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Never share OTP codes
                    </li>
                  </ul>
                </div>
             </motion.div>
          )}

          {activeScreen === 'Budget' && (
            <motion.div 
              key="budget"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-10 max-w-6xl space-y-10"
            >
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Budget Planner</h2>
                <p className="text-slate-500 mt-1 italic">"Apply the 50/30/20 budgeting rule to your income"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                    <Wallet size={24} className="text-blue-600" /> Enter Your Income
                  </h3>
                  <p className="text-slate-500 text-sm">We will calculate your recommended budget breakdown based on your monthly earnings.</p>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Income (Kwacha)</label>
                    <input 
                      type="number" 
                      value={budgetIncome}
                      onChange={(e) => setBudgetIncome(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setUserXP(prev => prev + 50);
                      alert("Budget calculated! You earned 50 XP.");
                    }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    Calculate Budget & Save
                  </button>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-xl text-slate-900">Your Budget Breakdown</h3>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-blue-900">Needs (50%)</p>
                        <p className="font-black text-blue-600 text-xl">K {(Number(budgetIncome) * 0.5).toLocaleString()}</p>
                      </div>
                      <p className="text-blue-800/60 text-xs font-medium">Housing, food, utilities, transport</p>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-purple-900">Wants (30%)</p>
                        <p className="font-black text-purple-600 text-xl">K {(Number(budgetIncome) * 0.3).toLocaleString()}</p>
                      </div>
                      <p className="text-purple-800/60 text-xs font-medium">Entertainment, dining out, hobbies</p>
                    </div>

                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-emerald-900">Savings (20%)</p>
                        <p className="font-black text-emerald-600 text-xl">K {(Number(budgetIncome) * 0.2).toLocaleString()}</p>
                      </div>
                      <p className="text-emerald-800/60 text-xs font-medium">Emergency fund, investments, debt repayment</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === 'Shopping' && (
            <motion.div 
              key="shopping"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-10 space-y-8"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Simulator</h2>
                  <p className="text-slate-500 mt-1">Learn to distinguish NEEDS from WANTS at Manda Mini Mart</p>
                </div>
                <div className="bg-emerald-100 px-6 py-3 rounded-2xl text-emerald-700 font-bold border border-emerald-200">
                  Budget: K {balance.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Bread & Mealie Meal", price: 85, isNeed: true },
                  { name: "Electricity Units", price: 200, isNeed: true },
                  { name: "PlayStation Game", price: 450, isNeed: false },
                  { name: "Nike Sneakers", price: 1200, isNeed: false },
                  { name: "Medicine", price: 150, isNeed: true },
                  { name: "iPhone Case", price: 180, isNeed: false },
                  { name: "Bus Fare (Week)", price: 100, isNeed: true },
                  { name: "Pizza Delivery", price: 120, isNeed: false },
                ].map((item) => (
                  <div key={item.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
                    <span className={`self-start text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${item.isNeed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.isNeed ? 'Need' : 'Want'}
                    </span>
                    <h4 className="font-bold text-center text-slate-900 text-lg">{item.name}</h4>
                    <p className="text-center text-2xl font-black text-slate-900">K {item.price}</p>
                    <button 
                      onClick={() => {
                        if (balance >= item.price) {
                          setCart(prev => [...prev, item]);
                          setBalance(prev => prev - item.price);
                        } else {
                          alert("Insufficient balance!");
                        }
                      }}
                      className="w-full py-3 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg mt-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Shopping Cart ({cart.length})</h3>
                    <button onClick={() => {
                      const needsCount = cart.filter(c => c.isNeed).length;
                      const wantsCount = cart.length - needsCount;
                      const xp = (needsCount * 20) + (wantsCount * 5);
                      setUserXP(p => p + xp);
                      alert(`Checkout complete! You followed a healthy balance. Earned ${xp} XP.`);
                      setCart([]);
                    }} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Checkout</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cart.map((item, i) => (
                      <span key={i} className={`px-4 py-2 border rounded-xl text-sm font-bold flex items-center gap-2 ${item.isNeed ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                        {item.name} <span className="opacity-50">K {item.price}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeScreen === 'Achievements' && (
            <motion.div 
              key="achievements"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-10 space-y-10"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Achievements</h2>
                  <p className="text-slate-500 mt-1">Track your progress and unlock badges as you grow</p>
                </div>
                <div className="text-blue-600 font-bold text-xl">Total XP: {userXP}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Getting Started", desc: "Complete your first login", xp: 50, icon: <LayoutDashboard />, unlocked: true, color: "blue" },
                  { title: "Smart Shopper", desc: "Buy 3 'Needs' in one visit", xp: 100, icon: <ShoppingBag />, unlocked: cart.length > 3, color: "emerald" },
                  { title: "Budget Master", desc: "Calculate your first budget", xp: 150, icon: <Wallet />, unlocked: userXP > 50, color: "purple" },
                  { title: "Saver Spirit", desc: "Save your first K1000", xp: 200, icon: <CircleDollarSign />, unlocked: currentMonthSavings >= 1000, color: "amber" },
                  { title: "Mobile Master", desc: "Use all Mobile Money tools", xp: 150, icon: <Smartphone />, unlocked: userXP > 200, color: "rose" },
                  { title: "Explorer", desc: "Visit Zambian areas", xp: 300, icon: <MapPin />, unlocked: userLevel >= 2, color: "indigo" },
                ].map((ach) => (
                  <div key={ach.title} className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 transition-all ${!ach.unlocked && 'opacity-40 grayscale'}`}>
                    <div className={`p-5 rounded-2xl bg-${ach.color}-100 text-${ach.color}-600`}>
                      {ach.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{ach.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{ach.desc}</p>
                    </div>
                    <div className="mt-auto pt-4 flex flex-col items-center">
                       <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-full ${ach.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                         {ach.unlocked ? 'Unlocked' : 'Locked'}
                       </span>
                       <p className="text-xs font-bold text-slate-400 mt-2">{ach.xp} XP reward</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-2">Level {userLevel} Progress</h3>
                   <p className="text-white/60 mb-8 max-w-md">Keep earning XP through simulations to unlock premium neighbourhoods and expert financial tools.</p>
                   
                   <div className="space-y-3">
                     <div className="flex justify-between font-bold text-sm">
                       <span>{userXP % 100} / 100 XP to Level {userLevel + 1}</span>
                       <span>{userXP % 100}%</span>
                     </div>
                     <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${userXP % 100}%` }}
                        className="bg-blue-500 h-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                       ></motion.div>
                     </div>
                   </div>
                </div>
                <Trophy size={200} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
