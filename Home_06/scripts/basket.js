

function basket() {
    const addToBasketButtons = document.querySelectorAll('.to_basket');
    const basketBottom = document.querySelector('.basket_bottom');
    const numberOfProduct = document.querySelector('.number_of_products');
    const totalPrice = document.querySelector('.total_price');

    let deleteBusketButton = document.querySelector('.delete_busket');
    

    const createBasket = () => {
        setBasketBottom();
        basketItems.forEach(basketItem => {
            addToBasket(basketItem);
        });
    }

    const setBasketBottom = () => {
        if (basketItems.length != 0) {
            const innerBasketBottom = `
            <button class="delete_busket">Очистить<br>корзину</button>
            <button class="make_order">Оформить<br>заказ</button>
            `;
            basketBottom.innerHTML = innerBasketBottom;  
            deleteBusketButton = document.querySelector('.delete_busket'); 
            deleteBusketButton.addEventListener('click', () => {
                document.querySelectorAll('.basket_card').forEach(card => {
                    removeFromBasket(card);
                });
            });
        } else {
            const innerBasketBottom = `<div class="empty_basket_text">Корзина пуста</div>`;
            basketBottom.innerHTML = innerBasketBottom;
        }
    };

    const addToBasket = (product) => {
        const productHtml = `
        <div class="basket_card" id = ${product.id}>
            <div class="basket_card_product">
                <a href="" class="basket_card_image scale"><img src="${product.imagePath}" alt="" class="basket_card_image"></a>
                <div class="info ">
                    <a href="" class="basket_name">${product.name}</a>
                    <div class="basket_price">${product.price} BR</div>
                </div>
        </div>
            <button class="basket_remove_button">Убрать из корзины</button>
        </div>
        `;
        document.querySelector('.basket_cards').insertAdjacentHTML('afterbegin',productHtml);
        basketItems.push(product);
        setBasketBottom();
        const removeFromBasketButton = document.querySelector('.basket_remove_button');
        removeFromBasketButton.addEventListener('click', () => 
            removeFromBasket(removeFromBasketButton.parentElement));
        numberOfProduct.textContent = basketItems.length;
        totalPrice.textContent = `${getTotalPrice()} BR`;
    }

    const removeFromBasket = (element) => {
        for (let i = 0; i < basketItems.length; i++) {
            if (element.id == basketItems[i].id) {
                basketItems.splice(i, 1);
                element.remove();
                numberOfProduct.textContent = basketItems.length;
                totalPrice.textContent = `${getTotalPrice()} BR`;
                return;
            }
        }
    }

    const getTotalPrice = () => {
        return basketItems.reduce((acc, next) => acc + Number(next.price), 0); 
    }
    
    addToBasketButtons.forEach(button => {
        button.addEventListener('click', () => 
        addToBasket(catalog[button.parentElement.parentElement.parentElement.getAttribute("id")]));
    });



    createBasket();
    
};

basket();