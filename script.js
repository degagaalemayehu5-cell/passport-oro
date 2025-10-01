function showAccount(bankName, accountNumber, fees) {
  console.log('showAccount called:', { bankName, accountNumber, fees });
  const accountDisplay = document.getElementById('accountDisplay');
  const screenshotSection = document.getElementById('screenshotSection');
  accountDisplay.style.display = 'block';
  
  const displayBankName = bankName === "Commercial Bank of Ethiopia" 
    ? "Commercial Bank of Ethiopia / Baanki daldala Ethiopia" 
    : bankName;
  
  const feesDisplay = fees && fees.application && fees.expediting
    ? `
      <strong>Passport Fees / Kaffalti passportii:</strong><br>
      Application Fee / Kaffalti galmee: ${fees.application.amount} ${fees.application.currency}<br>
      Expediting Fee (faster processing) / Dafee akka siniif raawwatuuf: ${fees.expediting.amount} ${fees.expediting.currency}
    `
    : '<strong>Passport Fees / Kaffalti passportii:</strong><br>Error: Fee information unavailable';
  
  accountDisplay.innerHTML = `
    Send money via <strong>${displayBankName}</strong> to / Ergi <strong>${displayBankName}</strong>:<br>
    Account Number: ${accountNumber}<br>
    Bank: ${displayBankName}<br><br>
    ${feesDisplay}
  `;
  screenshotSection.style.display = 'block';
  document.getElementById('screenshotUpload').value = '';
  document.getElementById('screenshotPreview').style.display = 'none';
  document.getElementById('successTransfer').style.display = 'none';
}

// Handle hamburger menu toggle
const hamburgerIcon = document.getElementById('hamburgerIcon');
const menuContent = document.getElementById('menuContent');

hamburgerIcon.addEventListener('click', () => {
  console.log('Hamburger menu clicked');
  menuContent.classList.toggle('active');
});

// Handle menu links
document.getElementById('homeLink').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Home link clicked');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  menuContent.classList.remove('active');
});

document.getElementById('resetLink').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Reset link clicked');
  document.getElementById('resetButton').click();
  menuContent.classList.remove('active');
});

document.getElementById('contactLink').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Contact link clicked');
  alert('Contact us at support@passportdashboard.com / Nu qunnamaa support@passportdashboard.com');
  menuContent.classList.remove('active');
});

// Handle file upload for personal photo
const photoPreview = document.getElementById('photoPreview');
const photoUpload = document.getElementById('photoUpload');

photoUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.style.display = 'block';
      console.log('Photo uploaded successfully');
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file for your personal photo. / Phooto keessanif faayilii suuraa sirrii filadhaa.');
  }
});

// Handle file upload for front ID
const idPreviewFront = document.getElementById('idPreviewFront');
const idUploadFront = document.getElementById('idUploadFront');

idUploadFront.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      idPreviewFront.src = reader.result;
      idPreviewFront.style.display = 'block';
      console.log('Front ID uploaded successfully');
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file for the front of your national ID. / National ID fuula duraan faayilii suuraa sirrii filadhaa.');
  }
});

// Handle file upload for back ID
const idPreviewBack = document.getElementById('idPreviewBack');
const idUploadBack = document.getElementById('idUploadBack');

idUploadBack.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      idPreviewBack.src = reader.result;
      idPreviewBack.style.display = 'block';
      console.log('Back ID uploaded successfully');
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file for the back of your national ID. / National ID fuula duubaan faayilii suuraa sirrii filadhaa.');
  }
});

// Handle screenshot upload
document.getElementById('screenshotUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('screenshotPreview').src = reader.result;
      document.getElementById('screenshotPreview').style.display = 'block';
      document.getElementById('successTransfer').style.display = 'block';
      document.getElementById('successTransfer').innerHTML = 'Successful / Milkaa\'eera';
      console.log('Screenshot uploaded successfully');
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file for the transfer screenshot. / Kaffalti phooto faayilii suuraa sirrii filadhaa.');
  }
});

// Handle reset
document.getElementById('resetButton').addEventListener('click', () => {
  console.log('Reset button clicked');
  document.getElementById('userInfoForm').style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';
  document.getElementById('passportForm').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('userInfoForm').reset();
  document.getElementById('passportForm').reset();
  photoPreview.src = '';
  photoPreview.style.display = 'none';
  idPreviewFront.src = '';
  idPreviewFront.style.display = 'none';
  idPreviewBack.src = '';
  idPreviewBack.style.display = 'none';
  document.getElementById('photoUpload').value = '';
  document.getElementById('idUploadFront').value = '';
  document.getElementById('idUploadBack').value = '';
  document.getElementById('screenshotUpload').value = '';
  document.getElementById('screenshotPreview').style.display = 'none';
  document.getElementById('successTransfer').style.display = 'none';
  menuContent.classList.remove('active');
});

// Handle user info form submission
document.getElementById('userInfoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('User info form submitted');
  const name = document.getElementById('name').value;
  const motherName = document.getElementById('motherName').value;
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const photoImage = photoPreview.src;
  const idImageFront = idPreviewFront.src;
  const idImageBack = idPreviewBack.src;

  // Validate inputs
  if (!name) {
    alert('Please enter your full name. / Maqaa keessan guutuu guutuu bitte.');
    return;
  }
  if (!motherName) {
    alert('Please enter your full mother name. / Maqaa haadha keessan guutuu guutuu bitte.');
    return;
  }
  if (!age) {
    alert('Please enter your age. / Umurii keessan guutuu bitte.');
    return;
  }
  if (!sex) {
    alert('Please select your sex. / Saala keessan filadhaa.');
    return;
  }
  if (!photoImage || photoImage === window.location.href) {
    alert('Please upload your personal photo. / Phooto keessan ergi.');
    return;
  }
  if (!idImageFront || idImageFront === window.location.href) {
    alert('Please upload the front of your national ID. / National ID fuula duraan ergi.');
    return;
  }
  if (!idImageBack || idImageBack === window.location.href) {
    alert('Please upload the back of your national ID. / National ID fuula duubaan ergi.');
    return;
  }

  // Show success message and passport form
  document.getElementById('userInfoForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('successMessage').innerHTML = `
    <h3>Successful / Milkaa'eera</h3>
    <p>Please proceed to select your passport country. / Passport biyya keessan filadhaa.</p>
  `;
  setTimeout(() => {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('passportForm').style.display = 'block';
  }, 2000);
  document.getElementById('resultPhotoPreview').src = photoImage;
  document.getElementById('resultPhotoPreview').style.display = 'block';
  document.getElementById('resultIdPreviewFront').src = idImageFront;
  document.getElementById('resultIdPreviewFront').style.display = 'block';
  document.getElementById('resultIdPreviewBack').src = idImageBack;
  document.getElementById('resultIdPreviewBack').style.display = 'block';
});

// Load data and handle passport form
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log('Data loaded successfully');
    const passportData = data.passports;
    
    document.getElementById('passportForm').addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Passport form submitted');
      const passport = document.getElementById('passport').value;
      if (!passport) {
        alert('Please select a passport country. / Biyya passport filadhaa.');
        return;
      }

      const resultsDiv = document.getElementById('results');
      const resultTitle = document.getElementById('resultTitle');
      const mobilityBadge = document.getElementById('mobilityBadge');
      const tableBody = document.getElementById('requirementsBody');
      const banksList = document.getElementById('banksList');
      const currencyNote = document.getElementById('currencyNote');
      const accountDisplay = document.getElementById('accountDisplay');
      const screenshotSection = document.getElementById('screenshotSection');

      // Show results
      resultsDiv.style.display = 'block';
      resultTitle.textContent = `${passport} Passport Dashboard`;
      
      // Mobility score badge
      const score = passportData[passport].mobilityScore;
      mobilityBadge.innerHTML = `<span class="badge">Mobility Score: ${score} countries</span>`;
      
      // Populate table
      tableBody.innerHTML = '';
      const requirements = passportData[passport].requirements;
      for (const [destination, requirement] of Object.entries(requirements)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${destination}</td><td>${requirement}</td>`;
        tableBody.appendChild(row);
      }

      // Populate banking list and currency note
      banksList.innerHTML = '';
      const banks = passportData[passport].banks;
      const currencies = [...new Set(banks.map(bank => bank.currency))].join(', ');
      currencyNote.textContent = `Preferred currencies for transfers: ${currencies}`;
      banks.forEach(bank => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const displayBankName = bank.name === "Commercial Bank of Ethiopia" 
          ? "Commercial Bank of Ethiopia / Baanki daldala Ethiopia" 
          : bank.name;
        span.textContent = `${displayBankName}: ${bank.description}`;
        const link = document.createElement('a');
        link.textContent = 'Send Now / Ergi';
        link.href = '#';
        link.className = 'send-now-link';
        link.dataset.bankName = bank.name;
        link.dataset.accountNumber = bank.accountNumber;
        link.dataset.fees = JSON.stringify(passportData[passport].fees);
        li.appendChild(span);
        li.appendChild(link);
        banksList.appendChild(li);
      });

      // Add event listeners to Send Now links
      document.querySelectorAll('.send-now-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Send Now clicked:', { bankName: link.dataset.bankName, accountNumber: link.dataset.accountNumber });
          const bankName = link.dataset.bankName;
          const accountNumber = link.dataset.accountNumber;
          const fees = JSON.parse(link.dataset.fees);
          showAccount(bankName, accountNumber, fees);
        });
      });

      // Clear account display and screenshot section
      accountDisplay.style.display = 'none';
      accountDisplay.innerHTML = '';
      screenshotSection.style.display = 'none';
      document.getElementById('screenshotUpload').value = '';
      document.getElementById('screenshotPreview').style.display = 'none';
      document.getElementById('successTransfer').style.display = 'none';
    });
  })
  .catch(error => {
    console.error('Error loading data:', error);
    alert('Failed to load passport data. Please check if data.json is present and try again.');
  });