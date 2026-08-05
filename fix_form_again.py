with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix modal backgrounds and blur
content = content.replace(
    'className="absolute inset-0 bg-black/80 backdrop-blur-md"',
    'className="absolute inset-0 bg-black/90 sm:bg-black/80 sm:backdrop-blur-md"'
)

content = content.replace(
    'className="absolute inset-0 bg-black/80 backdrop-blur-sm"',
    'className="absolute inset-0 bg-black/90 sm:bg-black/80 sm:backdrop-blur-sm"'
)

# Fix modal padding and width
content = content.replace(
    'className={`relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl p-10 transition-all duration-700 ${registeredSuccess',
    'className={`relative z-10 w-[90%] sm:w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-5 sm:p-10 transition-all duration-700 ${registeredSuccess'
)

# Replace Team Size Dropdown
old_team_size = """                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
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
                              </select>"""

new_team_size = """                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-3">
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
                              </div>"""

content = content.replace(old_team_size, new_team_size)

# Replace Category Dropdown
old_category = """                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-2">
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
                              </select>"""

new_category = """                              <label className="block text-xs font-semibold tracking-wider text-gray-300 mb-3">
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
                              </div>"""

content = content.replace(old_category, new_category)

with open('src/App.tsx', 'w') as f:
    f.write(content)
