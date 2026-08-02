const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Refine Main Title Size and Glow (match image exactly)
code = code.replace(
  `className="font-orbitron text-7xl font-extrabold tracking-tight text-white sm:text-8xl lg:text-[10rem]"`,
  `className="font-orbitron text-6xl font-black tracking-tight text-white sm:text-8xl lg:text-[9rem] drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"`
);
code = code.replace(
  `IGNITE <span className="text-[#84E325] drop-shadow-[0_0_35px_rgba(132,227,37,0.6)]">2.0</span>`,
  `IGNITE <span className="text-[#84E325] ml-2 drop-shadow-[0_0_40px_rgba(132,227,37,0.8)]">2.0</span>`
);

// 2. Refine Subtitle Tagline (match image exactly with glow)
code = code.replace(
  `className="mt-6 text-2xl font-bold tracking-[0.15em] text-[#84E325] sm:text-3xl lg:text-4xl"`,
  `className="mt-8 text-xl font-bold tracking-[0.2em] text-[#84E325] sm:text-2xl lg:text-3xl drop-shadow-[0_0_15px_rgba(132,227,37,0.5)]"`
);

// 3. Refine Paragraph Description (match image color and size perfectly)
code = code.replace(
  `className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#A8BAA8] sm:text-lg lg:text-xl"`,
  `className="mx-auto mt-6 max-w-[800px] text-sm leading-relaxed text-[#9EB09E] sm:text-base lg:text-lg tracking-wide"`
);

// 4. Refine Buttons spacing
code = code.replace(
  `className="mt-10 flex flex-wrap items-center justify-center gap-6"`,
  `className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"`
);

// 5. Refine Countdown Timer Outer Box
code = code.replace(
  `className="mt-10 mx-auto w-full max-w-3xl rounded-2xl border border-[#84E325]/30 bg-[#061008]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(132,227,37,0.15)]"`,
  `className="mt-14 mx-auto w-full max-w-[850px] rounded-3xl border border-[#84E325]/20 bg-[#061008]/60 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(132,227,37,0.1)]"`
);

// 6. Refine Timer Inner Boxes to look dark and sleek like the screenshot
code = code.replace(
  `className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6"`,
  `className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#09140a]/80 p-5 sm:p-8 shadow-inner"`
);

// 7. Refine Timer Values and Labels
code = code.replace(
  `className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_12px_rgba(132,227,37,0.4)]"`,
  `className="font-orbitron text-4xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"`
);
code = code.replace(
  `className="font-orbitron mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-[#9EB09E]"`,
  `className="font-orbitron mt-3 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#6b7b6b]"`
);

fs.writeFileSync('src/App.tsx', code);
console.log('Design perfectly refined to match the screenshot proportions.');
