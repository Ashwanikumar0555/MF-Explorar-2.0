
// "use client";

// import Link from "next/link";
// import Button from "../components/atoms/Button";
// import { Card, CardContent } from "../components/atoms/Card";
// import { BarChart3, Calculator, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Home() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-12 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, -90, 0],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="text-center max-w-4xl relative z-10"
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="inline-flex items-center justify-center mb-6"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
//             <div className="relative bg-white rounded-2xl p-4 shadow-lg">
//               <BarChart3 className="w-14 h-14 text-blue-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6"
//         >
//           <Sparkles className="w-4 h-4" />
//           <span>Your Smart Investment Companion</span>
//         </motion.div>

//         <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
//           <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Mutual Fund
//           </span>
//           <br />
//           <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//             Explorer
//           </span>
//         </h1>

//         <p className="mt-6 text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
//           Discover, analyze, and invest in Indian Mutual Funds with confidence. 
//           Track NAV history, calculate SIP returns, and make informed decisions 
//           with beautiful interactive insights.
//         </p>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
//         >
//           <Link href="/funds">
//             <Button size="lg" variant="primary" className="group shadow-lg hover:shadow-xl transition-all">
//               <BarChart3 className="w-5 h-5" /> 
//               Explore Funds
//               <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//           <Link href="/calculators">
//             <Button size="lg" variant="outline" className="shadow-md hover:shadow-lg transition-all">
//               <Calculator className="w-5 h-5" /> 
//               Try  Calculators
//             </Button>
//           </Link>
//         </motion.div>

//         {/* Trust Indicators */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-500"
//         >
//           <div className="flex items-center gap-2">
//             <Shield className="w-4 h-4 text-green-600" />
//             <span>Secure & Reliable</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <TrendingUp className="w-4 h-4 text-blue-600" />
//             <span>Real-time Data</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-purple-600" />
//             <span>Free Forever</span>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Features Section */}
//       <motion.section
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid md:grid-cols-2 gap-6 mt-24 max-w-5xl w-full relative z-10"
//       >
//         <motion.div variants={itemVariants}>
//           <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
//             <CardContent className="relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
//               <div className="relative">
//                 <div className="inline-flex p-3 bg-purple-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
//                   <BarChart3 className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <h3 className="font-bold text-2xl mb-3 text-gray-900">Track Funds Easily</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Get detailed insights into Indian mutual funds with real-time NAV
//                   history, performance metrics, and comprehensive comparisons to make 
//                   smarter investment choices.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div variants={itemVariants}>
//           <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
//             <CardContent className="relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
//               <div className="relative">
//                 <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
//                   <Calculator className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <h3 className="font-bold text-2xl mb-3 text-gray-900">Smart SIP Calculator</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Plan your investments with precision using our advanced SIP calculator.
//                   Visualize potential returns, compare scenarios, and chart your path to 
//                   financial goals.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </motion.section>

//       {/* Footer */}
//       <motion.footer
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="mt-24 text-sm text-gray-500 relative z-10"
//       >
//         © {new Date().getFullYear()} Mutual Fund Explorer. All rights reserved.
//       </motion.footer>
//     </main>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import { BarChart3, Calculator, TrendingUp, Shield, Sparkles, ArrowRight, Search, Star, Filter, ChevronRight, Zap, Target, PieChart, DollarSign, Briefcase, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Link from "next/link";

export default function MutualFundExplorer() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipMonths, setSipMonths] = useState(60);
  const [returnRate, setReturnRate] = useState(12);
  const [selectedFund, setSelectedFund] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock NAV history data
  const navHistory = [
    { month: 'Jan', nav: 1850 },
    { month: 'Feb', nav: 1920 },
    { month: 'Mar', nav: 1880 },
    { month: 'Apr', nav: 2010 },
    { month: 'May', nav: 2085 },
    { month: 'Jun', nav: 2145 },
  ];

  // Mock fund data
  const funds = [
    { id: 1, name: 'Growth Pro Fund', category: 'Large Cap', nav: 2145.32, ytd: 18.5, expense: 0.45, rating: 5, aum: '₹2,345 Cr' },
    { id: 2, name: 'Tech Vision Fund', category: 'Sector', nav: 1892.15, ytd: 22.3, expense: 0.65, rating: 4, aum: '₹1,892 Cr' },
    { id: 3, name: 'Balanced Wealth', category: 'Balanced', nav: 3421.87, ytd: 14.2, expense: 0.55, rating: 5, aum: '₹3,421 Cr' },
    { id: 4, name: 'Income Plus Fund', category: 'Debt', nav: 1234.56, ytd: 6.8, expense: 0.35, rating: 4, aum: '₹987 Cr' },
    { id: 5, name: 'Small Cap Growth', category: 'Small Cap', nav: 4567.89, ytd: 28.9, expense: 0.75, rating: 5, aum: '₹2,156 Cr' },
    { id: 6, name: 'Global Equity Fund', category: 'International', nav: 892.45, ytd: 19.4, expense: 0.85, rating: 4, aum: '₹1,543 Cr' },
  ];

  const filteredFunds = funds.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateSIP = () => {
    const monthlyRate = returnRate / 100 / 12;
    const months = sipMonths;
    const amount = sipAmount;
    
    const maturityValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const investedAmount = amount * months;
    const gains = maturityValue - investedAmount;
    
    return { maturityValue, investedAmount, gains };
  };

  const sipResults = calculateSIP();

  const stats = [
    { icon: Briefcase, label: '10,000+', value: 'Funds Available' },
    { icon: TrendingUp, label: '₹50L Cr', value: 'AUM Tracked' },
    { icon: Zap, label: '24/7', value: 'Real-time Updates' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        

        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-20 relative">
          <div className="max-w-6xl mx-auto w-full">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full hover:border-purple-400 transition-all group">
                <Sparkles className="w-4 h-4 text-purple-600 group-hover:animate-spin" />
                <span className="text-sm font-semibold text-purple-700">Your Smart Investment Companion</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl font-black text-center mb-8 tracking-tighter">
              <span className="text-gray-900">Invest with</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-clip-text">Confidence</span>
            </h1>

            <p className="text-center text-gray-600 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Analyze 10,000+ Indian mutual funds, track real-time NAV, calculate SIP returns, and make informed investment decisions with our intelligent platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/funds" passHref>
      <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-300/50 transition-all transform hover:scale-105">
        <BarChart3 className="w-5 h-5" />
        Explore Funds
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </Link>
             <button 
  className="px-8 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-purple-50 transition-all transform hover:scale-105"
  onClick={() => window.location.href = '/calculators'}
>
  <Calculator className="w-5 h-5" />
  Try Our Calculators: SIP, SWP, Lumpsum
</button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg group-hover:from-purple-200 group-hover:to-purple-100 transition-all">
                      <stat.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                      <div className="text-gray-600 text-sm font-medium">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Preview */}
            <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">NAV Trend (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={navHistory}>
                  <defs>
                    <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e9d5ff',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => `₹${value}`}
                  />
                  <Area type="monotone" dataKey="nav" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorNav)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-white border-t border-purple-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to make smarter investment decisions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: BarChart3, title: 'Fund Analytics', desc: 'Real-time NAV tracking, performance history, and detailed fund comparisons at your fingertips.' },
                { icon: Calculator, title: 'SIP Calculator', desc: 'Calculate projected returns with advanced algorithms and explore multiple investment scenarios.' },
                { icon: PieChart, title: 'Portfolio Builder', desc: 'Create diversified portfolios and track allocation across all major fund categories.' },
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-8 hover:border-purple-300 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIP Calculator */}
        <section id="calculator" className="py-24 px-6 bg-white border-t border-purple-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-4">SIP Calculator</h2>
              <p className="text-xl text-gray-600">Plan your investments and visualize your future wealth</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Calculator Input */}
              <div className="space-y-8">
                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-lg">Monthly Investment</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 font-bold text-xl">₹</span>
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-6 py-4 bg-white border-2 border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:border-purple-500 transition-all shadow-sm font-bold"
                    />
                  </div>
                  <div className="mt-3 text-gray-600 font-semibold">₹{sipAmount.toLocaleString('en-IN')}</div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-lg">Duration</label>
                  <input
                    type="range"
                    min="12"
                    max="240"
                    value={sipMonths}
                    onChange={(e) => setSipMonths(Number(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="text-gray-600 font-semibold mt-3">{sipMonths} months ({Math.round(sipMonths/12)} years)</div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-lg">Expected Return Rate</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="text-gray-600 font-semibold mt-3">{returnRate.toFixed(1)}% per annum</div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Projected Results</h3>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                    <p className="text-purple-100 text-sm mb-2 font-medium">Total Invested</p>
                    <p className="text-4xl font-black">₹{sipResults.investedAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                    <p className="text-green-100 text-sm mb-2 font-medium">Estimated Gains</p>
                    <p className="text-4xl font-black">₹{sipResults.gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
                    <p className="text-blue-100 text-sm mb-2 font-medium">Maturity Value</p>
                    <p className="text-4xl font-black">₹{sipResults.maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                  </div>

                  <button className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-300/50 transition-all transform hover:scale-105">
                    <Zap className="inline w-5 h-5 mr-2" />
                    Start Your Investment Journey
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black text-white mb-6">Ready to Invest Smart?</h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">Join thousands of investors who are already making data-driven investment decisions with our platform.</p>
            <button className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
              Get Started Now <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
          </div>
        </section>

        
      </div>
    </div>
  );
}