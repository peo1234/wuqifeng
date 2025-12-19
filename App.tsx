
import React, { useState, useEffect } from 'react';
import { User, ScrollText, X, Landmark, Coins, Map, Loader2, Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { TangPhase, IdentityType, PhaseConfig, IdentityConfig } from './types';
import { PHASES, IDENTITIES } from './constants';
import { generateHistoricalReport } from './services/geminiService';

const App: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<PhaseConfig>(PHASES[TangPhase.HIGH]);
  const [identity, setIdentity] = useState<IdentityConfig>(IDENTITIES[IdentityType.MERCHANT]);
  const [reportData, setReportData] = useState<{ title: string; date: string; content: string[] } | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [showIdentityMenu, setShowIdentityMenu] = useState(false);

  const phasesList = [TangPhase.EARLY, TangPhase.HIGH, TangPhase.MID, TangPhase.LATE];
  const phaseIndex = phasesList.indexOf(currentPhase.id);

  const handlePhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value);
    setCurrentPhase(PHASES[phasesList[idx]]);
    setReportData(null);
  };

  const handleOpenReport = async () => {
    setLoadingReport(true);
    const data = await generateHistoricalReport(currentPhase, identity);
    setReportData(data);
    setLoadingReport(false);
  };

  return (
    <div 
      className="flex h-screen w-full overflow-hidden era-transition font-tang"
      style={{ backgroundColor: currentPhase.colorBg, color: '#3d2b1f' }}
    >
      <Sidebar phase={currentPhase} identity={identity} />

      <main className="flex-1 flex flex-col relative p-8 md:p-12 overflow-hidden items-center justify-center">
        
        {/* Top: Current Context & Identity Switcher */}
        <div className="absolute top-10 left-12 right-12 flex justify-between items-start z-10">
          <div className="flex items-center gap-6">
             <div 
              className="p-1 rounded-2xl cursor-pointer hover:scale-105 transition-all shadow-xl border-2"
              style={{ borderColor: identity.accentColor, backgroundColor: 'rgba(255,255,255,0.5)' }}
              onClick={() => setShowIdentityMenu(!showIdentityMenu)}
             >
                <div className="p-4 flex items-center gap-4">
                  <User size={32} style={{ color: identity.accentColor }} />
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#3d2b1f' }}>{identity.title}</h2>
                    <p className="text-xs opacity-60" style={{ color: '#3d2b1f' }}>点击切换身份</p>
                  </div>
                </div>
             </div>
             <div className="hidden lg:block">
                <h1 className="text-4xl font-bold tracking-[0.2em] text-glow" style={{ color: currentPhase.colorAccent }}>{currentPhase.name}</h1>
                <p className="text-sm opacity-70 mt-1">{currentPhase.yearRange}</p>
             </div>
          </div>

          <button 
            onClick={handleOpenReport}
            disabled={loadingReport}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 border-2"
            style={{ backgroundColor: currentPhase.colorAccent, borderColor: '#fff', color: '#fff' }}
          >
            {loadingReport ? <Loader2 size={24} className="animate-spin" /> : <ScrollText size={24} />}
            生成今日简报
          </button>
        </div>

        {/* Center: Immersion Graphics */}
        <div className="text-center space-y-8 max-w-2xl opacity-90 select-none">
          <h3 className="text-8xl font-black opacity-[0.03] tracking-[1em] mb-[-4rem] animate-pulse">CHANG'AN</h3>
          <div className="relative">
            <Landmark size={180} className="mx-auto" style={{ color: currentPhase.colorAccent + '20' }} />
          </div>
          <p className="text-2xl leading-loose italic max-w-lg mx-auto font-medium" style={{ color: '#5d4037' }}>
            "{currentPhase.historicalContext}"
          </p>
        </div>

        {/* Bottom: Time Slider (Scale) */}
        <div className="absolute bottom-12 left-24 right-24 bg-white/30 p-8 rounded-3xl backdrop-blur-md border border-black/5 shadow-lg">
          <div className="flex justify-between text-xs font-bold opacity-50 mb-4 px-2" style={{ color: '#3d2b1f' }}>
            <span>贞观</span>
            <span>开元</span>
            <span>元和</span>
            <span>大顺</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="1"
            value={phaseIndex}
            onChange={handlePhaseChange}
            className="time-slider"
          />
          <div className="mt-4 text-center">
            <span className="text-lg font-bold tracking-widest text-glow" style={{ color: currentPhase.colorAccent }}>
              {currentPhase.yearRange}
            </span>
          </div>
        </div>

        {/* Identity Menu Modal */}
        {showIdentityMenu && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[300] backdrop-blur-sm">
            <div className="bg-[#fdf6e3] p-8 rounded-[2rem] max-w-md w-full border-4 border-[#b8860b] shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#3d2b1f' }}>切换在大唐的身份</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.values(IDENTITIES).map(id => (
                  <button 
                    key={id.id}
                    onClick={() => { setIdentity(id); setShowIdentityMenu(false); }}
                    className={`p-4 rounded-xl flex items-center gap-4 border-2 transition-all hover:bg-black/5 ${identity.id === id.id ? 'border-[#b8860b]' : 'border-black/5'}`}
                  >
                    <div className="p-3 rounded-lg" style={{ backgroundColor: id.accentColor + '10' }}>
                      <User size={24} style={{ color: id.accentColor }} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold" style={{ color: '#3d2b1f' }}>{id.title}</div>
                      <div className="text-xs opacity-50" style={{ color: '#3d2b1f' }}>{id.persona}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowIdentityMenu(false)}
                className="mt-8 w-full py-3 opacity-50 hover:opacity-100 font-bold"
                style={{ color: '#3d2b1f' }}
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {reportData && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[400] backdrop-blur-md">
            <div className="bg-[#fdf6e3] text-[#3d2b1f] p-12 rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto border-[10px] border-double border-[#8b4513] relative shadow-2xl">
              <button onClick={() => setReportData(null)} className="absolute top-8 right-8 p-2 hover:rotate-90 transition-all text-[#3d2b1f]"><X size={32} /></button>
              
              <div className="text-center mb-12 border-b-4 border-[#8b4513] pb-8">
                <h1 className="text-5xl font-bold tracking-[0.4em] mb-4" style={{ color: '#8b4513' }}>{reportData.title}</h1>
                <p className="text-xl opacity-70 italic">{reportData.date}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8 text-2xl leading-loose font-medium">
                   {reportData.content.map((txt, i) => (
                     <p key={i} className="first-letter:text-5xl first-letter:float-left first-letter:mr-2">{txt}</p>
                   ))}
                </div>
                <div className="space-y-8">
                  <section className="bg-black/5 p-6 rounded-2xl border-l-8 border-[#b8860b]">
                    <h4 className="flex items-center gap-2 font-bold mb-4 text-[#b8860b]"><Coins size={20} /> 斗米物价</h4>
                    <p className="text-lg">{currentPhase.prices}</p>
                  </section>
                  <section className="bg-black/5 p-6 rounded-2xl border-l-8 border-[#ec407a]">
                    <h4 className="flex items-center gap-2 font-bold mb-4 text-[#ec407a]"><Map size={20} /> 坊市指南</h4>
                    <p className="text-lg">{identity.marketGuide}</p>
                  </section>
                  <section className="bg-black/5 p-6 rounded-2xl border-l-8 border-[#1e88e5]">
                    <h4 className="flex items-center gap-2 font-bold mb-4 text-[#1e88e5]"><Info size={20} /> 邸报摘要</h4>
                    <p className="text-lg">{currentPhase.diBao}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Large Background Watermark */}
        <div className="absolute bottom-8 right-12 opacity-[0.02] select-none pointer-events-none text-right">
          <p className="text-[18rem] font-black leading-none" style={{ color: '#3d2b1f' }}>TANG</p>
        </div>
      </main>
    </div>
  );
};

export default App;
