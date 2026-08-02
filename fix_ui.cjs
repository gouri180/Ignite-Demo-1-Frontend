const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove Prize Pool
const prizePoolRegex = /\s*\{\/\* Prize Pool \*\/\}\s*<motion\.div[\s\S]*?<\/motion\.div>/;
code = code.replace(prizePoolRegex, '');

// 2. Add description text
const subtitleText = `Think. Build. Ignite the Future.
            </motion.p>`;
const descriptionText = `Think. Build. Ignite the Future.
            </motion.p>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[#B8C4B8] sm:text-xl lg:text-2xl"
            >
              The definitive AI & Robotics hackathon for the next generation of engineers.<br className="hidden sm:block" />
              Solve real-world challenges through cutting-edge automation and intelligent systems.
            </motion.p>`;
code = code.replace(subtitleText, descriptionText);

// 3. Fix Timer sizes
code = code.replace(
  `className="mt-10 mx-auto max-w-xl rounded-2xl border border-[#84E325]/30 bg-[#061008]/80 p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(132,227,37,0.15)]"`,
  `className="mt-12 mx-auto w-full max-w-3xl rounded-2xl border border-[#84E325]/30 bg-[#061008]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(132,227,37,0.15)]"`
);
code = code.replace(
  `className="font-orbitron text-[11px] font-bold uppercase tracking-[0.22em] text-[#84E325]"`,
  `className="font-orbitron text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#84E325]"`
);
code = code.replace(
  `className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3"`,
  `className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6"`
);
code = code.replace(
  `className="font-orbitron text-2xl sm:text-3xl font-black text-white drop-shadow-[0_0_12px_rgba(132,227,37,0.4)]"`,
  `className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_12px_rgba(132,227,37,0.4)]"`
);
code = code.replace(
  `className="font-orbitron mt-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#9EB09E]"`,
  `className="font-orbitron mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-[#9EB09E]"`
);

// 4. Update Domains Dropdown
const oldOptions = `<option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Defense">Defense</option>
                        <option value="Rescue Tech">Rescue Tech</option>
                        <option value="Third Generation">Third Generation (Open Innovation)</option>`;
const newOptions = `<option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Defence">Defence</option>
                        <option value="Space Technology">Space Technology</option>
                        <option value="Tribal Communities & Development">Tribal Communities & Development</option>`;
code = code.replace(oldOptions, newOptions);

// 5. Update Registration Fee in form submit button
code = code.replace(`Submit Registration (₹800/Team)`, `Submit Registration (₹499/Team)`);

fs.writeFileSync('src/App.tsx', code);
console.log('UI Fixes successfully applied');
