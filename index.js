const request = require('request')

function getPokemon(error,response,body){
    //console.log(response.statusCode)
    const data=JSON.parse(body)

    const personajesMap=data.types.map((personaje)=>{
        return personaje.type.name
    })
    console.log(personajesMap)
}

function getAutor(error,response,body){
    //console.log(response.statusCode)
    const data=JSON.parse(body)

    const autorMap=data.docs.map((autor)=>{
        return autor.title_suggest
    })
    console.log(autorMap)
}

function getClima(error,response,body){
    //console.log(response.statusCode)
    const data=JSON.parse(body)

    const texto = `El ${data.forecast.forecastday[0].date} clima: ${data.forecast.forecastday[0].day.avgtemp_c}C`

    console.log(texto)

}

function getClimaActual(error,response,body){
    //console.log(response.statusCode)
    const data=JSON.parse(body)

    const texto = `Ciudad: ${data.location.name}
Clima actual: ${data.forecast.forecastday[0].day.avgtemp_c}C`

    console.log(texto)

}


function pokemon(nombre){
    console.log('El pokemon '+nombre.toUpperCase()+' es de tipo:')
    request('https://pokeapi.co/api/v2/pokemon/'+nombre+'/',getPokemon)
}

function autor(nombre){
    console.log('Los libros del autor '+nombre.toUpperCase()+' son:')
    request('http://openlibrary.org/search.json?author='+nombre+'/',getAutor)
}



function clima(fecha){

    let fechaT = new Date(fecha)
    const fecha1 = `${fechaT.getFullYear().toString()}-${(fechaT.getMonth()+1).toString()}-${(fechaT.getDate()-0).toString()}`
    const fecha2 = `${fechaT.getFullYear().toString()}-${(fechaT.getMonth()+1).toString()}-${(fechaT.getDate()-1).toString()}`
    const fecha3 = `${fechaT.getFullYear().toString()}-${(fechaT.getMonth()+1).toString()}-${(fechaT.getDate()-2).toString()}`
    const fecha4 = `${fechaT.getFullYear().toString()}-${(fechaT.getMonth()+1).toString()}-${(fechaT.getDate()-3).toString()}`
    const fecha5 = `${fechaT.getFullYear().toString()}-${(fechaT.getMonth()+1).toString()}-${(fechaT.getDate()-4).toString()}`   
    
    const url = 'http://api.weatherapi.com/v1/history.json?key=61f747296a8845fba8a164817201105&q=Guatemala&dt='

    request(url+fecha+'',getClimaActual)
    request(url+fecha1+'',getClima)
    request(url+fecha2+'',getClima)
    request(url+fecha3+'',getClima)
    request(url+fecha4+'',getClima)
    request(url+fecha5+'',getClima)
}

//================= editar texto para mostrar funciones ===========================//


//pokemon('gengar')//    ----> escribir el nombre del pokemon para saber sus tipos
//autor('verne')//       ----> escribir el nombre del autor para ver sus libros
clima('2020-05-11')//    ----> escribir la fecha en formato año-mes-dia para obtener el clima
