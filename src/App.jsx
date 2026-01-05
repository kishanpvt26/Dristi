import React, { useState, useEffect } from 'react';
import { Upload, Eye, Activity, CheckCircle, AlertCircle, Loader2, Camera, ShieldCheck, MapPin, Phone, FileText, Globe, RefreshCw, ChevronRight, Navigation, LogOut } from 'lucide-react';
import { LocationService } from './services/locationService';
import { AIService } from './services/aiService';
import { HistoryService } from './services/historyService';
import { HospitalMap } from './components/HospitalMap';
import { CameraCapture } from './components/CameraCapture';
import { DristiLogo } from './components/DristiLogo';
import { ScanHistory } from './components/ScanHistory';
import { ChatBot } from './components/ChatBot';

const translations = {
  en: {
    title: "Drishti AI",
    subtitle: "Early Diabetic Retinopathy Screening",
    heroTitle: "Protect Your Vision with",
    heroHighlight: "AI-Powered Screening",
    heroDesc: "Drishti AI uses advanced computer vision to detect early signs of Diabetic Retinopathy. Upload an eye scan and get instant analysis results.",
    uploadTitle: "Upload Eye Image",
    uploadDesc: "Drag and drop or click to browse",
    analyzeBtn: "Analyze for Retinopathy",
    analyzing: "Scanning Retinal Layers...",
    resultTitle: "Clinical Analysis Report",
    confidence: "AI Confidence Score",
    healthy: "No Signs Detected",
    unhealthy: "Retinopathy Detected",
    findDoctor: "Find Nearby Specialist",
    download: "Download Report",
    connect: "Connect with Specialist",
    disclaimer: "This tool is for screening purposes only and does not replace a professional medical diagnosis.",
    features: ["Microaneurysms", "Hemorrhages", "Exudates", "Macular Edema"]
  },
  hi: {
    title: "दृष्टि AI",
    subtitle: "प्रारंभिक डायबिटिक रेटिनोपैथी स्क्रीनिंग",
    heroTitle: "अपनी दृष्टि की रक्षा करें",
    heroHighlight: "AI-आधारित स्क्रीनिंग के साथ",
    heroDesc: "दृष्टि AI डायबिटिक रेटिनोपैथी के शुरुआती संकेतों का पता लगाने के लिए उन्नत कंप्यूटर विजन का उपयोग करता है।",
    uploadTitle: "आंख की छवि अपलोड करें",
    uploadDesc: "खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
    analyzeBtn: "रेटिनोपैथी के लिए विश्लेषण करें",
    analyzing: "रेटिना की जांच हो रही है...",
    resultTitle: "नैदानिक विश्लेषण रिपोर्ट",
    confidence: "AI विश्वास स्कोर",
    healthy: "कोई संकेत नहीं मिला",
    unhealthy: "रेटिनोपैथी के संकेत मिले",
    findDoctor: "निकटतम विशेषज्ञ खोजें",
    download: "रिपोर्ट डाउनलोड करें",
    connect: "विशेषज्ञ से संपर्क करें",
    disclaimer: "यह उपकरण केवल स्क्रीनिंग के उद्देश्यों के लिए है और पेशेवर चिकित्सा निदान की जगह नहीं लेता है।",
    features: ["माइक्रोएनीयरिज्म", "रक्तस्राव", "एक्सुडेट्स", "मैकुलर एडिमा"]
  },
  bn: {
    title: "দৃষ্টি AI",
    subtitle: "প্রাথমিক ডায়াবেটিক রেটিনোপ্যাথি স্ক্রিনিং",
    heroTitle: "আপনার দৃষ্টি রক্ষা করুন",
    heroHighlight: "AI-চালিত স্ক্রিনিং দিয়ে",
    heroDesc: "দৃষ্টি AI ডায়াবেটিক রেটিনোপ্যাথির প্রাথমিক লক্ষণ শনাক্ত করতে উন্নত কম্পিউটার ভিশন ব্যবহার করে।",
    uploadTitle: "চোখের ছবি আপলোড করুন",
    uploadDesc: "ড্র্যাগ ও ড্রপ করুন বা ক্লিক করে ব্রাউজ করুন",
    analyzeBtn: "রেটিনোপ্যাথি বিশ্লেষণ করুন",
    analyzing: "রেটিনা স্ক্যান করা হচ্ছে...",
    resultTitle: "ক্লিনিকাল বিশ্লেষণ রিপোর্ট",
    confidence: "AI আত্মবিশ্বাস স্কোর",
    healthy: "কোনও লক্ষণ নেই",
    unhealthy: "রেটিনোপ্যাথি শনাক্ত",
    findDoctor: "নিকটস্থ বিশেষজ্ঞ খুঁজুন",
    download: "রিপোর্ট ডাউনলোড করুন",
    connect: "বিশেষজ্ঞের সাথে যোগাযোগ করুন",
    disclaimer: "এই টুলটি শুধুমাত্র স্ক্রিনিংয়ের জন্য এবং পেশাদার চিকিৎসা নির্ণয়ের বিকল্প নয়।",
    features: ["মাইক্রোঅ্যানিউরিজম", "রক্তক্ষরণ", "এক্সুডেট", "ম্যাকুলার এডিমা"]
  }
};

function Navbar({ lang, setLang, onViewChange, currentView }) {
  const t = translations[lang];
  const cycleLanguage = () => {
    const order = ['en', 'hi', 'bn'];
    const idx = order.indexOf(lang);
    const next = order[(idx + 1) % order.length];
    setLang(next);
  };
  
  const handleDoctorLogin = () => {
    if (currentView === 'doctor') {
      onViewChange('home');
      return;
    }
    // Simple mock auth
    const code = prompt("Enter Specialist Access Code (Try: admin)");
    if (code === 'admin') {
      onViewChange('doctor');
    } else if (code) {
      alert("Invalid Access Code");
    }
  };

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <DristiLogo className="h-10" />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={cycleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200"
            >
              <Globe className="h-4 w-4" />
              {lang === 'en' ? 'हिंदी' : lang === 'hi' ? 'বাংলা' : 'English'}
            </button>
            
            <button 
              onClick={handleDoctorLogin}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg ${
                currentView === 'doctor' 
                  ? 'bg-gray-800 text-white hover:bg-gray-900' 
                  : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-50'
              }`}
            >
              {currentView === 'doctor' ? (
                <>
                  <LogOut className="h-4 w-4" />
                  Exit Portal
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Specialist Login
                </>
              )}
            </button>

            {currentView !== 'doctor' && (
              <button className="hidden md:flex bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition-all shadow-md hover:shadow-lg">
                {t.connect}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({ lang }) {
  const t = translations[lang];
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 text-sm text-brand-700 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Live System: Online
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-7xl mb-6">
          <span className="block">{t.heroTitle}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-500 pb-2">
            {t.heroHighlight}
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
          {t.heroDesc}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Activity className="h-5 w-5 text-brand-500" />
            <span>98.5% Accuracy</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            <MapPin className="h-5 w-5 text-red-500" />
            <span>Rural Focus</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisResult({ result, onReset, lang }) {
  const t = translations[lang];
  const isHealthy = result.prediction === 'Healthy';
  const severity = isHealthy 
    ? 'Low'
    : (result.findings && result.findings.length >= 2 && result.confidence >= 92) 
      ? 'High' 
      : 'Moderate';
  const handleShareWhatsApp = () => {
    const text = `Drishti AI Report ${result.id}\nPrediction: ${result.prediction}\nConfidence: ${result.confidence}%\nFindings: ${result.findings && result.findings.length ? result.findings.join(', ') : 'None'}\nTime: ${new Date(result.timestamp).toLocaleString()}\n\nGet screened at Drishti AI.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass rounded-2xl p-8 max-w-4xl mx-auto mt-8 animate-fade-in border-t-4 border-t-brand-500 print:shadow-none print:border-none print:w-full print:max-w-none">
      <div className="hidden print:flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <DristiLogo className="h-8" />
          <span className="text-sm">Report ID: {result.id}</span>
        </div>
        <span className="text-sm">{new Date(result.timestamp).toLocaleString()}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Image & Status */}
        <div className="w-full md:w-1/3 print:w-1/3">
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-square mb-6 group print:shadow-none print:border print:border-gray-200">
            <img src={result.image} alt="Analyzed Eye" className="w-full h-full object-cover" />
            {/* Heatmap Overlay Toggle Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 print:hidden">
              <span className="text-white text-xs font-medium">AI Attention Map Overlay</span>
            </div>
            {!isHealthy && (
              <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm print:hidden">
                Attention Required
              </div>
            )}
          </div>
          
          <div className={`p-4 rounded-xl ${isHealthy ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'} text-center print:border-none print:bg-white`}>
            {isHealthy ? (
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2 print:text-black" />
            ) : (
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-2 print:text-black" />
            )}
            <h3 className={`text-lg font-bold ${isHealthy ? 'text-green-800' : 'text-red-800'} print:text-black`}>
              {isHealthy ? t.healthy : t.unhealthy}
            </h3>
            <div className="mt-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                severity === 'Low' ? 'bg-green-100 text-green-700' 
                : severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' 
                : 'bg-red-100 text-red-700'
              }`}>
                Severity: {severity}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Report */}
        <div className="w-full md:w-2/3 print:w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t.resultTitle}</h2>
              <p className="text-sm text-gray-500">ID: {result.id} • {new Date(result.timestamp).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={handlePrint}
              className="text-brand-600 hover:text-brand-800 p-2 bg-brand-50 rounded-full print:hidden"
              title={t.download}
            >
              <FileText className="h-5 w-5" />
            </button>
            <div className="flex gap-2 print:hidden">
              <button 
                onClick={handleDownloadJSON}
                className="text-brand-600 hover:text-brand-800 p-2 bg-brand-50 rounded-full"
                aria-label="Download JSON Report"
              >
                JSON
              </button>
              <button 
                onClick={handleShareWhatsApp}
                className="text-green-600 hover:text-green-800 p-2 bg-green-50 rounded-full"
                aria-label="Share via WhatsApp"
              >
                Share
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Confidence Meter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{t.confidence}</span>
                <span className="text-sm font-bold text-brand-600">{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden print:border print:border-gray-300">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isHealthy ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-500 to-red-600'} print:bg-black`} 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Detailed Findings */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 print:bg-white print:border print:border-gray-300">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider text-xs">Clinical Findings</h4>
              {result.findings && result.findings.length > 0 ? (
                <div className="space-y-2">
                  {result.findings.map((finding, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-red-700 font-medium print:text-black">
                      <AlertCircle className="h-4 w-4" />
                      <span>{finding} Detected</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium print:text-black">
                  <CheckCircle className="h-4 w-4" />
                  <span>No abnormalities detected</span>
                </div>
              )}
            </div>

            {/* Technical Analysis Details */}
            {result.details && (
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 print:bg-white print:border print:border-gray-300">
                <h4 className="text-sm font-semibold text-blue-900 mb-3 uppercase tracking-wider text-xs print:text-black">Technical Analysis Metrics</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm print:shadow-none print:border print:border-gray-200">
                    <div className="text-xs text-gray-500">Hemorrhage Score</div>
                    <div className="font-mono font-bold text-blue-700 print:text-black">{result.details.hemorrhageScore}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm print:shadow-none print:border print:border-gray-200">
                    <div className="text-xs text-gray-500">Exudate Score</div>
                    <div className="font-mono font-bold text-blue-700 print:text-black">{result.details.exudateScore}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm print:shadow-none print:border print:border-gray-200">
                    <div className="text-xs text-gray-500">Avg Brightness</div>
                    <div className="font-mono font-bold text-blue-700 print:text-black">{result.details.avgBrightness}</div>
                  </div>
                </div>
              </div>
            )}

            {!isHealthy && (
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 print:bg-white print:border print:border-gray-300">
                <h4 className="text-sm font-semibold text-orange-900 mb-3 uppercase tracking-wider text-xs print:text-black">Triage Recommendations</h4>
                <ul className="text-sm text-orange-800 space-y-2">
                  <li>Schedule a specialist consultation within 7 days.</li>
                  <li>Maintain blood sugar control and monitor symptoms.</li>
                  <li>Bring previous eye exam reports for comparison.</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 print:hidden">
              <button className="flex items-center justify-center gap-2 bg-brand-600 text-white py-2.5 px-4 rounded-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30" aria-label="Find nearby specialist">
                <MapPin className="h-4 w-4" />
                {t.findDoctor}
              </button>
              <button 
                onClick={onReset}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Analyze new image"
              >
                <RefreshCw className="h-4 w-4" />
                Analyze New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageUploader({ onAnalyze, isAnalyzing, lang }) {
  const t = translations[lang];
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const isLowQuality = preview ? preview.length < 50000 : false;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (imgSrc) => {
    setPreview(imgSrc);
    setShowCamera(false);
  };

  const handleAnalyze = () => {
    if (preview) {
      onAnalyze(preview);
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
      {showCamera && (
        <CameraCapture 
          onCapture={handleCameraCapture} 
          onCancel={() => setShowCamera(false)} 
        />
      )}

      {!preview ? (
        <div className="space-y-4">
          <div 
            className={`border-3 border-dashed rounded-xl p-10 text-center transition-all duration-300 relative ${dragActive ? 'border-brand-500 bg-brand-50 scale-[1.02]' : 'border-gray-300 hover:border-brand-400'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Upload eye image"
            />
            <div className="flex flex-col items-center pointer-events-none">
              <div className="bg-brand-50 p-6 rounded-full mb-6 ring-8 ring-brand-50/50">
                <Upload className="h-10 w-10 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.uploadTitle}</h3>
              <p className="text-gray-500">{t.uploadDesc}</p>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-3 text-sm text-gray-500">OR</span>
          </div>

          <button 
            onClick={() => setShowCamera(true)}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg"
            aria-label="Open camera to take photo"
          >
            <Camera className="h-5 w-5" />
            Take Photo with Camera
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center group shadow-inner">
            <img src={preview} alt="Eye preview" className="max-h-full object-contain" />
            {isLowQuality && (
              <div className="absolute top-2 left-2 bg-yellow-500/90 text-white text-xs px-2 py-1 rounded">
                Low quality image detected. Consider retaking for better results.
              </div>
            )}
            
            {/* Scanning Animation */}
            {isAnalyzing && (
              <>
                <div className="scan-line"></div>
                <div className="scan-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="text-white text-center">
                    <div className="inline-block animate-spin mb-4">
                      <Loader2 className="h-10 w-10 text-brand-400" />
                    </div>
                    <p className="text-lg font-mono tracking-widest animate-pulse">{t.analyzing}</p>
                  </div>
                </div>
              </>
            )}

            {!isAnalyzing && (
              <button 
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-all"
                aria-label="Remove selected image"
              >
                <span className="sr-only">Remove</span>
                ×
              </button>
            )}
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || isLowQuality}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            aria-label="Analyze image for retinopathy"
          >
            {isAnalyzing ? (
              <>
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="h-6 w-6" />
                {t.analyzeBtn}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function ClinicLocator({ lang }) {
  const t = translations[lang];
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationAndHospitals = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get User Location
      const position = await LocationService.getCurrentPosition();
      setUserLocation(position);

      // 2. Fetch Nearby Hospitals
      const data = await LocationService.getNearbyHospitals(position.lat, position.lng);
      setHospitals(data);
    } catch (err) {
      console.error(err);
      setError("Unable to access location. Please enable GPS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 max-w-5xl mx-auto px-4 mb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.findDoctor}</h2>
          <p className="text-gray-500 text-sm mt-1">Locate accredited eye specialists near you</p>
        </div>
        
        <button 
          onClick={fetchLocationAndHospitals}
          className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-lg font-medium hover:bg-brand-100 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
          {userLocation ? 'Update Location' : 'Locate Me'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Map View */}
      {userLocation && (
        <div className="mb-8">
          <HospitalMap userLocation={userLocation} hospitals={hospitals} />
        </div>
      )}

      {/* List View */}
      <div className="grid md:grid-cols-3 gap-6">
        {loading && !hospitals.length ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-40 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))
        ) : (
          hospitals.length > 0 ? hospitals.slice(0, 6).map((clinic, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-brand-50 p-3 rounded-lg group-hover:bg-brand-100 transition-colors">
                  <MapPin className="h-6 w-6 text-brand-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">OPEN</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1 truncate" title={clinic.name}>{clinic.name}</h3>
              <p className="text-gray-500 text-sm mb-4 capitalize">{clinic.distance} km away • {clinic.type}</p>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}${userLocation ? `&origin=${userLocation.lat},${userLocation.lng}` : ''}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full border border-brand-200 text-brand-700 font-medium py-2 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                  aria-label="Navigate to clinic"
                >
                  <Navigation className="h-4 w-4" />
                  Navigate
                </a>
                <button className="w-full border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Book
                </button>
              </div>
            </div>
          )) : !loading && (
             <div className="col-span-3 text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
               <MapPin className="h-10 w-10 mx-auto mb-2 text-gray-300" />
               <p>Click "Locate Me" to find nearby hospitals</p>
             </div>
          )
        )}
      </div>
    </div>
  );
}

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [lang, setLang] = useState('en');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(HistoryService.getHistory());
  }, []);

  const handleAnalysis = async (imageData) => {
    setAnalyzing(true);
    try {
      const analysisResult = await AIService.analyzeImage(imageData);
      setResult(analysisResult);
      
      // Save to history
      const newHistory = HistoryService.saveScan(analysisResult);
      setHistory(newHistory);

      // Scroll to result
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLoadScan = (scan) => {
    setResult(scan);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
          {!result ? (
            <ImageUploader onAnalyze={handleAnalysis} isAnalyzing={analyzing} lang={lang} />
          ) : (
            <AnalysisResult result={result} onReset={() => setResult(null)} lang={lang} />
          )}
        </div>

        {/* Recent Scans History */}
        {!result && history.length > 0 && (
          <ScanHistory history={history} onLoad={handleLoadScan} lang={lang} />
        )}

        <ClinicLocator lang={lang} />
      </main>
      <ChatBot />
      
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Drishti AI</span>
            </div>
            <p className="text-sm max-w-xs">Empowering rural healthcare with accessible AI technology for early disease detection.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>For Doctors</li>
              <li>For Patients</li>
              <li>Accuracy Data</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>HIPAA Compliance</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© 2024 Drishti AI. {translations[lang].disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
