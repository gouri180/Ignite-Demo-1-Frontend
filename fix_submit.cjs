const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldSubmit = `  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRegisteredSuccess(true)
    setTimeout(() => {
      setRegisteredSuccess(false)
      setIsRegisterOpen(false)
      setFormData({
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
        domain: 'Healthcare',
        members: '3',
      })
    }, 2500)
  }`;

const newSubmit = `  const loadRazorpayScript = () => {
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
  }`;

code = code.replace(oldSubmit, newSubmit);
fs.writeFileSync('src/App.tsx', code);
console.log('API integration successfully restored in handleRegisterSubmit.');
