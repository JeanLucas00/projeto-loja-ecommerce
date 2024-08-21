document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 200) {
            // Rolando para baixo
            header.classList.add('hidden');
        } else {
            // Rolando para cima
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });
});

//SLIDE DE NOVIDADES

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });
});

//ADICIONAR AO CARRINHO
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de "Adicionar ao Carrinho"
    var addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Inicializa o contador de itens no carrinho a partir do localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsCount = cartItems.length;

    // Atualiza o contador na sacola ao carregar a página
    var sacolaCount = document.getElementById('sacola-count');
    if (sacolaCount) {
        sacolaCount.textContent = cartItemsCount;
    }

    // Função para adicionar produto ao carrinho
    function addToCart(productName) {
        // Adiciona o produto ao carrinho (aqui você pode implementar sua lógica específica)
        cartItemsCount++;

        // Atualiza o contador na sacola
        if (sacolaCount) {
            sacolaCount.textContent = cartItemsCount;
        }

        // Armazena o produto selecionado no localStorage
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: productName });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Atualiza o contador na sacola e na variável local
    cartItemsCount = cartItems.length;
    if (sacolaCount) {
        sacolaCount.textContent = cartItemsCount;
    }
}

    // Adiciona um ouvinte de evento de clique a cada botão de "Adicionar ao Carrinho"
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Obtém o nome do produto associado ao botão
            var productName = button.parentElement.querySelector('h3').textContent.trim();

            // Chama a função para adicionar o produto ao carrinho
            addToCart(productName);
        });
    });
});

// Função para mostrar a janela pop-up com os itens do carrinho
function showPopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'block';

    // Atualiza a lista de itens do carrinho
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = ''; // Limpa a lista antes de atualizar

    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(function(item) {
            var listItem = document.createElement('li');
            listItem.textContent = "Produto: " + item.name;
            cartItemsList.appendChild(listItem);
        });
    } else {
        var listItem = document.createElement('li');
        listItem.textContent = "Carrinho vazio";
        cartItemsList.appendChild(listItem);
    }
}

// Função para ocultar a janela pop-up
function hidePopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
}

// Adiciona um ouvinte de evento de mouseenter ao botão da sacola
var sacolaButton = document.querySelector('.sacola button');
if (sacolaButton) {
    var popupTimeout; // Variável para armazenar o temporizador

    sacolaButton.addEventListener('mouseenter', function() {
        // Chama a função para mostrar a janela pop-up com os itens do carrinho
        showPopup();

        // Configura o temporizador para ocultar a janela após 5 segundos (5000 milissegundos)
        popupTimeout = setTimeout(function() {
            hidePopup();
        }, 5000); // Altere este valor para ajustar o tempo de exibição (em milissegundos)
    });

    // Adiciona um ouvinte de evento de mouseleave ao botão da sacola
    sacolaButton.addEventListener('mouseleave', function() {
        // Cancela o temporizador se o mouse sair do botão antes que a janela seja ocultada
        clearTimeout(popupTimeout);
    });
}

// Adiciona um ouvinte de evento de clique ao botão "Fechar" na janela pop-up
var closePopupButton = document.getElementById('closePopupButton');
if (closePopupButton) {
    closePopupButton.addEventListener('click', function() {
        // Chama a função para ocultar a janela pop-up
        hidePopup();
    });
}

// Função para limpar o carrinho
function clearCart() {
    localStorage.removeItem('cartItems'); // Remove todos os itens do localStorage
    hidePopup(); // Oculta a janela pop-up

    // Zera o contador de itens no carrinho
    cartItemsCount = 0;
    var sacolaCount = document.getElementById('sacola-count');
    if (sacolaCount) {
        sacolaCount.textContent = cartItemsCount;
    }

    // Atualiza o contador na sacola ao carregar a página
    var sacolaCount = document.getElementById('sacola-count');
    if (sacolaCount) {
        sacolaCount.textContent = cartItemsCount;
    }
}

// Adiciona um ouvinte de evento de clique ao botão "Limpar Carrinho"
var clearCartButton = document.getElementById('clearCartButton');
if (clearCartButton) {
    clearCartButton.addEventListener('click', function() {
        // Chama a função para limpar o carrinho
        clearCart();
    });
}

// Adiciona um ouvinte de evento de mouseleave à janela pop-up
var popupContainer = document.getElementById('popupContainer');
if (popupContainer) {
    popupContainer.addEventListener('mouseleave', function(event) {
        // Verifica se o mouse está dentro da janela pop-up ou na área da sacola
        if (!event.relatedTarget || !popupContainer.contains(event.relatedTarget)) {
            // Se o mouse não estiver na janela pop-up, oculta a janela
            hidePopup();
        }
    });
}

// REDIRECIONA O CLIENTE PARA O WHATSAPP COM A LISTA DE ITENS
function redirectToWhatsApp() {
    // Obtém os itens do carrinho do localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Verifica se há itens no carrinho
    if (cartItems && cartItems.length > 0) {
        // Cria a mensagem com a lista de produtos
        var message = "Olá, gostaria de fazer um pedido com os seguintes produtos:";
        cartItems.forEach(function(item) {
            message += "\n- Produto: " + item.name;
        });

        // Formata a mensagem para a URL do WhatsApp
        var formattedMessage = encodeURIComponent(message);

        // Redireciona para o WhatsApp com a mensagem pré-preenchida em uma nova aba
        window.open("https://api.whatsapp.com/send?phone=19989721906&text=" + formattedMessage, '_blank');
    } else {
        // Se o carrinho estiver vazio, você pode exibir uma mensagem ou tomar outra ação
        alert("Seu carrinho está vazio. Adicione produtos antes de prosseguir.");
    }
}

// Adiciona um ouvinte de evento de clique ao ícone do carrinho
var sacolaButton = document.querySelector('.sacola button');
if (sacolaButton) {
    sacolaButton.addEventListener('click', function() {
        // Chama a função para redirecionar para o WhatsApp com a lista de produtos do carrinho
        redirectToWhatsApp();
    });
}