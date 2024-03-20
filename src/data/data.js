const { reverse } = require('dns')

(async () => {
  const fs = require('fs')

  const towns = ['mallorca', 'mallorquina', 'mallorquinista', 'mallorquins', 'alaro', 'alcudia', 'algaida', 'andratx', 'ariany', 'arta', 'bahia grande', 'bahia grande (llucmajor)', 'banyalbufar', 'bendinat', 'binissalem', 'biniali - sancelles',
    'buger', 'bunyola', 'caimari', 'cala bona (son servera)', 'cala mesquida', 'cala millor', 'cala ratjada', 'calvia', 'calvia (cas catala)', 'calvia (peguera)', 'campanet', 'can pastilla', "ca'n pastilla", 'canyamel', 'campos', 'camp de mar', 'cas capelles - marratxi', 'cas concos', 'can picafort', "ca'n picafort", "ca'n picafort (santa margalida)", 'capdepera', 'coll den rebassa', 'colonia sant jordi', 'colonia de sant jordi', 'colonia de sant pere',
    'consell', "costa d'en blanes", "costa d'en blanes (calvia)", "costa d'en blanes (portals nous)", 'costitx', 'deia', 'deya', 'el arenal', 'el toro', 'es capdella', 'escorca', 'es fornas', 'es llombards', 'es pil·lari', 'esporles', 'establiments', 'estellencs', 'es jonquet', 'es pla de na tesa', 'felanitx', 'fornalutx', 'galilea', 'genova', 'inca', 'la cabaneta - marratxi', 'la vileta', 'lloret de vistalegre', 'lloret', 'lloseta',
    'llubi', 'llucmajor', 'llucmajor (sa torre)', 'maioris decima llucmajor', 'magalluf', 'manacor', 'mancor de la vall', 'maria de la salut', 'marivent', 'marratxi', 'montuiri', 'moscari',
    'muro', 'paguera', 'paguera (calvia)', 'palma', 'palma (camp rodo)', 'palma de mallorca', 'palma  de mallorca', 'palma (establiments)', 'palmesana', 'palma nova', 'palmanova', 'palmañola', 'palmayola', 'palmanyola', 'pla de ne tesa', 'platges de muro', 'playa de palma', 'petra', 'pla de na tesa', 'portol', 'porto colom', 'porto pi', 'porto-pi', 'pol·ligon marratxi', 'poligono de levante', 'poligon son castell', 'pollenca', 'pollensa', "pont d'inca", 'porreres', 'portals nous', 'port de soller', 'portocolom', 'porto cristo', 'portopetro', 'puerto de soller', "port d'andratx", 'port de pollenca',
    'porto petro', "puerto d'alcudia", 'puig de ros', 'puigpunyent', "s'alqueria blanca-santanyi", "s'arraco", "s'arenal", "s'aranjassa", 'sa casa blanca', 'sa pobla', 'sa cabaneta', 'sant agusti', 'san telmo', 'santelm', 'sant joan', 'sant llorenc des cardassar', 'sant llorenc des cardessar',
    'santa eugenia', 'san jordi', 'sant jordi', 'santa margalida', 'santa maria del cami', 'santa maria', 'santanyi', 'santa ponca', 'santa ponsa-calvia', 'santa ponca - calvia', 'santa ponca (calvia)', 'santa ponsa', 'santa ponsa (calvia)', 'sant elm', 'sa torre', 'sa torre-llucmajor', 'sa vileta (palma)', 'secar de la real', 'selva', 'sencelles', 'ses salines', "s'horta", "s'horta-felanitx", "s'horta (felanitx)", "s'illot", "s'indioteria", 'sineu', 'sol de mallorca', 'soller', 'son caliu (calvia)', 'son carrio', 'son ferriol', 'son ferrer - calvia', 'son macia', 'son mercadal now', 'son rapinya', 'son rullan', 'son serra', 'son serra de marina',
    'son ferrer', 'son macia (manacor)', 'son sardina', 'son servera', 'son serrvera', 'urb. bahia grande', 'urbanitzacio sant marcal', 'valldemossa', 'valldemosa', 'villafranca', 'vilafranca de bonany']

  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD')
  const associations = await response.json()

  const rawData = associations.data

  const structuredData = rawData.map(([sid, id, position, createdAt, createdMeta, updatedAt, updatedMeta, meta, nif, registerNum, registerDate, name, address, town, goal, scope]) => {
    const association = {
      name,
      town,
      address,
      goal,
      registerDate
    }

    return association
  })

  // const currentYear = new Date().getFullYear()

  // filteredData = structuredData.filter(element => {
  //   const yearDifference = currentYear - element.year
  //   return yearDifference <= 10
  // })

  const tenYearsAgo = new Date()
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)

  const { filteredData, discardedData } = structuredData.reduce((acc, association) => {
    const normalizedTown = association.town ? association.town.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : null
    const normalizedAssociationName = association.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const isRecent = new Date(association.registerDate) > tenYearsAgo

    if (normalizedTown && towns.includes(normalizedTown) && isRecent) {
      acc.filteredData.push(association)
    } else if (towns.some(town => normalizedAssociationName.includes(town)) && isRecent) {
      acc.filteredData.push(association)
    } else {
      if (isRecent) {
        acc.discardedData.push(association)
      }
    }

    return acc
  }, { filteredData: [], discardedData: [] })

  fs.writeFileSync('associations.json', JSON.stringify(filteredData, null, 2))
  fs.writeFileSync('discarded.json', JSON.stringify(discardedData, null, 2))

  // filteredData = filteredData.filter(element => {
  //   if (element.town && towns.includes(element.town)) {
  //     return element
  //   }
  //   if (!element.town) {
  //     for (const name in element.name) {
  //       towns.some(town => {
  //         return name.includes(town)
  //       })

  //       if (name) {
  //         return element
  //       }
  //     }
  //   }
  // })

  console.log(filteredData)

  // reducedData = filteredData.map(element => {
  //   return (element.name, element.goal)
  // })

  // let chunks = []
  // let chunkSize = 120

  // for (let chunkCount = 0; chunkCount < reducedData.length; chunkCount += chunkSize) {
  //   let chunk = reducedData.slice(chunkCount, chunkCount + chunkSize)
  //   chunks.push(chunk)
  // }

  // console.log(chunks)
})()
