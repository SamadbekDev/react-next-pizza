This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Работа с Prisma
🔄 1. Синхронизация схемы Prisma с базой
```bash
npm run prisma:push
````

Эта команда:

обновляет БД согласно schema.prisma

не создаёт миграции

применяется в разработке

🧭 2. Prisma Studio (графический интерфейс)
```bash
npm run prisma:studio
```

Позволяет просматривать и редактировать данные в таблицах.

🌱 3. Seed (наполнение БД начальными данными)
```bash
npm run prisma:seed
```

Эта команда выполняет файл prisma/seed.ts и:

очищает таблицы (если в seed предусмотрено)

создаёт категории, ингредиенты и продукты

вставляет начальные данные для разработки