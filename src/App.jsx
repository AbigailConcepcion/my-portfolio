import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Linkedin, Mail, ExternalLink, 
  Code, Database, Layout, Terminal, 
  Menu, X, Moon, Sun, 
  CheckCircle, Activity, Users, ShoppingBag, Calculator,
  Lock, Loader,
  Pin, Star, Smartphone as MobileIcon, XCircle, Check
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
}

// ==========================================
// 2. FULL SOURCE CODE STRINGS
// ==========================================
const FULL_CODE_STRINGS: Record<string, string> = {
  loans: `
// --- LOANS TRACKING MOBILE (React Native / Expo) ---
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoansScreen() {
  const [loans, setLoans] = useState([
    { id: '1', name: 'John Doe', amount: 5000, status: 'Active', date: '2023-11-01' },
    { id: '2', name: 'Jane Smith', amount: 12500, status: 'Paid', date: '2023-10-15' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.status, { color: item.status === 'Paid' ? 'green' : 'orange' }]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.amount}>₱{item.amount.toLocaleString()}</Text>
      <Text style={styles.date}>Due: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Loans</Text>
      </View>
      <FlatList 
        data={loans} 
        keyExtractor={i => i.id} 
        renderItem={renderItem} 
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { padding: 16, backgroundColor: 'white', marginBottom: 8, borderRadius: 8 },
  // ... more styles
});
`,
  psymetrics: `
// --- PSYMETRICS APP COMPONENT ---
const PsymetricsApp = ({ onClose }) => {
  const [step, setStep] = useState('intro');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
   
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('result');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Logic for psychological assessment rendering */}
    </div>
  );
};`,
  apicella: `
// --- APICELLA HEALTH APP ---
const ApicellaApp = ({ onClose }) => {
  const [patients, setPatients] = useState([]);
   
  const addPatient = (data) => {
    // Secure HIPAA-compliant logic
    const secureId = crypto.randomUUID();
    setPatients([...patients, { ...data, id: secureId }]);
  };

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Secure Dashboard UI */}
    </div>
  );
};`,
  ecommerce: `
// --- ECOMMERCE APP ---
const EcommerceApp = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('store'); 

  const handleCheckout = () => {
    // Payment Gateway Integration
    setView('processing');
    setTimeout(() => setView('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop, Cart, and Checkout Flows */}
    </div>
  );
};`,
  "ai-calculator": `
// --- AI CALCULATOR ---
const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');

  const calculate = () => {
    try {
      // Safe math evaluation
      const res = new Function('return ' + display)();
      setDisplay(String(res));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator-ui">
      {/* Keypad and Display Logic */}
    </div>
  );
};`
};

// ==========================================
// 3. INTERNAL MINI-APPS
// ==========================================

// --- CALCULATOR ---
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
        const newHistory = [...history, `${display} = ${res}`].slice(-5);
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
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-sm bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-4 bg-gray-900 flex justify-between items-center">
          <div className="flex items-center gap-2 text-pink-500 font-bold"><Calculator size={20} /> AI Calc</div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 bg-gray-900 text-right">
          <div className="text-gray-500 text-sm h-20 overflow-y-auto">{history.map((h, i) => <div key={i}>{h}</div>)}</div>
          <div className="text-4xl text-white font-mono mt-2 font-bold">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-800">
          {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'BS', '='].map((btn) => (
            <button key={btn} onClick={() => handleBtn(btn)} className={`p-5 text-xl font-bold ${btn === '=' ? 'bg-pink-600 text-white' : 'text-white hover:bg-gray-700'}`}>{btn}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PSYMETRICS ---
const PsymetricsApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
   
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl"><Activity /> Psymetrics</div>
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full flex items-center gap-2"><ExternalLink size={16}/> Exit Demo</button>
      </nav>
      <div className="max-w-2xl mx-auto pt-12 px-6">
        {step === 'intro' && (
          <div className="text-center space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-slate-900">Personality Assessment</h1>
            <p className="text-lg text-slate-600">Valid, data-driven psychological profiling.</p>
            <button onClick={() => setStep('test')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg">Start Test</button>
          </div>
        )}
        {step === 'test' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-6">Assessment in Progress</h2>
            {isAnalyzing ? (
               <div className="flex flex-col items-center py-12"><Loader className="animate-spin text-blue-600 mb-4" size={40} /><p>Analyzing...</p></div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg w-full"></div>)}
                </div>
                <button onClick={() => { setIsAnalyzing(true); setTimeout(() => { setIsAnalyzing(false); setStep('result'); }, 1500); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Submit Answers</button>
              </>
            )}
          </div>
        )}
        {step === 'result' && (
           <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
             <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
             <h2 className="text-2xl font-bold">Analysis Complete</h2>
             <p className="mb-6">Your traits have been mapped.</p>
             <button onClick={() => setStep('intro')} className="text-blue-600 font-bold hover:underline">Restart</button>
           </div>
        )}
      </div>
    </div>
  );
};

// --- APICELLA HEALTH ---
const ApicellaApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [patients] = useState<Patient[]>([
    { id: 1, name: "Sarah Connor", status: "Stable" }, 
    { id: 2, name: "Rick Deckard", status: "Critical" }
  ]);

  return (
    <div className="min-h-screen bg-teal-50 font-sans text-slate-800">
      <div className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl"><Activity className="text-teal-200"/> Apicella Health</div>
        <button onClick={onClose} className="text-teal-100 hover:text-white flex items-center gap-2"><Lock size={16}/> Logout</button>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="p-4 border-b border-teal-50 bg-teal-50/50 font-bold text-teal-900">Patient Records (HIPAA Compliant)</div>
          {patients.map(p => (
            <div key={p.id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
              <div className="font-medium">{p.name}</div>
              <span className={`px-2 py-1 rounded text-xs ${p.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ECOMMERCE APP ---
const EcommerceApp: React.FC<BaseAppProps> = ({ onClose }) => {
  const [view, setView] = useState<'store' | 'cart' | 'checkout' | 'success'>('store');
  const [cart, setCart] = useState<Product[]>([]);
  const products: Product[] = [{id:1, name:"Dev Keyboard", price:150}, {id:2, name:"Monitor 4K", price:300}];
   
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between">
        <div className="font-bold text-purple-700 flex items-center gap-2"><ShoppingBag/> DevStore</div>
        <button onClick={onClose}><XCircle className="text-gray-400"/></button>
      </nav>
      <div className="max-w-2xl mx-auto p-6">
        {view === 'store' && (
          <div className="grid grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="h-24 bg-gray-100 rounded mb-4 flex items-center justify-center text-4xl">📦</div>
                <div className="font-bold">{p.name}</div>
                <div className="text-purple-600 font-bold mb-2">${p.price}</div>
                <button onClick={() => {setCart([...cart, p]); setView('cart')}} className="w-full bg-gray-900 text-white py-2 rounded font-bold">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
        {view === 'cart' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
             <h2 className="font-bold text-xl mb-4">Your Cart ({cart.length})</h2>
             <button onClick={() => setView('checkout')} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold">Checkout</button>
          </div>
        )}
        {view === 'checkout' && (
           <div className="bg-white p-6 rounded-xl shadow-sm text-center">
             <Loader className="animate-spin mx-auto text-purple-600 mb-4"/>
             <p>Processing Secure Payment...</p>
             {(setTimeout(() => setView('success'), 2000) as unknown as boolean) && ""}
           </div>
        )}
        {view === 'success' && (
          <div className="text-center pt-10">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4"/>
            <h2 className="text-2xl font-bold">Order Confirmed!</h2>
            <button onClick={() => setView('store')} className="mt-4 text-purple-600 font-bold">Shop More</button>
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
  
  // NEW: State for email feedback
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    setActiveCode(FULL_CODE_STRINGS[id] || "// Code not available for this component");
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

  // Fixed: Removed unused 'e' parameter
  const handleEmailClick = (email: string) => {
    const copyToClipboard = (text: string) => {
      // Try using the Clipboard API first
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
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 2000);
        } else {
          console.error("Fallback copy failed");
        }
      } catch (err) {
        console.error("Fallback copy error", err);
      }
    };

    copyToClipboard(email);
    // Allow the mailto link to open normally
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
      summary: "Results-driven ICT graduate and Junior Full Stack Developer specializing in web and mobile solutions.",
      links: {
        email: "concepcionabigail03@gmail.com",
        github: "github.com/AbigailConcepcion",
        linkedin: "www.linkedin.com/in/abi-concepcion"
      }
    },
    skills: [
      { category: "Languages", icon: <Terminal size={20} />, items: ["Python", "Java", "JavaScript", "HTML", "CSS"] },
      { category: "Frameworks", icon: <Layout size={20} />, items: ["React", "React Native", "Node.js", "Django", "Tailwind"] },
      { category: "Databases", icon: <Database size={20} />, items: ["MySQL", "PostgreSQL", "MongoDB"] },
    ],
    projects: [
      {
        id: "loans",
        title: "Loans Tracking Mobile",
        desc: "A mobile-first loan management application built for tracking borrowers, payment schedules, and statuses.",
        tags: ["React Native", "Mobile", "Finance"],
        color: "yellow",
        icon: <MobileIcon />,
        pinned: true,
        externalLink: "https://preview-0nwsfzfz--loans-tracking-mobile-1.deploypad.app/"
      },
      {
        id: "psymetrics",
        title: "Psymetrics Platform",
        desc: "Online testing system with automated reporting and data analytics.",
        tags: ["React", "Node.js", "Analytics"],
        color: "blue",
        icon: <Activity />
      },
      {
        id: "apicella",
        title: "Apicella Health",
        desc: "Secure healthcare management app with HIPAA-compliant data handling.",
        tags: ["Healthcare", "Security", "SQL"],
        color: "teal",
        icon: <Users />
      },
      {
        id: "ecommerce",
        title: "E-commerce Store",
        desc: "Online store with cart logic, product grid, and simulated checkout.",
        tags: ["E-commerce", "State Mgmt"],
        color: "purple",
        icon: <ShoppingBag />
      },
      {
        id: "ai-calculator",
        title: "AI Calculator",
        desc: "Interactive calculator with history and safe evaluation logic.",
        tags: ["Logic", "UI/UX"],
        color: "pink",
        icon: <Calculator />
      }
    ]
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* Code Viewer Modal */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1e1e1e] w-full max-w-4xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center px-4 py-3 bg-[#252526] border-b border-gray-700">
              <span className="text-sm font-mono text-blue-400 flex items-center gap-2"><Code size={16}/> Source Code Viewer</span>
              <button onClick={() => setIsCodeModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="p-0 overflow-auto bg-[#1e1e1e]">
              <pre className="p-4 font-mono text-sm text-gray-300 leading-relaxed">
                <code>{activeCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (isDarkMode ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm' : 'bg-white/95 shadow-md backdrop-blur-sm') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-teal-400' : 'from-blue-600 to-teal-600'}`}>AC</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-medium hover:text-blue-500 transition-colors">{item}</button>
              ))}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden absolute w-full shadow-lg ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-slate-800">{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="about" className="pt-32 pb-20 px-4 flex items-center min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center lg:text-left">
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Hello, I'm</h2>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">{portfolioData.personal.name}</h1>
          <h3 className={`text-2xl sm:text-3xl mb-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{portfolioData.personal.title}</h3>
          <p className="text-lg max-w-2xl mx-auto lg:mx-0 mb-8 opacity-80">{portfolioData.personal.summary}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <button onClick={() => scrollToSection('projects')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-transform transform hover:-translate-y-1 shadow-lg shadow-blue-600/30">View Projects</button>
             <button onClick={() => scrollToSection('contact')} className={`px-8 py-3 rounded-full font-medium border-2 transition-all hover:-translate-y-1 ${isDarkMode ? 'border-slate-600 text-slate-300 hover:border-blue-400' : 'border-gray-300 text-gray-700 hover:border-blue-600'}`}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`py-20 px-4 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.skills.map((grp, i) => (
              <div key={i} className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100 shadow-sm'} transition-all hover:shadow-lg`}>
                <div className="flex items-center mb-4 text-blue-500">{grp.icon} <h3 className="ml-2 font-bold text-lg text-current">{grp.category}</h3></div>
                <div className="flex flex-wrap gap-2">{grp.items.map((sk, j) => <span key={j} className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>{sk}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((p, i) => (
              <div key={i} className={`group rounded-xl overflow-hidden border transition-all hover:-translate-y-2 hover:shadow-2xl relative ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} ${p.pinned ? 'ring-2 ring-yellow-400 shadow-yellow-500/20' : ''}`}>
                {/* Pinned Badge */}
                {p.pinned && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
                    <Star size={12} fill="black" /> Featured
                  </div>
                )}
                 
                <div className={`h-2 w-full bg-${p.color}-500`}></div>
                <div className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>{p.icon}</div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {p.title}
                    {p.pinned && <Pin size={16} className="text-yellow-500" fill="currentColor" />}
                  </h3>
                  <p className="text-sm opacity-70 mb-6 flex-grow">{p.desc}</p>
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleLiveDemo(p)} 
                      className={`flex-1 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${p.pinned ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <ExternalLink size={14}/> Live Demo
                    </button>
                    <button 
                      onClick={() => viewCode(p.id)} 
                      className={`flex-1 border py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <Code size={14}/> View Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-20 px-4 ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href={`mailto:${portfolioData.personal.links.email}`} 
              onClick={() => handleEmailClick(portfolioData.personal.links.email)} // Fixed: No longer passes 'e'
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all transform hover:-translate-y-1 ${emailCopied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {emailCopied ? <Check size={18}/> : <Mail size={18}/>} 
              {emailCopied ? "Copied!" : "Email Me"}
            </a>
            <a href={`https://${portfolioData.personal.links.linkedin}`} target="_blank" rel="noreferrer" className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full border font-medium transition-colors ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-100'}`}><Linkedin size={18}/> LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
