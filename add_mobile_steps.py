with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add mobileStep state
content = content.replace(
    'const [formStep, setFormStep] = useState(1)',
    'const [formStep, setFormStep] = useState(1)\n  const [mobileStep, setMobileStep] = useState(1)'
)

# Replace the sections with md:block classes
old_section_1 = '                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">'
new_section_1 = '                          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${mobileStep === 1 ? "block" : "hidden md:grid"}`}>'
content = content.replace(old_section_1, new_section_1, 1) # Only first occurrence (Team Name)

old_section_2 = '                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">'
new_section_2 = '                          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${mobileStep === 2 ? "block" : "hidden md:grid"}`}>'
content = content.replace(old_section_2, new_section_2, 1) # Second occurrence (Leader Info)

old_section_3 = '                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">'
new_section_3 = '                          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ${mobileStep === 3 ? "block" : "hidden md:grid"}`}>'
content = content.replace(old_section_3, new_section_3, 1) # Third occurrence (Category)

# Now, replace the Next Step button logic
old_button_section = """                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={() => {
                                // Basic validation before next step
                                if (!formData.teamName.trim() || !formData.leaderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                                  setFormError('Please fill out all required team details.');
                                  return;
                                }
                                if (formData.phone.length !== 10) {
                                  setFormError('Please enter a valid 10-digit phone number for the leader.');
                                  return;
                                }
                                if (formData.category !== 'Others' && !formData.institutionName.trim()) {
                                  setFormError(`Please enter your ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name.`);
                                  return;
                                }
                                setFormError(null);
                                if (parseInt(formData.members, 10) > 1) {
                                  setFormStep(2);
                                } else {
                                  setFormStep(3);
                                }
                              }}
                              className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next Step
                            </button>
                          </div>"""

new_button_section = """                          <div className="pt-3">
                            {/* Mobile Navigation */}
                            <div className="flex gap-4 md:hidden">
                              {mobileStep > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormError(null);
                                    setMobileStep(mobileStep - 1);
                                  }}
                                  className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                                >
                                  Back
                                </button>
                              )}
                              
                              {mobileStep < 3 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (mobileStep === 1 && !formData.teamName.trim()) {
                                      setFormError('Please enter a Team Name.');
                                      return;
                                    }
                                    if (mobileStep === 2) {
                                      if (!formData.leaderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                                        setFormError('Please fill out all Leader details.');
                                        return;
                                      }
                                      if (formData.phone.length !== 10) {
                                        setFormError('Please enter a valid 10-digit phone number.');
                                        return;
                                      }
                                    }
                                    setFormError(null);
                                    setMobileStep(mobileStep + 1);
                                  }}
                                  className={`${mobileStep === 1 ? 'w-full' : 'w-2/3'} rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]`}
                                >
                                  Next
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (formData.category !== 'Others' && !formData.institutionName.trim()) {
                                      setFormError(`Please enter your ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name.`);
                                      return;
                                    }
                                    setFormError(null);
                                    if (parseInt(formData.members, 10) > 1) {
                                      setFormStep(2);
                                    } else {
                                      setFormStep(3);
                                    }
                                  }}
                                  className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                                >
                                  Next Step
                                </button>
                              )}
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:block">
                              <button
                                type="button"
                                onClick={() => {
                                  // Basic validation before next step
                                  if (!formData.teamName.trim() || !formData.leaderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                                    setFormError('Please fill out all required team details.');
                                    return;
                                  }
                                  if (formData.phone.length !== 10) {
                                    setFormError('Please enter a valid 10-digit phone number for the leader.');
                                    return;
                                  }
                                  if (formData.category !== 'Others' && !formData.institutionName.trim()) {
                                    setFormError(`Please enter your ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name.`);
                                    return;
                                  }
                                  setFormError(null);
                                  if (parseInt(formData.members, 10) > 1) {
                                    setFormStep(2);
                                  } else {
                                    setFormStep(3);
                                  }
                                }}
                                className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                              >
                                Next Step
                              </button>
                            </div>
                          </div>"""

content = content.replace(old_button_section, new_button_section)

# When form opens or returns to Step 1, reset mobileStep to 1.
# We can do this where formStep is set to 1.
# There's a back button on step 2: onClick={() => setFormStep(1)}
content = content.replace(
    'onClick={() => setFormStep(1)}',
    'onClick={() => { setFormStep(1); setMobileStep(3); }}'
)

# And when closing modal, reset it.
content = content.replace(
    'setFormStep(1)',
    'setFormStep(1); setMobileStep(1)'
)
content = content.replace(
    'setFormStep(1); setMobileStep(1); setMobileStep(3);',
    'setFormStep(1); setMobileStep(3);'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
