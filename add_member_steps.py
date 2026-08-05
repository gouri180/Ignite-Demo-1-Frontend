with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Add state
content = content.replace(
    'const [mobileStep, setMobileStep] = useState(1)',
    'const [mobileStep, setMobileStep] = useState(1)\n  const [mobileMemberStep, setMobileMemberStep] = useState(0)'
)

# 2. Modify mapped member div
old_member_div = '<div key={index} className="mb-4 last:mb-0 border-b border-white/5 pb-4 last:border-0 last:pb-0">'
new_member_div = '<div key={index} className={`mb-4 last:mb-0 border-b border-white/5 pb-4 last:border-0 last:pb-0 ${mobileMemberStep === index ? "block" : "hidden md:block"}`}>'
content = content.replace(old_member_div, new_member_div)

# 3. Replace the button section for formStep === 2
old_btn_section = """                          <div className="pt-3 flex gap-4">
                            <button
                              type="button"
                              onClick={() => { setFormStep(1); setMobileStep(3); }}
                              className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const membersToValidate = teamMembers.slice(0, parseInt(formData.members, 10) - 1);
                                const isMembersValid = membersToValidate.every(m => m.name.trim() && m.phone.trim() && m.email.trim());
                                if (!isMembersValid) {
                                  setFormError('Please fill out all team member details.');
                                  return;
                                }
                                const isPhoneValid = membersToValidate.every(m => m.phone.length === 10);
                                if (!isPhoneValid) {
                                  setFormError('Please enter valid 10-digit phone numbers for all team members.');
                                  return;
                                }
                                setFormError(null);
                                setFormStep(3);
                              }}
                              className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next
                            </button>
                          </div>"""

new_btn_section = """                          <div className="pt-3">
                            <div className="flex gap-4 md:hidden">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormError(null);
                                  if (mobileMemberStep > 0) {
                                    setMobileMemberStep(mobileMemberStep - 1);
                                  } else {
                                    setFormStep(1);
                                    setMobileStep(3);
                                  }
                                }}
                                className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                              >
                                Back
                              </button>
                              
                              {mobileMemberStep < parseInt(formData.members, 10) - 2 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const m = teamMembers[mobileMemberStep];
                                    if (!m.name.trim() || !m.phone.trim() || !m.email.trim()) {
                                      setFormError('Please fill out all member details.');
                                      return;
                                    }
                                    if (m.phone.length !== 10) {
                                      setFormError('Please enter a valid 10-digit phone number.');
                                      return;
                                    }
                                    setFormError(null);
                                    setMobileMemberStep(mobileMemberStep + 1);
                                  }}
                                  className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                                >
                                  Next
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const membersToValidate = teamMembers.slice(0, parseInt(formData.members, 10) - 1);
                                    const isMembersValid = membersToValidate.every(m => m.name.trim() && m.phone.trim() && m.email.trim());
                                    if (!isMembersValid) {
                                      setFormError('Please fill out all team member details.');
                                      return;
                                    }
                                    const isPhoneValid = membersToValidate.every(m => m.phone.length === 10);
                                    if (!isPhoneValid) {
                                      setFormError('Please enter valid 10-digit phone numbers for all team members.');
                                      return;
                                    }
                                    setFormError(null);
                                    setFormStep(3);
                                  }}
                                  className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                                >
                                  Next Step
                                </button>
                              )}
                            </div>
                            
                            <div className="hidden md:flex gap-4">
                              <button
                                type="button"
                                onClick={() => { setFormStep(1); setMobileStep(3); }}
                                className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                              >
                                Back
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const membersToValidate = teamMembers.slice(0, parseInt(formData.members, 10) - 1);
                                  const isMembersValid = membersToValidate.every(m => m.name.trim() && m.phone.trim() && m.email.trim());
                                  if (!isMembersValid) {
                                    setFormError('Please fill out all team member details.');
                                    return;
                                  }
                                  const isPhoneValid = membersToValidate.every(m => m.phone.length === 10);
                                  if (!isPhoneValid) {
                                    setFormError('Please enter valid 10-digit phone numbers for all team members.');
                                    return;
                                  }
                                  setFormError(null);
                                  setFormStep(3);
                                }}
                                className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                              >
                                Next Step
                              </button>
                            </div>
                          </div>"""

content = content.replace(old_btn_section, new_btn_section)

# 4. Also reset mobileMemberStep on close or reset
content = content.replace(
    'setMobileStep(3);',
    'setMobileStep(3); setMobileMemberStep(0);'
)
content = content.replace(
    'setFormStep(1); setMobileStep(1)',
    'setFormStep(1); setMobileStep(1); setMobileMemberStep(0)'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
