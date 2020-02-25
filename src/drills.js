require('dotenv').config()
const knex = require('knex')

const knexInstance = knex ({
    client: 'pg',
    connection: process.env.DB_URL
})

function searchName(searchTerm) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchName(Bacon)

function paginateProducts(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber -1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateProducts(2)

function addedAfterDate(daysAgo) {
    knexInstance
        .select('*')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
            )
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })  
}

addedAfterDate(7)

function totalCostByCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

totalCostByCategory()

console.log('knex and driver installed correctly');