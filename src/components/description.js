class Description extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch('/src/data/associations.json')
    this.data = await response.json
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .description-box {
            border-color: hsla(0, 50%, 50%, 1);
            border-radius: 10px 
          }

          .button-bar {
            background-color: hsla(0, 50%, 50%, 1);
            color: hsla(0, 100%, 100%, 1);
            border-radius: 10px 10px 0 0
          }

          button {

          }

        </style>
        
        <div class="description-box"></div>
      `

    const descriptionBox = this.shadow.querySelector('.description-box')

    const buttonBar = document.createElement('div')
    buttonBar.classList.add('button-bar')
    descriptionBox.appendChild(buttonBar)

    const barElement = document.createElement('button')
    barElement.innerText = '< Volver'
    buttonBar.appendChild(barElement)

    this.data.forEach(element => {
      const itemTitle = document.createElement('div')
      itemTitle.classList.add('item-title')
      descriptionBox.appendChild(itemTitle)

      const titleElement = document.createElement('h2')
      titleElement.innerText = element.name
      itemTitle.appendChild(titleElement)

      const itemDescription = document.createElement('div')
      itemDescription.classList.add('item-description')
      descriptionBox.appendChild(itemDescription)

      const descriptionElement = document.createElement('p')
      descriptionElement.innerText = element.goal
      itemDescription.appendChild(descriptionElement)

      const itemLocation = document.createElement('div')
      itemLocation.classList.add('item-location')
      descriptionBox.appendChild(itemLocation)

      const locationElement = document.createElement('p')
      locationElement.innerText = element.address
      itemLocation.appendChild(locationElement)
    })
  }
}

customElements.define('description-component', Description)
