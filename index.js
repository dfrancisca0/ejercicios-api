(async () => {

  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD');
  const associations = await response.json();

  rawData = associations.data

  structuredData = rawData.map(element => {
    const date = new Date(element[10])
    const year = date.getFullYear()

    const association = [`Nombre: ${element[11]}`, `Población: ${element[13]}`, `Dirección: ${element[12]}`, `Objetivo: ${element[14]}`, `Fecha de creación: ${year}`]

    return association
  })

  const currentYear = new Date().getFullYear()

  filteredData = structuredData.filter(element => {
    const date = new Date(element[4].split(': ')[1])
    const year = date.getFullYear()
    const yearDifference = 2024 - year
    return yearDifference <= 10 && yearDifference >= 0
  })

  console.log(filteredData)

})();