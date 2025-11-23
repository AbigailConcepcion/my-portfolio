import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Linkedin, Mail, ExternalLink, 
  Code, Database, Layout, Terminal, 
  Menu, X, Moon, Sun, 
  CheckCircle, Activity, Users, ShoppingBag, Calculator,
  Lock, Loader,
  Pin, Star, Smartphone as MobileIcon, XCircle, Check,
  Heart, Thermometer, User, FileText, Search, Filter,
  ArrowRight, ShoppingCart, Trash2, Plus, ArrowLeft
} from 'lucide-react';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

interface BaseAppProps {
  onClose: () => void;
}

interface CalculatorAppProps extends BaseAppProps {
  isDarkMode: boolean;
}

interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
  icon: ReactNode;
  pinned?: boolean;
  externalLink?: string;
}

interface SkillCategory {
  category: string;
  icon: ReactNode;
  items: string[];
}

interface Patient {
  id: number;
  name: string;
  status: 'Stable' | 'Critical';
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: ReactNode;
}

// ==========================================
// 2. FULL SOURCE CODE STRINGS
// ==========================================
const FULL_CODE_STRINGS: Record<string, string> = {
  loans: `// Source code for Loans App (Mobile)\n// React Native / Expo implementation...`,
  psymetrics: `// Source code for Psymetrics\n// React implementation with Personality scoring...`,
  apicella: `// Source code for Apicella Health\n// HIPAA Compliant Dashboard implementation...`,
  ecommerce: `// Source code for DevStore\n// Cart logic and Payment processing...`,
  "ai-calculator": `// Source code for AI Calculator\n// Math evaluation logic...`
};

// ==========================================
// 3. INTERNAL MINI-APPS (FIXED & UPGRADED)
// ==========================================

// --- 3.1 CALCULATOR (Fixed Layout) ---
const CalculatorApp: React.FC<CalculatorAppProps> = ({ isDarkMode, onClose }) => {
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string[]>([]);

  const handleBtn = (val: string) => {
    if (val === 'C') setDisplay('0');
    else if (val === 'BS') setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    else if (val === '=') {
      try {
        // eslint-disable-next-line no-new-func
        const res = new Function('return ' + display)();
        const newHistory = [...history, `${display} = ${res}`].slice(-3);
        setHistory(newHistory);
        setDisplay(String(res));
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-sm bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-4 bg-gray-900 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center gap-2 text-pink-500 font-bold"><Calculator size={20} /> AI Calc</div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800"><X size={20}/></button>
        </div>
        <div className="p-6 bg-gray-900 text-right">
          <div className="text-gray-500 text-xs h-16 overflow-y-auto flex flex-col justify-end">
            {history.map((h, i) => <div key={i}>{h}</div>)}
          </div>
          <div className="text-4xl text-white font-mono mt-2 font-bold truncate">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-800">
          {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'BS', '='].map((btn) => (
            <button key={btn} onClick={() => handleBtn(btn)} 
              className={`p-4 sm:p-5 text-lg sm:text-xl font-bold rounded-lg transition-colors active:scale-95 ${btn === '=' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-white hover:bg-gray-700'}`}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3.2 PSYMETRICS (Fixed Questions & Responsive) ---
const PsymetricsApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    { id: 1, text: "I enjoy being the center of attention in groups." },
    { id: 2, text: "I like to solve complex problems logically." },
    { id: 3, text: "I get stressed easily under pressure." },
    { id: 4, text: "I sympathize with others' feelings." },
    { id: 5, text: "I prefer variety to routine." }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep('result');
      }, 2000);
    }
  };

  const getPersonalityType = () => {
    const sum = answers.reduce((a, b) => a + b, 0);
    if (sum > 20) return "The Visionary (ENTP)";
    if (sum > 15) return "The Advocate (INFJ)";
    return "The Logician (INTP)";
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex flex-col">
      <nav className="bg-white shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl"><Activity /> Psymetrics</div>
        <button onClick={onClose} className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full flex items-center gap-2 border border-transparent hover:border-gray-200 transition-all">
          <ExternalLink size={16}/> <span className="hidden sm:inline">Exit Demo</span><span className="sm:hidden">Exit</span>
        </button>
      </nav>
      
      <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {step === 'intro' && (
          <div className="text-center space-y-6 animate-fadeIn bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-6">
              <Activity size={40} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Personality Analytics</h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">Discover your professional archetype through our data-driven psychological assessment engine.</p>
            <button onClick={() => setStep('test')} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-transform active:scale-95 mt-8">
              Start Assessment
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
            <Loader className="animate-spin text-blue-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800">Analyzing Responses...</h3>
            <p className="text-slate-500">Calculating psychometric scores</p>
          </div>
        )}

        {step === 'test' && !isAnalyzing && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex justify-between text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>{Math.round(((currentQ + 1) / questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{width: `${((currentQ + 1) / questions.length) * 100}%`}}></div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-slate-800 leading-relaxed">{questions[currentQ].text}</h2>
            
            <div className="grid gap-3">
              {[5, 4, 3, 2, 1].map((val) => (
                <button 
                  key={val} 
                  onClick={() => handleAnswer(val)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group
                    ${val === 5 ? 'hover:bg-green-50 hover:border-green-200' : ''}
                    ${val === 1 ? 'hover:bg-red-50 hover:border-red-200' : 'hover:bg-slate-50 hover:border-blue-200'}
                  `}
                >
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">
                    {val === 5 && "Strongly Agree"}
                    {val === 4 && "Agree"}
                    {val === 3 && "Neutral"}
                    {val === 2 && "Disagree"}
                    {val === 1 && "Strongly Disagree"}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center group-hover:border-current`}>
                    <div className="w-3 h-3 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
           <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-slate-100 animate-fadeIn">
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 ring-8 ring-green-50">
               <CheckCircle size={48} />
             </div>
             <h2 className="text-3xl font-bold text-slate-900 mb-2">{getPersonalityType()}</h2>
             <p className="text-slate-500 mb-8">Based on your responses, you exhibit strong analytical traits suitable for engineering roles.</p>
             <div className="flex gap-4">
               <button onClick={() => { setAnswers([]); setCurrentQ(0); setStep('intro'); }} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-colors">Retake</button>
               <button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20">Save Results</button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

// --- 3.3 APICELLA HEALTH ---
const ApicellaApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [tab, setTab] = useState('patients');
  const [patients] = useState<Patient[]>([
    { id: 1, name: "Sarah Connor", status: "Stable" }, 
    { id: 2, name: "Rick Deckard", status: "Critical" },
    { id: 3, name: "Ellen Ripley", status: "Stable" }
  ]);

  return (
    <div className="min-h-screen w-full bg-teal-50 font-sans text-slate-800 flex flex-col">
      <div className="bg-teal-700 text-white px-4 sm:px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl"><Activity className="text-teal-200"/> Apicella<span className="opacity-75 font-normal">Health</span></div>
        <button onClick={onClose} className="text-teal-100 hover:text-white flex items-center gap-2 bg-teal-800/50 px-3 py-1.5 rounded-lg text-sm"><Lock size={14}/> <span className="hidden sm:inline">Secure Logout</span></button>
      </div>
      
      <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-teal-100 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">DR</div>
              <div>
                <div className="font-bold text-sm">Dr. Concepcion</div>
                <div className="text-xs text-slate-500">Chief Resident</div>
              </div>
            </div>
          </div>
          {['Patients', 'Schedule', 'Messages', 'Lab Results'].map((item) => (
            <button 
              key={item} 
              onClick={() => setTab(item.toLowerCase())}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between
                ${tab === item.toLowerCase() ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-teal-50 border border-transparent hover:border-teal-100'}
              `}
            >
              {item}
              {item === 'Messages' && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">3</span>}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
           {/* Stats */}
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {l: "Total Patients", v: "1,240", i: <Users/>, c: "text-blue-600"},
                {l: "Critical", v: "12", i: <Activity/>, c: "text-red-500"},
                {l: "Appointments", v: "48", i: <FileText/>, c: "text-purple-600"},
                {l: "Online Staff", v: "8", i: <User/>, c: "text-green-600"},
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-teal-50">
                  <div className={`${stat.c} mb-2`}>{stat.i}</div>
                  <div className="text-2xl font-bold text-slate-800">{stat.v}</div>
                  <div className="text-xs text-slate-500">{stat.l}</div>
                </div>
              ))}
           </div>

           {/* Table */}
           <div className="bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden">
            <div className="p-4 border-b border-teal-50 bg-teal-50/50 flex justify-between items-center">
              <div className="font-bold text-teal-900 flex items-center gap-2"><FileText size={16}/> Patient Records</div>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-teal-100 rounded text-teal-600"><Search size={16}/></button>
                <button className="p-1.5 hover:bg-teal-100 rounded text-teal-600"><Filter size={16}/></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-teal-700 uppercase bg-teal-50/50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Visit</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(p => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-500">#{String(p.id).padStart(4, '0')}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">{p.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1 ${p.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {p.status === 'Critical' ? <Thermometer size={12}/> : <Heart size={12}/>}
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">Oct 24, 2023</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3.4 ECOMMERCE APP (Fixed React Child Error) ---
const EcommerceApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [view, setView] = useState<'store' | 'cart' | 'checkout' | 'success'>('store');
  const [cart, setCart] = useState<Product[]>([]);
  const [category, setCategory] = useState('All');

  const products: Product[] = [
    {id:1, name:"Pro Wireless Headset", price:129, category: "Audio", image: <div className="text-4xl">🎧</div>},
    {id:2, name:"Mechanical Keyboard", price:159, category: "Tech", image: <div className="text-4xl">⌨️</div>},
    {id:3, name:"4K Monitor 27\"", price:349, category: "Tech", image: <div className="text-4xl">🖥️</div>},
    {id:4, name:"Ergo Mouse", price:89, category: "Tech", image: <div className="text-4xl">🖱️</div>},
    {id:5, name:"USB-C Hub", price:45, category: "Accessories", image: <div className="text-4xl">🔌</div>},
    {id:6, name:"Desk Mat", price:29, category: "Accessories", image: <div className="text-4xl">⬛</div>},
  ];

  const filteredProducts = category === 'All' ? products : products.filter(p => p.category === category);
  const cartTotal = cart.reduce((a, b) => a + b.price, 0);

  // FIXED: Moved timer logic to useEffect
  useEffect(() => {
    if (view === 'checkout') {
      const timer = setTimeout(() => setView('success'), 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans flex flex-col">
      <nav className="bg-white shadow-sm px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-bold text-purple-700 text-xl flex items-center gap-2"><ShoppingBag/> DevStore</div>
          <div className="flex items-center gap-4">
             <button onClick={() => setView('cart')} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
               <ShoppingCart size={24} className="text-gray-700"/>
               {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cart.length}</span>}
             </button>
             <button onClick={onClose}><XCircle className="text-gray-400 hover:text-gray-600"/></button>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6">
        {view === 'store' && (
          <>
            {/* Categories */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Tech', 'Audio', 'Accessories'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-32 sm:h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {p.image}
                  </div>
                  <div className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">{p.category}</div>
                  <div className="font-bold text-gray-800 mb-1 truncate">{p.name}</div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="font-bold text-lg">${p.price}</div>
                    <button onClick={() => setCart([...cart, p])} className="bg-gray-900 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors shadow-lg shadow-gray-900/10">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'cart' && (
          <div className="max-w-2xl mx-auto">
             <button onClick={() => setView('store')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium"><ArrowLeft size={16}/> Continue Shopping</button>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-2xl mb-6 flex items-center gap-2">Shopping Cart <span className="text-sm font-normal text-gray-400">({cart.length} items)</span></h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20"/>
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl">{item.image}</div>
                           <div>
                             <div className="font-bold">{item.name}</div>
                             <div className="text-sm text-gray-500">${item.price}</div>
                           </div>
                         </div>
                         <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                      </div>
                    ))}
                  </div>
                )}
                
                {cart.length > 0 && (
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-500">Total</span>
                      <span className="text-3xl font-bold">${cartTotal}</span>
                    </div>
                    <button onClick={() => setView('checkout')} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-600/20 transition-all active:scale-95">Checkout Now</button>
                  </div>
                )}
             </div>
          </div>
        )}

        {view === 'checkout' && (
           <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center mt-12">
             <Loader className="animate-spin mx-auto text-purple-600 mb-6" size={48}/>
             <h2 className="text-xl font-bold mb-2">Processing Payment</h2>
             <p className="text-gray-500 mb-6">Connecting to secure gateway...</p>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full w-1/2 animate-pulse"></div>
             </div>
           </div>
        )}

        {view === 'success' && (
          <div className="max-w-md mx-auto text-center pt-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-500"/>
            </div>
            <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
            <button onClick={() => {setCart([]); setView('store');}} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN PORTFOLIO COMPONENT
// ==========================================

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'portfolio' | 'app'>('portfolio'); 
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [activeCode, setActiveCode] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- NAVIGATION HANDLER ---
  const handleLiveDemo = (project: Project) => {
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else {
      setActiveAppId(project.id);
      setCurrentView('app');
      window.scrollTo(0, 0);
    }
  };

  const viewCode = (id: string) => {
    setActiveCode(FULL_CODE_STRINGS[id] || "// Code not available for this component in this demo.");
    setIsCodeModalOpen(true);
  };

  const closeApp = () => {
    setCurrentView('portfolio');
    setActiveAppId(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleEmailClick = (email: string) => {
    const copyToClipboard = (text: string) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
          })
          .catch((err) => {
            console.warn("Clipboard API failed, trying fallback...", err);
            fallbackCopy(text);
          });
      } else {
        fallbackCopy(text);
      }
    };

    const fallbackCopy = (text: string) => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 2000);
        }
      } catch (err) {
        console.error("Fallback copy error", err);
      }
    };
    copyToClipboard(email);
  };

  // --- RENDER ACTIVE APP ---
  if (currentView === 'app') {
    if (activeAppId === 'psymetrics') return <PsymetricsApp onClose={closeApp} />;
    if (activeAppId === 'apicella') return <ApicellaApp onClose={closeApp} />;
    if (activeAppId === 'ecommerce') return <EcommerceApp onClose={closeApp} />;
    if (activeAppId === 'ai-calculator') return <CalculatorApp isDarkMode={isDarkMode} onClose={closeApp} />;
  }

  // --- PORTFOLIO DATA ---
  const portfolioData: {
    personal: { name: string; title: string; summary: string; links: { email: string; github: string; linkedin: string } };
    skills: SkillCategory[];
    projects: Project[];
  } = {
    personal: {
      name: "Abigail Concepcion",
      title: "Full Stack Software Developer",
      summary: "Building robust, scalable applications with modern web technologies. Specialized in React, TypeScript, and User Experience Design.",
      links: {
        email: "concepcionabigail03@gmail.com",
        github: "github.com/AbigailConcepcion",
        linkedin: "www.linkedin.com/in/abi-concepcion"
      }
    },
    skills: [
      { category: "Frontend", icon: <Layout size={20} />, items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"] },
      { category: "Backend", icon: <Terminal size={20} />, items: ["Node.js", "Express", "Python", "Django", "REST APIs"] },
      { category: "Database & Cloud", icon: <Database size={20} />, items: ["PostgreSQL", "MongoDB", "Firebase", "AWS", "Docker"] },
    ],
    projects: [
      {
        id: "loans",
        title: "Loan Tracker Pro",
        desc: "A comprehensive mobile-first financial tool for tracking lending, calculating interest, and managing borrower schedules.",
        tags: ["React Native", "Expo", "Financial Tech"],
        color: "yellow",
        icon: <MobileIcon />,
        pinned: true,
        externalLink: "https://preview-0nwsfzfz--loans-tracking-mobile-1.deploypad.app/"
      },
      {
        id: "psymetrics",
        title: "Psymetrics Engine",
        desc: "Interactive psychological assessment platform featuring real-time scoring, data visualization, and archetype mapping.",
        tags: ["React", "Data Viz", "Algorithms"],
        color: "blue",
        icon: <Activity />
      },
      {
        id: "apicella",
        title: "Apicella Health Dashboard",
        desc: "HIPAA-compliant medical dashboard for patient management, vitals monitoring, and staff scheduling.",
        tags: ["Healthcare", "Dashboard", "Security"],
        color: "teal",
        icon: <Users />
      },
      {
        id: "ecommerce",
        title: "DevStore E-Commerce",
        desc: "Full-featured online store with category filtering, shopping cart state management, and simulated payment gateway.",
        tags: ["E-commerce", "Context API", "UX"],
        color: "purple",
        icon: <ShoppingBag />
      },
      {
        id: "ai-calculator",
        title: "Smart Logic Calculator",
        desc: "Advanced calculator with history tracking, error handling, and a responsive neumorphic interface.",
        tags: ["Logic", "UI Design", "Utility"],
        color: "pink",
        icon: <Calculator />
      }
    ]
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-white text-slate-800'}`}>
      
      {/* Code Viewer Modal */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1e1e1e] w-full max-w-4xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center px-4 py-3 bg-[#252526] border-b border-gray-700">
              <span className="text-sm font-mono text-blue-400 flex items-center gap-2"><Code size={16}/> Source Code Preview</span>
              <button onClick={() => setIsCodeModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="p-0 overflow-auto bg-[#1e1e1e] custom-scrollbar">
              <pre className="p-4 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                <code>{activeCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? (isDarkMode ? 'bg-[#0f172a]/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md') : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-white font-bold group-hover:bg-blue-500 transition-colors">A</div>
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Concepcion</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item}</button>
              ))}
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400' : 'text-slate-600'}`}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className={`md:hidden absolute w-full shadow-xl border-b ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="px-4 pt-2 pb-4 space-y-1">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}`}>{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="about" className="pt-32 pb-20 px-4 flex items-center min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse`}></div>
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse`}></div>

        <div className="max-w-7xl mx-auto w-full text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 font-bold text-sm mb-6 border border-blue-500/20">
            Available for Hire
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            Building the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Digital Future.</span>
          </h1>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {portfolioData.personal.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <button onClick={() => scrollToSection('projects')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
               View My Work <ArrowRight size={20}/>
             </button>
             <button onClick={() => scrollToSection('contact')} className={`px-8 py-4 rounded-full font-bold text-lg border-2 transition-all hover:-translate-y-1 ${isDarkMode ? 'border-slate-700 text-slate-300 hover:border-white hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:border-black hover:bg-slate-50'}`}>
               Contact Me
             </button>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`py-24 px-4 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Arsenal</h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>The tools and technologies I use to bring ideas to life.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.skills.map((grp, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all hover:shadow-xl group ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' : 'bg-white border-slate-100 hover:border-blue-200'}`}>
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>{grp.icon}</div>
                  <h3 className="font-bold text-xl">{grp.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {grp.items.map((sk, j) => (
                    <span key={j} className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className={`max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>A collection of web and mobile applications demonstrating my capabilities.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((p, i) => (
              <div key={i} className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative flex flex-col ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                {p.pinned && (
                  <div className="absolute top-4 right-4 bg-yellow-400/10 text-yellow-500 border border-yellow-400/20 text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1 backdrop-blur-sm">
                    <Star size={12} fill="currentColor" /> Featured
                  </div>
                )}
                 
                <div className={`h-1.5 w-full bg-gradient-to-r from-${p.color}-500 to-${p.color}-300`}></div>
                
                <div className="p-8 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-inner ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-50 text-slate-700'}`}>
                    {p.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className={`text-sm mb-6 flex-grow leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map(t => (
                      <span key={t} className={`text-xs px-2 py-1 rounded font-medium ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleLiveDemo(p)} 
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                    >
                      <ExternalLink size={16}/> Demo
                    </button>
                    <button 
                      onClick={() => viewCode(p.id)} 
                      className={`flex-1 border py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      <Code size={16}/> Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-24 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Collaborate?</h2>
          <p className={`text-lg mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            I am currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleEmailClick(portfolioData.personal.links.email)}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg ${emailCopied ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'}`}
            >
              {emailCopied ? <Check size={20}/> : <Mail size={20}/>} 
              {emailCopied ? "Email Copied!" : "Send an Email"}
            </button>
            <a href={`https://${portfolioData.personal.links.linkedin}`} target="_blank" rel="noreferrer" className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-bold text-lg transition-colors ${isDarkMode ? 'border-slate-600 hover:bg-slate-800 hover:border-white' : 'border-slate-300 hover:bg-white hover:border-black'}`}>
              <Linkedin size={20}/> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm border-t ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
        <p>© 2024 Abigail Concepcion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
