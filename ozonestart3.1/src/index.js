'use strict';
//чекбокс

function toggleCheckbox() {

    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(function (element) {
        element.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}


//енд чекбокс

//корзина
function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}


//end корзина 

//работа с корзиной
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');

        countGoods.textContent = cardsCart.length;

        let sum = 0;
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            console.log(price);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }


    }
}


//енд работа с корзиной

//фильтр  акции
function actionPage() {

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        goods = document.querySelector('.goods'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');  

        console.dir(cards[0]);

    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
   
    function filter(){
        cards.forEach((card) => {
           const cardPrice = card.querySelector('.card-price');
           const price = parseFloat(cardPrice.textContent);
           const discount = card.querySelector('.card-sale');

            if ((min.value && price < min.value) || (max.value && price > max.value)){
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
         
        });
        console.log(cards);
    }

// поиск

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)) {
               card.parentNode.style.display = 'none';
            } else {
               card.parentNode.style.display = '';
            }
        });
        search.value = '';
    });
}


//end фильтр акции
//получение данных с сервера

function getData() {
   const goodWrapper = document.querySelector('.goods');
   fetch('../db/db.json')
   .then((response) => {
    if (response.ok){     
        return response.json();
    } else {
      throw new Error ('Данные не были получены, ошибка:' + response.status);
    }
   })
   .then(data => console.log(data)) 
   .catch(err => {
     console.warn(err);
     goodsWrapper.innerHTML = '<div style="color:red; font-size:30px">Упс, что-то пошло не так!';

   });
}
 

//----енд получение данных
getData();

toggleCheckbox();
toggleCart();
addCart();
actionPage();