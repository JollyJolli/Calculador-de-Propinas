// Event listener para los botones de porcentaje de propina
document.querySelectorAll('#tip-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const percent = button.dataset.value;
        if (percent === 'Otro') {
            document.getElementById('custom-tip-container').style.display = 'block';
        } else {
            document.getElementById('custom-tip-container').style.display = 'none';
            document.querySelectorAll('#tip-buttons button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        }
    });
});

// Event listener para los botones de número de personas
document.querySelectorAll('#people-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const num = button.dataset.value;
        if (num === 'Otro') {
            document.getElementById('custom-people-container').style.display = 'block';
        } else {
            document.getElementById('custom-people-container').style.display = 'none';
            document.querySelectorAll('#people-buttons button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        }
    });
});

// Event listener para calcular la propina cuando se hace clic en el botón
document.getElementById('tip-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página
    calculateTip();
});

// Función para calcular la propina
function calculateTip() {
    // Obtener el monto de la cuenta y validar que sea numérico
    const billAmount = parseFloat(document.getElementById('bill-amount').value);
    if (isNaN(billAmount) || billAmount <= 0) {
        alert('Por favor ingresa un monto válido para la cuenta.');
        return;
    }

    // Obtener el porcentaje de propina seleccionado
    let tipPercentage;
    const selectedTipButton = document.querySelector('#tip-buttons button.selected');
    if (selectedTipButton) {
        tipPercentage = parseInt(selectedTipButton.dataset.value);
    } else {
        const customTip = parseFloat(document.getElementById('custom-tip').value);
        if (isNaN(customTip) || customTip < 0) {
            alert('Por favor ingresa un porcentaje válido para la propina.');
            return;
        }
        tipPercentage = customTip;
    }

    // Obtener el número de personas
    let numberOfPeople;
    const selectedPeopleButton = document.querySelector('#people-buttons button.selected');
    if (selectedPeopleButton) {
        numberOfPeople = parseInt(selectedPeopleButton.dataset.value);
    } else {
        const customPeople = parseInt(document.getElementById('custom-people').value);
        if (isNaN(customPeople) || customPeople <= 0) {
            alert('Por favor ingresa un número válido de personas.');
            return;
        }
        numberOfPeople = customPeople;
    }

    // Calcular la propina total y el monto total por persona
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / numberOfPeople;

    // Formatear números grandes con comas
    const formattedTipAmount = formatNumber(tipAmount);
    const formattedTotalAmount = formatNumber(totalAmount);
    const formattedAmountPerPerson = formatNumber(amountPerPerson);

    // Mostrar los resultados
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
        <h2>Resultados</h2>
        <p><i class="fas fa-hand-holding-usd"></i> Propina total: $${formattedTipAmount}</p>
        <p><i class="fas fa-coins"></i> Monto total: $${formattedTotalAmount}</p>
        <p><i class="fas fa-users"></i> Cantidad por persona: $${formattedAmountPerPerson}</p>
    `;

    // Mostrar el contenedor de resultados
    resultContainer.style.display = 'block';
}

// Función para formatear números con comas
function formatNumber(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
