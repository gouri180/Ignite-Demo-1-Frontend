import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Step 1: Replace formStep === 1 with formStep === 1 and formStep === 2
step_1_old = """                      {formStep === 1 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Team Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.teamName}
                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                placeholder="e.g. CyberDynasty"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Team Size
                              </label>
                              <select
                                value={formData.members}
                                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-5 py-3 text-base text-white focus:border-[#84E325] focus:outline-none"
                              >
                                <option value="1">1 Member</option>
                                <option value="2">2 Members</option>
                                <option value="3">3 Members</option>
                                <option value="4">4 Members</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.leaderName}
                                onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                                placeholder="Full Name"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Phone Number
                              </label>
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  setFormData({ ...formData, phone: val });
                                }}
                                placeholder="9876543210"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="leader@team.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>
                          </div>


                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Category
                              </label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-5 py-3 text-base text-white focus:border-[#84E325] focus:outline-none"
                              >
                                <option value="School Student">School Student</option>
                                <option value="UG Student">UG Student</option>
                                <option value="PG Student">PG Student</option>
                                <option value="Organisation">Organisation</option>
                                <option value="Others">Others (Innovators/Enthusiasts)</option>
                              </select>
                            </div>

                            {formData.category !== 'Others' && (
                              <div>
                                <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                  {formData.category === 'School Student' ? 'School Name' :
                                    formData.category === 'Organisation' ? 'Company Name' : 'College Name'}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.institutionName}
                                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                                  placeholder={`Enter ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name`}
                                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                                />
                              </div>
                            )}
                          </div>

                          <div className="pt-3">
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
                        </>
                      )}"""

step_1_new = """                      {formStep === 1 && (
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Team Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.teamName}
                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                placeholder="e.g. CyberDynasty"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-3">
                                Team Size
                              </label>
                              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                                {['1', '2', '3', '4'].map(num => (
                                  <button
                                    type="button"
                                    key={num}
                                    onClick={() => setFormData({ ...formData, members: num })}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${formData.members === num ? 'border-[#84E325] bg-[#84E325]/10 text-[#84E325]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'}`}
                                  >
                                    {num} Member{num > '1' ? 's' : ''}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (!formData.teamName.trim()) {
                                  setFormError('Please enter a team name.');
                                  return;
                                }
                                setFormError(null);
                                setFormStep(2);
                              }}
                              className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next Step
                            </button>
                          </div>
                        </>
                      )}

                      {formStep === 2 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.leaderName}
                                onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                                placeholder="Full Name"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Phone Number
                              </label>
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  setFormData({ ...formData, phone: val });
                                }}
                                placeholder="9876543210"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                Leader Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="leader@team.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-3">
                                Category
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {['School Student', 'UG Student', 'PG Student', 'Organisation', 'Others'].map(cat => (
                                  <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${formData.category === cat ? 'border-[#84E325] bg-[#84E325]/10 text-[#84E325]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'}`}
                                  >
                                    {cat === 'Others' ? 'Others' : cat}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {formData.category !== 'Others' && (
                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
                                  {formData.category === 'School Student' ? 'School Name' :
                                    formData.category === 'Organisation' ? 'Company Name' : 'College Name'}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.institutionName}
                                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                                  placeholder={`Enter ${formData.category === 'School Student' ? 'School' : formData.category === 'Organisation' ? 'Company' : 'College'} Name`}
                                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                                />
                              </div>
                            )}
                          </div>

                          <div className="pt-3 flex gap-4">
                            <button
                              type="button"
                              onClick={() => setFormStep(1)}
                              className="w-1/3 rounded-xl border border-white/20 bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!formData.leaderName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                                  setFormError('Please fill out all required leader details.');
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
                                  setFormStep(3);
                                } else {
                                  setFormStep(4);
                                }
                              }}
                              className="w-2/3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all glow-lime-btn cursor-pointer hover:scale-[1.02]"
                            >
                              Next Step
                            </button>
                          </div>
                        </>
                      )}"""

content = content.replace(step_1_old, step_1_new)

# Replace Step 2 -> 3
content = content.replace("{formStep === 2 && (", "{formStep === 3 && (")
content = content.replace("onClick={() => setFormStep(1)}", "onClick={() => setFormStep(2)}")
content = content.replace("setFormStep(3);\n                              }}\n                              className=\"w-2/3", "setFormStep(4);\n                              }}\n                              className=\"w-2/3")

# Replace Step 3 -> 4
content = content.replace("{formStep === 3 && (", "{formStep === 4 && (")
content = content.replace("onClick={() => setFormStep(parseInt(formData.members, 10) > 1 ? 2 : 1)}", "onClick={() => setFormStep(parseInt(formData.members, 10) > 1 ? 3 : 2)}")

with open('src/App.tsx', 'w') as f:
    f.write(content)
