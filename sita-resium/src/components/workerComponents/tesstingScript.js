


const obj1 = {
    "uid": 1,
    "type": "scena",
    "name": "testScena",
    "layer":[
        {
            "id":1,
            "uid":"001",
            "type": "layer",
            "name": "testLayer!",
            "path":"/VDC_4326.geojson",
            "className":"Тестовый Класс",
            "sudClassName":"Тестовый ПодКласс",
            "defaultChecked": true
        },
        {
            "id":2,
            "uid":"002",
            "type": "layer",
            "name": "Дороги",
            "path":"/road_4326.geojson",
            "defaultChecked": false
        },
        {
            "id":3,
            "uid":"003",
            "type": "layer",
            "name": "Здания",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс",
            "sudClassName":"Тестовый ПодКласс",
            "defaultChecked": true
        }
        ,
        {
            "id":4,
            "uid":"003",
            "type": "layer",
            "name": "Здания2",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс 2",
            "defaultChecked": true
        }
        ,
        {
            "id":5,
            "uid":"003",
            "type": "layer",
            "name": "Здания3",
            "path":"/bild_4326.geojson",
            "className":"Тестовый Класс",
            "defaultChecked": true
        }
    ]
}

const arr = obj1.layer
const arr2=[1,1,2,3,6,5,6,6,5,8,12]
let arrN=arr2.filter((x,i,a)=>a.indexOf(x)===i)
console.log(arrN)