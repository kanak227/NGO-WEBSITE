document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const location = document.getElementById('location').value.trim();
    const occupation = document.getElementById('occupation').value.trim();
    const diet = document.getElementById('diet').value;
    const participation = document.getElementById('participation').value;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\+\-\s]{7,15}$/;
  
    if (!name || !email || !phone || !gender || !location || !occupation || !diet || !participation || isNaN(age)) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    if (age < 1 || age > 100) {
      alert("Please enter a valid age between 1 and 100.");
      return;
    }
  
    // If everything is valid
    alert("Registration submitted successfully!");
    this.reset(); // optional: reset form after submission
  });
  