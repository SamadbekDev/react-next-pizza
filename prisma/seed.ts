import {prisma} from "./prisma-client";
import {hashSync} from 'bcrypt';
import * as process from "node:process";
import {categories, ingredients, products} from "./constants";
import {Prisma} from "@prisma/client";

async function resetSequences(prisma: any, tables: string[]) {
    for (const t of tables) {
        // NOTE: используем public schema и сохраняем двойные кавычки для чувствительных к регистру имён
        const sql = `
            SELECT setval(
                           pg_get_serial_sequence('public."${t}"', 'id'),
                           COALESCE((SELECT MAX(id) FROM "${t}"), 0) + 1,
                           false
                   );
        `;
        try {
            await prisma.$executeRawUnsafe(sql);
        } catch (err) {
            console.warn('Не удалось сбросить sequence для', t, err);
        }
    }
}

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
}

const generateProductItem = ({productId, pizzaType, size}: {
    productId: number,
    pizzaType?: 1 | 2,
    size?: 20 | 30 | 40
}) => {
    return {
        productId,
        price: randomDecimalNumber(50000, 100000),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {

    await prisma.user.createMany({
        data: [
            {
                fullName: 'User TT',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Test',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ]
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    // PRODUCTS (из constants)
    const dbCategories = await prisma.category.findMany();

    await prisma.product.createMany({
        data: products.map((p) => ({
            ...p,
            categoryId: dbCategories[p.categoryId - 1].id,
        })),
    });
    const pizzaCategoryId = dbCategories.find(c => c.name === 'Пиццы')!.id;

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: pizzaCategoryId,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: pizzaCategoryId,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: pizzaCategoryId,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    const dbProducts = await prisma.product.findMany();

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

            // Пицца "Сырная"
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

            // Пицца "Чоризо фреш"
            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

            // Остальные продукты
            ...dbProducts
                .filter(p => ![pizza1.id, pizza2.id, pizza3.id].includes(p.id))
                .map((p) => generateProductItem({productId: p.id})),
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '1111'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '2222'
            },
        ]
    })

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }
        }
    })
}

async function down() {
    await prisma.productItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.category.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.user.deleteMany();

    await resetSequences(prisma, [
        'User',
        'Category',
        'Cart',
        'CartItem',
        'Ingredient',
        'Product',
        'ProductItem'
    ]);
}


async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e)
    }
}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1)
    })