// Donation page functionality

let selectedAmount = 0;

// Amount selection functionality
function selectAmount(amount) {
    selectedAmount = amount;
    
    // Update UI
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Clear custom amount
    document.getElementById('customAmount').value = '';
}

// Custom amount handling
document.addEventListener('DOMContentLoaded', function() {
    const customAmountInput = document.getElementById('customAmount');
    
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            selectedAmount = parseInt(this.value) || 0;
            
            // Remove active class from preset buttons
            document.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    }
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        const button = event.target.closest('.copy-btn');
        const originalContent = button.innerHTML;
        
        button.classList.add('copied');
        button.innerHTML = '<i class="fas fa-check"></i>';
        
        // Show notification
        showNotification(`Copied: ${text}`, 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalContent;
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Failed to copy. Please copy manually.', 'error');
    });
}

// Payment modal functionality
function showPaymentModal(paymentType) {
    if (selectedAmount < 100) {
        showNotification('Please select an amount of at least ₹100', 'error');
        return;
    }
    
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    let title = '';
    let content = '';
    
    switch(paymentType) {
        case 'upi':
            title = 'UPI Payment';
            content = `
                <div class="payment-form">
                    <div class="amount-display">
                        <h4>Amount: ₹${selectedAmount.toLocaleString()}</h4>
                    </div>
                    <div class="upi-options">
                        <h5>Choose UPI App:</h5>
                        <div class="upi-apps">
                            <button class="upi-app" onclick="processPayment('googlepay')">
                                <i class="fab fa-google-pay"></i>
                                <span>Google Pay</span>
                            </button>
                            <button class="upi-app" onclick="processPayment('phonepe')">
                                <i class="fas fa-mobile-alt"></i>
                                <span>PhonePe</span>
                            </button>
                            <button class="upi-app" onclick="processPayment('paytm')">
                                <i class="fas fa-wallet"></i>
                                <span>Paytm</span>
                            </button>
                        </div>
                    </div>
                    <div class="upi-id-section">
                        <label for="upiId">Or enter UPI ID:</label>
                        <input type="text" id="upiId" placeholder="yourname@upi">
                        <button class="btn btn-primary" onclick="processUPIPayment()">Pay Now</button>
                    </div>
                </div>
            `;
            break;
            
        case 'card':
            title = 'Card Payment';
            content = `
                <div class="payment-form">
                    <div class="amount-display">
                        <h4>Amount: ₹${selectedAmount.toLocaleString()}</h4>
                    </div>
                    <form class="card-form">
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="3">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cardName">Cardholder Name</label>
                            <input type="text" id="cardName" placeholder="John Doe">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="processCardPayment()">Pay Securely</button>
                    </form>
                </div>
            `;
            break;
            
        case 'netbanking':
            title = 'Net Banking';
            content = `
                <div class="payment-form">
                    <div class="amount-display">
                        <h4>Amount: ₹${selectedAmount.toLocaleString()}</h4>
                    </div>
                    <div class="bank-selection">
                        <label for="bankSelect">Select Your Bank:</label>
                        <select id="bankSelect">
                            <option value="">Choose your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="bob">Bank of Baroda</option>
                            <option value="union">Union Bank of India</option>
                            <option value="other">Other Banks</option>
                        </select>
                        <button class="btn btn-primary" onclick="processNetBankingPayment()">Proceed to Bank</button>
                    </div>
                </div>
            `;
            break;
    }
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Payment processing functions (mock implementations)
function processPayment(app) {
    showNotification(`Redirecting to ${app}...`, 'info');
    setTimeout(() => {
        showNotification('This is a demo. In production, this would redirect to the actual payment gateway.', 'info');
    }, 2000);
}

function processUPIPayment() {
    const upiId = document.getElementById('upiId').value;
    if (!upiId) {
        showNotification('Please enter a valid UPI ID', 'error');
        return;
    }
    
    showNotification('Processing UPI payment...', 'info');
    setTimeout(() => {
        showNotification('This is a demo. In production, this would process the actual payment.', 'info');
        closePaymentModal();
    }, 2000);
}

function processCardPayment() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        showNotification('Please fill in all card details', 'error');
        return;
    }
    
    showNotification('Processing card payment...', 'info');
    setTimeout(() => {
        showNotification('This is a demo. In production, this would process the actual payment securely.', 'info');
        closePaymentModal();
    }, 2000);
}

function processNetBankingPayment() {
    const selectedBank = document.getElementById('bankSelect').value;
    if (!selectedBank) {
        showNotification('Please select your bank', 'error');
        return;
    }
    
    showNotification('Redirecting to bank website...', 'info');
    setTimeout(() => {
        showNotification('This is a demo. In production, this would redirect to your bank\'s secure website.', 'info');
        closePaymentModal();
    }, 2000);
}

// Card number formatting
document.addEventListener('DOMContentLoaded', function() {
    // Format card number input
    document.addEventListener('input', function(e) {
        if (e.target.id === 'cardNumber') {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        }
        
        // Format expiry date
        if (e.target.id === 'expiryDate') {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        }
        
        // Format CVV (numbers only)
        if (e.target.id === 'cvv') {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closePaymentModal();
            }
        });
    }
});

// ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePaymentModal();
    }
});

// Add payment form styles
const paymentStyles = document.createElement('style');
paymentStyles.textContent = `
    .payment-form {
        max-width: 400px;
    }
    
    .amount-display {
        background: var(--soft-gray);
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 25px;
    }
    
    .amount-display h4 {
        color: var(--royal-blue);
        font-size: 1.5rem;
        margin: 0;
    }
    
    .upi-apps {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 25px;
    }
    
    .upi-app {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border: 2px solid var(--light-gray);
        border-radius: 10px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .upi-app:hover {
        border-color: var(--royal-blue);
        background: var(--soft-gray);
    }
    
    .upi-app i {
        font-size: 1.5rem;
        width: 30px;
    }
    
    .upi-app span {
        font-weight: 600;
        color: var(--dark-gray);
    }
    
    .upi-id-section {
        border-top: 1px solid var(--light-gray);
        padding-top: 20px;
    }
    
    .upi-id-section label {
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--dark-gray);
    }
    
    .upi-id-section input {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--light-gray);
        border-radius: 8px;
        margin-bottom: 15px;
        font-size: 1rem;
    }
    
    .upi-id-section input:focus {
        outline: none;
        border-color: var(--royal-blue);
    }
    
    .card-form .form-group {
        margin-bottom: 20px;
    }
    
    .card-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--dark-gray);
    }
    
    .card-form input,
    .card-form select {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--light-gray);
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .card-form input:focus,
    .card-form select:focus {
        outline: none;
        border-color: var(--royal-blue);
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 15px;
    }
    
    .bank-selection label {
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--dark-gray);
    }
    
    .bank-selection select {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--light-gray);
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 1rem;
    }
    
    .bank-selection select:focus {
        outline: none;
        border-color: var(--royal-blue);
    }
    
    @media (max-width: 480px) {
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .upi-apps {
            gap: 8px;
        }
        
        .upi-app {
            padding: 12px;
        }
    }
`;
document.head.appendChild(paymentStyles);