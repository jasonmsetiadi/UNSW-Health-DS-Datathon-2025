import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Users, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Info, 
  Home, 
  Stethoscope, 
  ClipboardCheck,
  BarChart2,
  Ambulance,
  BedDouble,
  Accessibility,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Pill,
  Calendar,
  AlertTriangle,
  Check,
  Coffee,
  Building
} from 'lucide-react';

// --- Components ---

// 1. Navigation Bar
const Navbar = ({ goHome, currentView }) => (
  <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={goHome}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg mr-3">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="block text-xl font-bold text-slate-800 tracking-tight">ANZHFR</span>
            <span className="block text-xs text-blue-600 font-medium uppercase tracking-wider">Consumer Dashboard</span>
          </div>
        </div>
        <div className="flex space-x-4">
          {currentView !== 'home' && (
            <button 
              onClick={goHome}
              className="text-slate-500 hover:text-blue-600 font-medium text-sm flex items-center transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </button>
          )}
          <button className="text-slate-500 hover:text-blue-600 font-medium text-sm">Contact</button>
        </div>
      </div>
    </div>
  </nav>
);

// 2. Statistics Card (Home)
const StatCard = ({ icon: Icon, value, label, subtext, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600"
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">2024 DATA</span>
      </div>
      <h3 className="text-3xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-sm font-semibold text-slate-600 mb-2">{label}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{subtext}</p>
    </div>
  );
};

// 3. Simple Bar Chart Component
const SimpleChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-slate-800">Discharge Destinations</h3>
      <BarChart2 className="w-5 h-5 text-slate-400" />
    </div>
    <div className="space-y-4">
      {[
        { label: 'Home / Independent', pct: 45, color: 'bg-emerald-500' },
        { label: 'Rehabilitation Unit', pct: 32, color: 'bg-blue-500' },
        { label: 'Residential Aged Care', pct: 18, color: 'bg-indigo-500' },
        { label: 'Acute Hospital Transfer', pct: 5, color: 'bg-slate-400' }
      ].map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-600">{item.label}</span>
            <span className="font-bold text-slate-800">{item.pct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${item.color} transition-all duration-1000`} 
              style={{ width: `${item.pct}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-50 italic">
      *Based on aggregate registry data from the last 12 months.
    </p>
  </div>
);

// 4. Feature/Navigation Cards
const NavCard = ({ title, desc, imageSrc, onClick, btnText = "Learn More" }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
    <div className="h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors z-10"></div>
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">{desc}</p>
      <button 
        onClick={onClick}
        className="w-full py-2.5 px-4 bg-slate-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
      >
        {btnText} <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
);

// 5. Recovery Calculator View
const CalculatorView = ({ goBack }) => {
  const [formData, setFormData] = useState({ age: '', gender: 'female', mobility: 'independent' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    setLoading(true);
    // Fake calculation delay
    setTimeout(() => {
      // Fake logic for demo purposes
      const baseStay = formData.age > 80 ? 12 : 7;
      const rehabProb = formData.mobility === 'limited' ? 85 : 45;
      const walkWeeks = formData.age > 80 ? '12-16' : '6-10';
      
      setResult({
        hospitalStay: `${baseStay} - ${baseStay + 5} days`,
        rehabProbability: `${rehabProb}%`,
        walkingTime: `${walkWeeks} weeks`,
        homeSupport: formData.age > 85 ? "High Likelihood" : "Moderate Likelihood"
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Recovery Estimator</h2>
          <p className="text-slate-600 mb-6">
            Enter patient details to see average statistics derived from the registry. 
            <span className="block mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
              <Info className="w-3 h-3 inline mr-1" />
              Note: These are estimates based on population averages, not specific medical advice.
            </span>
          </p>
          
          <form onSubmit={handleCalculate} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input 
                type="number" 
                required
                min="50" max="110"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. 82"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {['Female', 'Male'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({...formData, gender: g.toLowerCase()})}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                      formData.gender === g.toLowerCase() 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pre-injury Mobility</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.mobility}
                onChange={(e) => setFormData({...formData, mobility: e.target.value})}
              >
                <option value="independent">Independent (No Aids)</option>
                <option value="stick">Walking Stick</option>
                <option value="frame">Frame / Walker</option>
                <option value="limited">Limited / Assistance Required</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md shadow-blue-200 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Estimate Recovery'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="flex flex-col">
          {result ? (
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h3 className="text-lg font-bold flex items-center">
                  <ClipboardCheck className="w-5 h-5 mr-2" />
                  Estimated Outlook
                </h3>
                <p className="text-blue-100 text-sm mt-1">Based on patients with similar profiles.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-slate-500 font-medium">Avg. Hospital Stay</span>
                  <span className="text-xl font-bold text-slate-800">{result.hospitalStay}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-slate-500 font-medium">Rehab Requirement</span>
                  <span className="text-xl font-bold text-blue-600">{result.rehabProbability}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-slate-500 font-medium">Unassisted Walking</span>
                  <span className="text-xl font-bold text-slate-800">{result.walkingTime}</span>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <h4 className="text-sm font-bold text-amber-800 mb-1">Assisted Living Requirements</h4>
                  <p className="text-sm text-amber-700">{result.homeSupport} for home modifications or support services post-discharge.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
              <BarChart2 className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-slate-900 font-medium mb-2">No Data Generated Yet</h3>
              <p className="text-slate-500 text-sm">Fill out the form to view recovery statistics specific to the patient's demographic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. Carer Advice View (Expanded)
const AdviceView = ({ goBack }) => {
  return (
  <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
     <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="h-64 bg-slate-200 relative">
          <img 
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200" 
            alt="Carer holding hands" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-white mb-2">Guidance for Carers & Family</h1>
              <p className="text-white/90 font-medium">Supporting your loved one through recovery, from hospital to home.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-10">
              
              {/* 1. Immediate Post-Op */}
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                    <Heart className="w-5 h-5" />
                  </div>
                  Immediate Post-Op Support
                </h3>
                <div className="prose prose-slate text-sm text-slate-600">
                  <p className="mb-4">
                    The first 48 hours are critical. Your loved one may be confused due to medication or the trauma of the surgery. 
                    Your role is to be a comforting presence and an advocate.
                  </p>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">Understanding Delirium</h4>
                    <p className="text-xs">
                      Sudden confusion (delirium) is very common after hip surgery in older adults. It can be scary, but it is usually temporary. 
                      <strong> How you can help:</strong> Gently remind them where they are ("You're in the hospital, Mom") and what time of day it is. Bring familiar items like photos or their own glasses/hearing aids.
                    </p>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Encourage Movement:</strong> Even shifting in bed helps prevent pressure sores. Support them if the physio asks them to stand.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Pain Management:</strong> Pain slows recovery. Encourage them to tell nurses if they are hurting, especially before movement exercises.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Hydration:</strong> Offer small sips of water often if allowed. Dehydration worsens confusion.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 2. Preparing Home */}
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 text-emerald-600">
                    <Home className="w-5 h-5" />
                  </div>
                  Preparing the Home
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Before discharge, a "safety sweep" of the home is essential. A fall in the first few weeks can be devastating.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" /> Hazard Removal
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-2">
                      <li>• Remove <strong>all</strong> loose rugs and mats.</li>
                      <li>• Tape down electrical cords.</li>
                      <li>• Clear clutter from hallways.</li>
                      <li>• Ensure good lighting (night lights).</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                      <Accessibility className="w-4 h-4 text-emerald-500 mr-2" /> Essential Equipment
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-2">
                      <li>• Shower chair (standing is tiring).</li>
                      <li>• Raised toilet seat.</li>
                      <li>• Reacher/grabber tool.</li>
                      <li>• Long-handled shoe horn.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Assisted Living (New) */}
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3">
                  <div className="bg-amber-100 p-2 rounded-full mr-3 text-amber-600">
                    <Building className="w-5 h-5" />
                  </div>
                  Is Assisted Living Required?
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Returning home isn't always safe. If you are unsure, speak to the hospital Social Worker or Discharge Planner about an Aged Care Assessment. Consider these factors:
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Mobility Safety", desc: "Can they walk to the toilet at night unaided? If not, do they have 24/7 help at home?" },
                    { title: "Cognitive State", desc: "Are they forgetting medication or leaving appliances on? Confusion often increases care needs." },
                    { title: "Caregiver Capacity", desc: "Be realistic. Can family members physically lift or support the patient if they stumble?" }
                  ].map((item, i) => (
                    <div key={i} className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold border border-amber-200">
                          {i + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Carer Wellbeing (New) */}
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3">
                  <div className="bg-rose-100 p-2 rounded-full mr-3 text-rose-600">
                    <Coffee className="w-5 h-5" />
                  </div>
                  Caring for Yourself
                </h3>
                <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                  <p className="text-slate-700 text-sm italic mb-3">
                    "You cannot pour from an empty cup."
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Caregiver burnout is real. It is okay to feel overwhelmed. Accept offers of help from friends for small tasks like cooking or laundry so you can focus on your loved one. 
                    If you are struggling, ask the hospital social worker about <strong>Respite Care</strong> options to give you a break.
                  </p>
                </div>
              </section>

            </div>

            {/* Resources Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-slate-50 p-6 rounded-xl h-fit border border-slate-100 sticky top-24">
                <h4 className="font-bold text-slate-800 mb-4">Essential Resources</h4>
                <div className="space-y-4">
                  {[
                    { title: "Understanding Delirium", type: "PDF Guide" },
                    { title: "Nutrition for Bone Health", type: "Article" },
                    { title: "Fall Prevention Checklist", type: "Interactive Tool" },
                    { title: "Local Support Groups", type: "Directory" }
                  ].map((res, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors group">
                      <div>
                        <span className="block text-sm font-semibold text-slate-700 group-hover:text-blue-700">{res.title}</span>
                        <span className="text-xs text-slate-400">{res.type}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-blue-600 text-white p-4 rounded-lg text-center shadow-lg shadow-blue-200">
                  <p className="font-bold mb-1">Need to talk to someone?</p>
                  <p className="text-sm opacity-90 mb-3">Our helpline is available 9am - 5pm.</p>
                  <button className="bg-white text-blue-600 py-2 px-4 rounded font-bold text-sm w-full hover:bg-blue-50 transition-colors">
                    1800 123 456
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

// 7. Care Journey View (New & Improved)
const JourneyView = ({ goBack }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Arrival & Comfort",
      time: "First 6-12 Hours",
      icon: Ambulance,
      color: "bg-rose-500",
      description: "When your loved one arrives at the Emergency Department, the focus is on understanding what happened and making them comfortable.",
      keyActions: [
        { 
          title: "Pain Management (Nerve Blocks)", 
          desc: "Doctors may inject local anesthetic near the groin. This numbs the leg without strong sedatives, helping with confusion.", 
          icon: Pill 
        },
        { 
          title: "Assessment & X-Rays", 
          desc: "Confirming the fracture type and checking overall health (heart, lungs) to ensure they are safe for surgery.", 
          icon: ClipboardCheck 
        }
      ],
      questions: ["Has a nerve block been given for pain?", "When is surgery likely to happen?"]
    },
    {
      id: 2,
      title: "The Operation",
      time: "Within 48 Hours",
      icon: Stethoscope,
      color: "bg-blue-500",
      description: "Surgery fixes the bone so the patient can move again. Delays can increase complications, so it usually happens quickly.",
      keyActions: [
        { 
          title: "Anesthesia Types", 
          desc: "Often a 'spinal' anesthetic is used (numbing from waist down) so the patient stays awake but feels no pain. It's safer for older adults.", 
          icon: Activity 
        },
        { 
          title: "The Procedure", 
          desc: "Surgeons use metal pins, screws, or replace the hip joint entirely depending on the break.", 
          icon: SettingsIcon 
        }
      ],
      questions: ["Will they have a spinal or general anesthetic?", "How long will the surgery take?"]
    },
    {
      id: 3,
      title: "First Few Days",
      time: "Day 1 - Day 5",
      icon: Accessibility,
      color: "bg-emerald-500",
      description: "The most critical phase. The goal is to get out of bed immediately to prevent pneumonia, clots, and muscle loss.",
      keyActions: [
        { 
          title: "Getting Up (Mobilization)", 
          desc: "Physios will help them stand, often the day after surgery. It might hurt, but it is vital for recovery.", 
          icon: ArrowRight 
        },
        { 
          title: "Confusion (Delirium)", 
          desc: "Many patients get confused after surgery. Having family present and familiar objects (photos, glasses) helps immensely.", 
          icon: HelpCircle 
        }
      ],
      questions: ["Can I help with meal times?", "Is it safe for them to wear their own shoes/slippers?"]
    },
    {
      id: 4,
      title: "Leaving Hospital",
      time: "Day 5 - Day 14",
      icon: Home,
      color: "bg-indigo-500",
      description: "Discharge happens when they are medically stable. They might not be fully walking yet.",
      keyActions: [
        { 
          title: "Rehabilitation", 
          desc: "Many patients move to a rehab ward to focus solely on walking and strength exercises.", 
          icon: Activity 
        },
        { 
          title: "Returning Home", 
          desc: "If going home, an Occupational Therapist (OT) will check if you need rails, ramps, or shower chairs.", 
          icon: Home 
        }
      ],
      questions: ["What equipment do we need at home?", "Who do we call if there is a problem after discharge?"]
    },
    {
      id: 5,
      title: "Life After Recovery",
      time: "3 - 12 Months",
      icon: Calendar,
      color: "bg-amber-500",
      description: "Full recovery takes time. The focus shifts to preventing another fall and regaining independence.",
      keyActions: [
        { 
          title: "Walking Independently", 
          desc: "It can take 3-4 months to walk without a frame. Some may always need a stick for confidence.", 
          icon: Accessibility 
        },
        { 
          title: "Bone Health", 
          desc: "Treating Osteoporosis (weak bones) is key. Medication can strengthen bones to stop this happening again.", 
          icon: Pill 
        }
      ],
      questions: ["Should they be taking Vitamin D or calcium?", "When is the next bone density scan due?"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Understanding the Care Journey</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A step-by-step guide for families. Click on each stage to understand what is happening and what you can do to help.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Timeline Navigation */}
        <div className="lg:col-span-4 space-y-4">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center group ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 shadow-lg ring-2 ring-blue-200' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-lg mr-4 transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:text-blue-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-0.5 block ${
                    isActive ? 'text-blue-200' : 'text-slate-400'
                  }`}>Step {step.id}</span>
                  <h3 className={`font-bold text-lg ${
                    isActive ? 'text-white' : 'text-slate-700'
                  }`}>{step.title}</h3>
                </div>
                {isActive && <ChevronRight className="w-5 h-5 text-white ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Content Card */}
        <div className="lg:col-span-8">
          {steps.map((step) => {
            if (activeStep !== step.id) return null;
            return (
              <div key={step.id} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Header Banner */}
                <div className={`h-32 ${step.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                    <div className="flex items-center space-x-2 mb-2 opacity-90">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase tracking-wide">Typical Timeframe: {step.time}</span>
                    </div>
                    <h2 className="text-3xl font-bold">{step.title}</h2>
                  </div>
                  {/* Decorative Icon */}
                  <step.icon className="absolute -right-6 -bottom-6 w-48 h-48 text-white opacity-20 rotate-12" />
                </div>

                <div className="p-8">
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Key Actions Grid */}
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">What is happening?</h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {step.keyActions.map((action, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="flex items-start mb-3">
                          <div className={`p-2 rounded-lg bg-white shadow-sm text-blue-600 mr-3`}>
                            <action.icon className="w-5 h-5" />
                          </div>
                          <h5 className="font-bold text-slate-800 mt-1">{action.title}</h5>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {action.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Questions Section */}
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <HelpCircle className="w-5 h-5 text-amber-600 mr-2" />
                      <h4 className="font-bold text-amber-900">Questions to ask the doctor</h4>
                    </div>
                    <ul className="space-y-3">
                      {step.questions.map((q, i) => (
                        <li key={i} className="flex items-start text-amber-800 text-sm">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                          "{q}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Helper for Icon used in data ---
const SettingsIcon = ({className}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


// --- Main App Component ---

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
      <Navbar goHome={() => setCurrentView('home')} currentView={currentView} />

      {currentView === 'home' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-500">
          
          {/* Hero / Header Text */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Hip Fracture Care & Recovery
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Empowering patients and families with transparent data, recovery estimates, and supportive resources from the Australian & New Zealand Hip Fracture Registry.
            </p>
          </div>

          {/* Stats Grid */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center">
              <Activity className="w-4 h-4 mr-2" /> Key Registry Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                value="82 Years" 
                label="Median Patient Age" 
                subtext="Based on 15,000+ records in 2024."
                color="blue"
              />
              <StatCard 
                icon={Clock} 
                value="9 Days" 
                label="Avg. Acute Stay" 
                subtext="Time spent in acute hospital care."
                color="indigo"
              />
              <StatCard 
                icon={Heart} 
                value="92%" 
                label="30-Day Survival" 
                subtext="Patients surviving 30 days post-surgery."
                color="emerald"
              />
              <StatCard 
                icon={Stethoscope} 
                value="48 Hrs" 
                label="Target Surgery Time" 
                subtext="Recommended time from admission."
                color="rose"
              />
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-blue-600 rounded-xl p-8 text-white h-full flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Why data matters?</h3>
                  <p className="text-blue-100 text-lg mb-6 max-w-md leading-relaxed">
                    By analyzing thousands of patient journeys, we help you understand what to expect. 
                    Better information leads to better preparation and outcomes.
                  </p>
                  <button 
                    onClick={() => setCurrentView('calculator')}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Try the Recovery Estimator
                  </button>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-blue-500 rounded-full opacity-50"></div>
                <div className="absolute right-20 top-10 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
              </div>
            </div>
            <div className="md:col-span-1">
              <SimpleChart />
            </div>
          </section>

          {/* Navigation Cards */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Resources & Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <NavCard 
                title="Carer & Family Support"
                desc="Practical advice for family members, including home preparation, mental health support, and navigating the aged care system."
                imageSrc="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600"
                onClick={() => setCurrentView('advice')}
                btnText="Read Advice"
              />
              <NavCard 
                title="Recovery Estimator"
                desc="Input simple demographic details to view average recovery timelines, hospital stay durations, and rehabilitation probabilities."
                imageSrc="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
                onClick={() => setCurrentView('calculator')}
                btnText="Start Estimator"
              />
              <NavCard 
                title="The Care Journey"
                desc="Understand the typical steps from the Emergency Department to Surgery, Rehabilitation, and finally returning home."
                imageSrc="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
                onClick={() => setCurrentView('journey')}
                btnText="View Timeline"
              />
            </div>
          </section>

        </main>
      )}

      {currentView === 'calculator' && <CalculatorView goBack={() => setCurrentView('home')} />}
      {currentView === 'advice' && <AdviceView goBack={() => setCurrentView('home')} />}
      {currentView === 'journey' && <JourneyView goBack={() => setCurrentView('home')} />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm mb-4">
            © 2025 ANZ Hip Fracture Registry. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-slate-400">
            <button className="hover:text-slate-600">Privacy Policy</button>
            <button className="hover:text-slate-600">Terms of Use</button>
            <button className="hover:text-slate-600">Clinical Guidelines</button>
          </div>
          <p className="text-xs text-slate-300 mt-6 max-w-2xl mx-auto">
            Disclaimer: The information provided on this dashboard is for educational purposes only and uses placeholder data. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;