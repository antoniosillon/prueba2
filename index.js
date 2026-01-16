
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// --- CONSTANTS & DATA ---
const DISCORD_URL = "https://discord.gg/tuservidor";

const RANKS = [
  {
    id: 'rank-explorador',
    name: 'Rango Explorador',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop',
    badge: 'BÁSICO',
    accentColor: '#3b82f6',
    description: 'Acceso inicial al servidor con comandos básicos esenciales.'
  },
  {
    id: 'rank-guerrero',
    name: 'Rango Guerrero',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    badge: 'POPULAR',
    accentColor: '#eab308',
    description: 'Kit de combate avanzado y acceso a zonas de entrenamiento.'
  },
  {
    id: 'rank-mistico',
    name: 'Rango Místico',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=600&auto=format&fit=crop',
    badge: 'ESPECIAL',
    accentColor: '#3b82f6',
    description: 'Habilidades mágicas únicas y cosméticos de partículas.'
  },
  {
    id: 'rank-leyenda',
    name: 'Rango Leyenda',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1614018424573-67db2698947c?q=80&w=600&auto=format&fit=crop',
    badge: 'ÉPICO',
    accentColor: '#3b82f6',
    description: 'El rango definitivo con todos los beneficios globales desbloqueados.'
  }
];

// --- COMPONENTS ---

const RankCard = ({ rank, onSelect }) => {
  const isPopular = rank.badge === 'POPULAR';
  
  return (
    <div 
      className="rank-card group cursor-pointer flex flex-col gap-5"
      onClick={() => onSelect(rank)}
    >
      <div className="card-image-container relative border border-white/5 group-hover:border-blue-500/30 transition-all rounded-xl overflow-hidden">
        <img 
          src={rank.image} 
          alt={rank.name}
          className="w-full h-full object-cover card-zoom opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
        {rank.badge && (
          <div className={`absolute top-4 left-4 text-[9px] font-black px-3 py-1.5 rounded tracking-widest uppercase z-10 shadow-lg ${
            isPopular 
              ? 'bg-[#eab308] text-black' 
              : 'bg-blue-600 text-white'
          }`}>
            {rank.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/80 via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-white font-bold text-sm tracking-tight uppercase group-hover:text-blue-400 transition-colors">
          {rank.name}
        </h3>
        <span className="text-white text-sm font-bold">{rank.price.toFixed(2).replace('.', ',')}€</span>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [nickname, setNickname] = useState('');
  const [purchaseStep, setPurchaseStep] = useState('details'); // 'details' | 'success'

  const handleOpenModal = (rank) => {
    setSelectedRank(rank);
    setPurchaseStep('details');
    setNickname('');
  };

  const handleSimulatePurchase = () => {
    if (!nickname.trim()) return;
    setPurchaseStep('success');
  };

  return (
    <div className="min-h-screen bg-[#0a1120] selection:bg-blue-500/30 font-['Outfit']">
      {/* Modal de Checkout */}
      {selectedRank && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedRank(null)}
          />
          <div className="glass-panel w-full max-w-lg rounded-[2rem] overflow-hidden relative z-10 shadow-2xl transform transition-all">
            <button 
              onClick={() => setSelectedRank(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-10">
              {purchaseStep === 'details' ? (
                <>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                      <img src={selectedRank.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-tighter text-white uppercase">{selectedRank.name}</h2>
                      <p className="text-blue-400 font-bold text-xl">{selectedRank.price.toFixed(2).replace('.', ',')}€</p>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedRank.description}</p>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Tu Nickname de Minecraft</h4>
                      <input 
                        type="text" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Ej: ElRichMC"
                        className="w-full bg-transparent border-b border-white/20 py-2 focus:border-blue-500 outline-none text-white font-bold text-lg transition-colors"
                      />
                    </div>
                    
                    <button 
                      disabled={!nickname.trim()}
                      onClick={handleSimulatePurchase}
                      className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                        nickname.trim() 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg transform hover:-translate-y-1' 
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      CONTINUAR AL PAGO
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4">¡ESTÁ LISTO!</h2>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    Para activar <span className="text-white font-bold">{selectedRank.name}</span>, únete a nuestro Discord y abre un ticket con tu nombre: <span className="text-blue-400 font-bold">{nickname}</span>.
                  </p>
                  <a href={DISCORD_URL} className="inline-block bg-[#5865F2] hover:bg-[#4752c4] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1">
                    ABRIR DISCORD
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0d1629]/90 backdrop-blur-xl border-b border-white/5 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo Section Modified - "LOGO HERE" */}
          <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 shrink-0 overflow-hidden">
             {/* Replace this div or text with your <img> tag later */}
             <span className="text-[9px] font-black text-gray-500 text-center leading-none">LOGO<br/>HERE</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <span className="text-white font-black text-lg tracking-widest uppercase">BattleWorld</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400 mr-2">
            <svg className="w-5 h-5 cursor-pointer hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg className="w-5 h-5 cursor-pointer hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-5 py-2 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center">
            ÚNETE A NUESTRO DISCORD
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto">
        
        <div className="mb-24 mt-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-black flex items-center gap-4 uppercase tracking-tighter text-white">
              <span className="w-1.5 h-10 bg-blue-500 rounded-full" />
              PAQUETES DESTACADOS
            </h2>
            <div className="flex gap-2">
               <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
               </button>
               <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RANKS.map((rank) => (
              <RankCard 
                key={rank.id} 
                rank={rank} 
                onSelect={handleOpenModal} 
              />
            ))}
          </div>
        </div>

        {/* Discord Banner Section */}
        <div className="mt-20 relative rounded-[2rem] overflow-hidden bg-[#0d1629] border border-blue-600/20 group">
          {/* Background Gradient & Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-center md:text-left space-y-4 max-w-xl">
               <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                 ¿NECESITAS AYUDA?
               </h3>
               <p className="text-gray-300 font-medium text-lg">
                 Únete a nuestro servidor de Discord para soporte instantáneo, sorteos y noticias de la comunidad.
               </p>
             </div>

             <a 
               href={DISCORD_URL}
               target="_blank"
               rel="noopener noreferrer"
               className="relative z-20 bg-[#5865F2] hover:bg-[#4752c4] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
             >
               {/* Fixed Discord Icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
  <path
    fillRule="nonzero"
    d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.2 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.53.31-1.07.57-1.64.78c-.04.01-.06.05-.04.09c.31.61.67 1.19 1.07 1.74c.03.01.06.02.09.01c1.67-.53 3.4-1.33 5.2-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z
    M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.82 2.12-1.89 2.12z
    M15.49 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
  />
</svg>
               UNIRSE A DISCORD
             </a>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/5 bg-[#080d1a] py-10 px-6 text-center">
         <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
           &copy; 2026 BATTLEWORLD. NO ASOCIADO CON MOJANG.
         </p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
