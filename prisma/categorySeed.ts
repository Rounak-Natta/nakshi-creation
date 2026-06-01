import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategory(
name: string,
slug: string,
parentId?: string
) {
return prisma.category.upsert({
where: {
slug,
},

update: {},

create: {
  name,
  slug,
  parentId,
},


});
}

async function main() {
console.log(
"Seeding categories..."
);

//
// MEN
//

const men =
await createCategory(
"Men",
"men"
);

await Promise.all([
createCategory(
"Dhoti",
"dhoti",
men.id
),


createCategory(
  "Kurta",
  "kurta",
  men.id
),

createCategory(
  "Kurta Dhoti Set",
  "kurta-dhoti-set",
  men.id
),

createCategory(
  "Nehru Jacket",
  "nehru-jacket",
  men.id
),

createCategory(
  "Sherwani",
  "sherwani",
  men.id
),

createCategory(
  "Shirt",
  "shirt",
  men.id
),


]);

//
// WOMEN
//

const women =
await createCategory(
"Women",
"women"
);

await Promise.all([
createCategory(
"Kurti",
"kurti",
women.id
),


createCategory(
  "Kurti Set",
  "kurti-set",
  women.id
),

createCategory(
  "Bottom",
  "bottom",
  women.id
),


]);

//
// SAREE
//

await createCategory(
"Saree",
"saree"
);

//
// ACCESSORIES
//

const accessories =
await createCategory(
"Accessories",
"accessories"
);

await Promise.all([
createCategory(
"Jewellery",
"jewellery",
accessories.id
),


createCategory(
  "Bags",
  "bags",
  accessories.id
),


]);

//
// FORMAL
//

const formal =
await createCategory(
"Formal",
"formal"
);

await Promise.all([
createCategory(
"Men Shirt",
"men-shirt",
formal.id
),

createCategory(
  "Women Shirt",
  "women-shirt",
  formal.id
),


]);

console.log(
"Categories seeded successfully."
);
}

main()
.catch((error) => {
console.error(error);


process.exit(1);


})
.finally(async () => {
await prisma.$disconnect();
});
