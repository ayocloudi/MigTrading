let balance = 1000;
let stockPrice = 100;
let stocksOwned = 0;
let stockPricesArray = [stockPrice];
let transactions = [];
const companies = ['Apple', 'Google', 'Amazon', 'Tesla'];
const selectedCompany = companies[Math.floor(Math.random() * companies.length)];

function updateUI() {
    document.getElementById('stock-price').innerText = stockPrice.toFixed(2);
    document.getElementById('balance').innerText = balance.toFixed(2);
    document.getElementById('stocks-owned').innerText = stocksOwned;
}

function buyStock() {
    if (balance >= stockPrice) {
        balance -= stockPrice;
        stocksOwned++;
        stockPrice += Math.random() * 10;  // simulate price increase
        stockPricesArray.push(stockPrice);
        transactions.push('buy');
        updateUI();
        updateChart();
    }
}

function sellStock() {
    if (stocksOwned > 0) {
        balance += stockPrice;
        stocksOwned--;
        stockPrice -= Math.random() * 10;  // simulate price decrease
        stockPricesArray.push(stockPrice);
        transactions.push('sell');
        updateUI();
        updateChart();
    }
}

function updateChart() {
    let ctx = document.getElementById('stockChart').getContext('2d');
    if(window.myChart) {
        window.myChart.destroy();  // destroy previous chart instance if it exists
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: transactions,
            datasets: [{
                label: selectedCompany,
                data: stockPricesArray,
                backgroundColor: stockPricesArray.map(price => price < 100 ? 'red' : 'green'),
                borderColor: stockPricesArray.map(price => price < 100 ? 'red' : 'green'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

updateUI();
updateChart();