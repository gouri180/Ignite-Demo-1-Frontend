const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update formData state
code = code.replace(
  /const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\)/,
  `const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    email: '',
    phone: '',
    college: '',
    ideaTitle: '',
    problemStatement: '',
    solution: '',
    domain: 'Healthcare',
    members: '3',
  })`
);

// 2. Update handleRegisterSubmit
const newSubmit = `
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_name: formData.teamName,
          leader_name: formData.leaderName,
          leader_email: formData.email,
          leader_mobile: formData.phone,
          college: formData.college,
          idea_title: formData.ideaTitle,
          problem_statement: formData.problemStatement,
          solution: formData.solution
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');

      const resLoaded = await loadRazorpayScript();
      if (!resLoaded) {
        alert('Razorpay SDK failed to load');
        return;
      }

      const options = {
        key: 'rzp_test_xxxxxx',
        amount: data.amount,
        currency: 'INR',
        name: 'IGNITE 2.0',
        description: 'Team Registration Fee',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('http://localhost:3000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setRegisteredSuccess(true);
              setTimeout(() => {
                setRegisteredSuccess(false);
                setIsRegisterOpen(false);
                setFormData({
                  teamName: '', leaderName: '', email: '', phone: '', college: '',
                  ideaTitle: '', problemStatement: '', solution: '', domain: 'Healthcare', members: '3'
                });
              }, 3000);
            } else {
              alert(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            alert('Error verifying payment');
          }
        },
        prefill: {
          name: formData.leaderName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#84E325'
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      alert(err.message);
    }
  }
`;

code = code.replace(/const handleRegisterSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\}\s*\}, 2500\)\s*\}/, newSubmit.trim());

// 3. Update the form inside the modal
const oldFormFields = `<form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Team Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        placeholder="e.g. CyberDynasty"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                          Leader Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.leaderName}
                          onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                          placeholder="Full Name"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                          Team Size
                        </label>
                        <select
                          value={formData.members}
                          onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-4 py-2.5 text-sm text-white focus:border-[#84E325] focus:outline-none"
                        >
                          <option value="2">2 Members</option>
                          <option value="3">3 Members</option>
                          <option value="4">4 Members</option>
                          <option value="5">5 Members</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="leader@team.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"
                      />
                    </div>`;

const newFormFields = `<form onSubmit={handleRegisterSubmit} className="space-y-4 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Team Name</label>
                        <input type="text" required value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} placeholder="e.g. CyberDynasty" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">College</label>
                        <input type="text" required value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="e.g. IIT Madras" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Leader Name</label>
                        <input type="text" required value={formData.leaderName} onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })} placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Team Size</label>
                        <select value={formData.members} onChange={(e) => setFormData({ ...formData, members: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#0d180f] px-4 py-2.5 text-sm text-white focus:border-[#84E325] focus:outline-none">
                          <option value="1">1 Member</option>
                          <option value="2">2 Members</option>
                          <option value="3">3 Members</option>
                          <option value="4">4 Members</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="leader@team.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Mobile</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 9876543210" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Idea Title</label>
                      <input type="text" required value={formData.ideaTitle} onChange={(e) => setFormData({ ...formData, ideaTitle: e.target.value })} placeholder="What are you building?" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none" />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Problem Statement (Optional)</label>
                      <textarea rows="2" value={formData.problemStatement} onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })} placeholder="Describe the problem..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"></textarea>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">Solution (Optional)</label>
                      <textarea rows="2" value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} placeholder="Describe your solution..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#84E325] focus:outline-none"></textarea>
                    </div>`;

code = code.replace(oldFormFields, newFormFields);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx patched successfully');
