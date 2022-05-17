//載入express
const express = require('express')
const port = 3000
const app = express()
//載入express-handlebars 樣本引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 載入restaurant.json檔案
const restaurantList = require('./restaurant.json')
//設定靜態檔案
app.use(express.static("public"))

//設定路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results})
})

//設定每個餐廳資訊
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params.restaurant_id', req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
})


//設定餐廳名字和類別搜尋找到特定的餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter( restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword})
})


app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})