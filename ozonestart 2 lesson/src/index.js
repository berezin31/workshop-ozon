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
        })
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


    discountCheckbox.addEventListener('click', () => {
       cards.forEach((card) => {
            if (discountCheckbox.checked){
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.remove();
                   // card.parentNode.style.display = 'none';
                }
            } else {
                goods.appendChild(card.parentNode);
                //card.parentNode.style.display = '';
            }
        });
    });
//  фильтр по цене
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    function filterPrice(){
        cards.forEach((card) => {
           const cardPrice = card.querySelector('.card-price');
           const price = parseFloat(cardPrice.textContent);

           if((min.value && price < min.value) || (max.value && price > max.value)){
            card.parentNode.style.display = 'none';
            } else {
            card.parentNode.style.display = '';
            }
            
        });

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
    });
}
//end фильтр акции

toggleCheckbox();
toggleCart();
addCart();
actionPage();