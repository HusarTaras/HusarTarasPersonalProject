import '../styles/index.scss';

import { tarifs } from './constants';

let payments = [];
let payment = {};

const companies = document.getElementById('companies');
const savedPayments = document.getElementById('savedPayments');
const savedPaymentsSelector = document.querySelectorAll(`[id=${savedPayments.id}]`)[0];
const summaryTotal = document.getElementById('summaryTotal');
const summaryTotalSelector = document.querySelectorAll(`[id=${summaryTotal.id}]`)[0];
const meters = document.getElementById('meters');
const previous = document.getElementById('previous');
const current = document.getElementById('current');
const currentOnDate = document.getElementById('payment');
const thisForm = document.getElementsByClassName('center__form')[0];
const transactionsList = document.getElementsByClassName('transactions__list')[0];
const total = document.getElementsByClassName('price')[0];
const payButtom = document.getElementById('btn-pay');
const savePayment = () => {
    payments.push({
        id:payment.id,
        meterId:payment.meterId,
        current:payment.current,
        previous:payment.previous,
        currentOnDate:payment.currentOnDate,
        total:payment.total
    });
}
const clearPayments = () => {
    payments.splice(0, payments.length);
}
let prev_id = null;

companies.onclick = (event) => {
    const id = event.target.getAttribute('data-id');
    const element = document.querySelector(`[data-id=${id}]`);
    let prev_element = null;

    element.style = "background-color: #2684ff; color: #fff;";
    if (prev_id !== null) {
        prev_element = document.querySelector(`[data-id=${prev_id}]`)
        prev_element.style = "color: #253858;"
    };
    prev_id = id;
    payment.id = id;

};

meters.onchange = (event) => {
    const { value } = event.target;

    payment.meterId = value;
};

previous.oninput = (event) => {
    const { value } = event.target;
    const element = document.querySelector(`[id=${previous.id}]`);

    try {
        Number(value);
        payment.previous = value;
    } catch (e) {
        element.style = "background-color: #red; color: #fff;";
        console.log(e);
    }
}

current.oninput = (event) => {
    const { value } = event.target;
    const element = document.querySelector(`[id=${current.id}]`);

    try {
        Number(value);
        payment.current = value;
    } catch (e) {
        element.style = "background-color: #red; color: #fff;";
        console.log(e);
    }
}

currentOnDate.oninput = (event) => {
    const {value} = event.target;
    const element = document.querySelector(`[id=${currentOnDate.id}]`);

    try {
        Number(value);
        payment.currentOnDate = value;
    } catch (e) {
        element.style = "background-color: #red; color: #fff;";
        console.log(e);
    }
}

thisForm.onsubmit = (event) => {
    event.preventDefault();
    const savedPaymentsElements = savedPaymentsSelector.childNodes;
    const newPriceTotal = document.createElement("b");
    const oldPriceTotal = document.getElementById("price-total");
    let sumPaymentsTotal = 0;
    
    payment.total = (payment.current - payment.previous) * tarifs[`${payment.id}`];
    savePayment();

    const newElement = `
            <p class="right__payments-field">
              <label>
                <input type="checkbox" checked id="check-${payment.id}"/>
                <span>${payment.id}</span>
              </label>
            </p>`;
    savedPaymentsSelector.insertAdjacentHTML('afterbegin', newElement);
    const newElementTotal = `
            <li class="list__item">
                <p><span class="list__item-label">${payment.meterId}</span>
                  <span class="price">$ <b>${payment.total}</b></span>
                </p>
              </li>`;
    summaryTotalSelector.insertAdjacentHTML('afterbegin', newElementTotal);
    for (let i = 0; i < payments.length; i++) {
        sumPaymentsTotal = sumPaymentsTotal + payments[i].total;
    }
    newPriceTotal.setAttribute("id", "price-total");
    newPriceTotal.appendChild(document.createTextNode(sumPaymentsTotal.toString()));
    total.replaceChild(newPriceTotal, oldPriceTotal);

    for (let key in payment) {
        delete payment[key];
    }
}

thisForm.onreset = (event) => {
    event.preventDefault();
    clearPayments();
}

payButtom.onclick = (event) => {
    let newElementTransaction = '';
    event.preventDefault();
    for (let i = 0; i < payments.length; i++) {
        ((i) =>  {
            setTimeout(() => {
                let el = document.getElementById(`check-${payments[i].id}`).checked;
                if (el) {
                    if (payments[i].meterId && payments[i].id) {
                        console.log('ПЛАТІЖ ' + payments[i].id + ' ОПЛАЧЕНО');
                        newElementTransaction = `<li class="list__item">${payments[i].id}: Successful payment</li>`;
                    } else {
                        newElementTransaction = `<li class="list__item list__item-error">${payments[i].id}: Transaction error</li>`;
                    }
                    transactionsList.insertAdjacentHTML('afterbegin', newElementTransaction);
                }
            }, (i + 1) * 1000);
        })(i);
    }
}









