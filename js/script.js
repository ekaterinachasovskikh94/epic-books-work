ready(function(){


  // В этом месте должен быть написан ваш код
let cardsHTML = '';

function createCardHTML(card) {
  return `<tr class="cart__product">
                <td class="cart__col-1">
                  <img class="cart__item-img" src="img/${card.uri}.jpg">
                </td>
                <td class="cart__col-2">
                  <div class="cart__item-name">${card.name}</div>
                </td>
                <td class="cart__col-3">
                  <div class="field-num  field-num--bg-tran">
                    <span class="field-num__input-wrap">
                      <button class="field-num__btn-minus" type="button">-</button>
                      <input class="field-num__input" type="number" value="1" step="1" min="0"/>
                      <button class="field-num__btn-plus" type="button">+</button>
                    </span>
                  </div>
                </td>
                <td class="cart__col-4">
                  <span class="cart__item-price">${card.price}₽</span>
                </td>
                <td class="cart__col-5">
                  <button class="close cart__product-del-btn" type="button">
                    <svg width="16" height="16">
                      <use xlink:href="#close"></use>
                    </svg>
                  </button>
                </td>
              </tr>`;
}

for (let book of books) {
  cardsHTML = cardsHTML + createCardHTML(book);
}

document.getElementById('js-cart__table').innerHTML = cardsHTML;


// let closeProduct = document.querySelectorAll('cart__product');

// for (let i = 0, j = closeProduct.length; i < j; i++) {
//     closeProduct[i].addEventListener('click', function(e) {
//         if (hasClass(e.target, 'cart__product-del-btn')) {
//             this.classList.toggle('cart__product_close');
//         }
//     })
// }

function cardCounter(input, plus, minus) {
  let numInput = document.querySelector(input);

  let btnPlus = document.querySelector(plus);
  btnPlus.addEventListener('click', function () {
      numInput.value++;
  });

  let btnMinus = document.querySelector(minus);
  btnMinus.addEventListener('click', function () {
      numInput.value--;
      if (numInput.value <= 1) {
        numInput.value = 1
      }
  });

  numInput.onchange = function() {
     if (numInput.value <= 1) {
        numInput.value = 1
      }
  }
}

cardCounter('.field-num__input', '.field-num__btn-plus', '.field-num__btn-minus');



    // let count = 1;
    // let countEl = document.getElementById(".field-num__input");
    // function plus(){
    //     count++;
    //     countEl.value = count;
    // }
    // function minus(){
    //   if (count > 1) {
    //     count--;
    //     countEl.value = count;
    //   }  
    // }


  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
