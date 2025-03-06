import { URL } from "./create-login-file.cy";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

describe('Save full order response to fixture without authorization', () => {
  beforeEach(() => {
    // Мокируем запросы
    cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', `${URL}/orders`, { fixture: 'successOrder.json' }).as('createOrder');
    cy.intercept('GET', `${URL}/api/orders/*`, { fixture: 'orderDetails.json' }).as('getOrderDetails');
  });

  it('Should save full order response to fixture', function () {
    // Шаг 1: Загрузка ингредиентов из файла
    cy.fixture('ingredients').then((ingredients: { success: boolean; data: Ingredient[] }) => {
      const ingredientIds = ingredients.data.map((ingredient: Ingredient) => ingredient._id);
      console.log('ID ингредиентов:', ingredientIds); // Логируем ID ингредиентов

      // Шаг 2: Создание заказа без авторизации
      cy.request({
        method: 'POST',
        url: `${URL}/orders`,
        body: {
          ingredients: ingredientIds,
        },
        failOnStatusCode: false
      }).then((response) => {
        console.log('Ответ сервера:', response); // Логируем ответ сервера

        if (response.status === 403 || response.status === 401) {
          throw new Error('Ошибка создания заказа: требуется авторизация');
        }

        expect(response.status).to.eq(200); // Проверка успешного создания заказа

        // Шаг 3: Получение полной информации о заказе
        const orderNumber = response.body.order.number;
        cy.request({
          method: 'GET',
          url: `${URL}/orders/${orderNumber}`,
          failOnStatusCode: false
        }).then((orderResponse) => {
          console.log('Полная информация о заказе:', orderResponse); 

          if (orderResponse.status === 404) {
            throw new Error('Заказ не найден');
          }

          expect(orderResponse.status).to.eq(200); 

          // Сохранение ответа в файл
          cy.writeFile('cypress/fixtures/successOrder.json', orderResponse.body);
        });
      });
    });
  });
});