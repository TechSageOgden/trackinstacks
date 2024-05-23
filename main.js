const BUDGET_TOTAL = 1000

const totalElement = document.getElementById('total')
const descriptionInput = document.getElementById('description')
const amountInput = document.getElementById('amount')
const typeInput = document.getElementById('type')
const calcBtn = document.getElementById('calc-button')
const transactionDisplay = document.getElementById('transaction-list')

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

totalElement.innerText = USDollar.format(BUDGET_TOTAL)


let runningTotal = BUDGET_TOTAL
let descText = ""
let amountVal = 0
let type = -1

calcBtn.addEventListener('click', ev => {
    ev.preventDefault()
    if (typeInput.value === "1") {
        type = 1
    } else {
        type = -1
    }
    parseTransaction(type, descText, amountVal)

    descriptionInput.value = ""
    amountInput.value = 0
})

descriptionInput.addEventListener('input', ev => {
    descText = descriptionInput.value
})

amountInput.addEventListener('input', ev => {
    amountVal = amountInput.value
})

const parseTransaction = (type, desc, amt) => {
    runningTotal += amt * type
    totalElement.innerText = USDollar.format(runningTotal)

    let colorClass = 'green'
    if (type == -1) {
        colorClass = 'red'
        
    }

    if (runningTotal <= 0) {
        totalElement.classList.add('red')
    } else if (runningTotal > 0) {
        totalElement.classList.remove('red')
    }

    transactionDisplay.innerHTML += `
    <div class="transaction-group">
            <div class="transaction-desc">
                <p>${descText}</p>
            </div>
            <div class="transaction-amount">
                <p class="${colorClass}">${USDollar.format(amountVal)}</p>
            </div>
        </div>`
}