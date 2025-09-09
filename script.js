// script.js
document.addEventListener('DOMContentLoaded', function() {
    const pricingInput = document.getElementById('pricing');
    const form = document.getElementById('program-form');

    // PayPal Button Integration
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: pricingInput.value // Use entered value as amount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Redirect to confirmation or success page
                window.location.href = "confirmation.html"; // Example redirection to confirmation page
            });
        }
    }).render('#paypal-button-container'); // Render the PayPal button

    // Prevent form submit (we don't need to submit it here)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
});
