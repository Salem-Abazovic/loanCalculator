// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault(e);
});

// Calculate Results
function calculateResults(){
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your input');
  }
}

  //Show Errorr
  function showError(error){
    // Show results
    document.getElementById('results').style.display = 'none';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get Element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 sec
    setTimeout(clearError, 3000);

  }

  // Clear error
  function clearError(){
    document.querySelector('.alert').remove();
  }