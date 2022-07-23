import { faker } from "@faker-js/faker";

var database = { item: [], category: [] };
var status = ["published", "draft"];

for (var i = 1; i <= 10; i++) {
  database.category.push({
    id: faker.database.mongodbObjectId(),
    title: faker.name.jobArea(),
    createAt: faker.date.between(
      "2020-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    ),
  });
}

for (var i = 1; i <= 10; i++) {
  let title = faker.lorem.sentence();
  let slug = faker.helpers.slugify(title);
  database.item.push({
    id: faker.database.mongodbObjectId(),
    title: title,
    slug: slug,
    status: faker.helpers.arrayElement(status),
    content: faker.lorem.paragraphs(5),
    date: faker.date.between(
      "2020-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    ),
    categoryId: faker.helpers.arrayElement(database.category).id,
  });
}

console.log(JSON.stringify(database));
