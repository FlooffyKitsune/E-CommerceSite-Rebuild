let products = [
    {
        name: 'Neko Phone',
        tag: 'nekophone',
        price: 699,
        inCart: 0
    },
    {
        name: 'Neko Watch',
        tag: 'nekowatch',
        price: 159,
        inCart: 0
    }
]

window.onload = function() {
    let phoneCart = document.getElementsByClassName('btn-phone');
    let watchCart = document.getElementsByClassName('btn-watch');
    let returnButtons = document.getElementsByClassName('back-to-site');

    for(let i = 0; i < phoneCart.length; i++) {
        var phoneButton = phoneCart[i];
        phoneButton.onclick = function() {
            cartNumbers(products[0]);
            totalCost(products[0]);
        }
    }

    for(let i = 0; i < watchCart.length; i++) {
        var watchButton = watchCart[i];
        watchButton.onclick = function() {
            cartNumbers(products[1]);
            totalCost(products[1]);
        }
    }

    for(let i = 0; i < returnButtons.length; i++) {
        var returnButton = returnButtons[i];
        returnButton.onclick = function() {
            window.localStorage.clear();
        }
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log(product);
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers +  1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCard() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.stocks');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="stock">
                <i class="fas fa-times-circle"></i>
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
            <i class="fas fa-chevron-circle-left"></i>
            <span>${item.inCart}</span>
            <i class="fas fa-chevron-circle-right"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h3 class="basketTotalTitle">
                Purchase Total
            <h3/>
            <h3 class="basketTotal">
                $${cartCost}.00
            </h3>
        </div>
        `;
    }
}

onLoadCartNumbers();
displayCard();