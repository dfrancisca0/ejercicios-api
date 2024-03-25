import { store } from '../redux/store.js'
import { setPinElement } from '../redux/map-slice.js'

class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      const association = this.data.find(element => currentState.map.pinElement.name === element.name)

      if (association) {
        const items = this.shadow.querySelectorAll('.item')
        items.forEach(item => {
          if (item.dataset.name === association.name) {
            item.classList.add('active')
            item.scrollIntoView({ behavior: 'smooth', block: 'start' })

            const closeButton = item.querySelector('button')
            if (closeButton) {
              closeButton.classList.add('active')
            }
          } else {
            item.classList.remove('active')

            const closeButton = item.querySelector('button')
            if (closeButton) {
              closeButton.classList.remove('active')
            }
          }
        })
      }
    })

    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch('/src/data/geocodedData.json')
    this.data = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>

          h2, p {
            font-weight: normal;
            padding: 0;
            margin: 0
          }

          .list{
            height: 65vh;
            width: 90%;
            padding: 0 .5rem 0 2rem;
            overflow-Y: scroll;
            gap: 0.5rem
          }

          .list::-webkit-scrollbar {
            width: 15px
          }

          .list::-webkit-scrollbar-track {
            background-color: transparent
          }

          .list::-webkit-scrollbar-thumb {
            background-color: hsla(0, 50%, 50%, .7);
            border-radius: 1px
          }

          .item {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
          }
      
          .item-header {
            display:flex;
            justify-content: space-between;
            height: 2rem;
            padding: 0.5rem;
            background-color: hsla( 0, 0%, 60%, .1);
            border-radius: 5px;
            cursor: pointer;
          }

          .item.active .item-header, .item-header:hover {
            background-color: hsla(0, 50%, 50%, 1);
            color: hsla(0, 100%, 100%, 1)
          }

          .item.active {
            border: 1px solid hsla(0, 50%, 50%, 1);
            border-radius: 10px;
            margin: 0 0 1rem 0
          }

          .item.active .item-header {
            border-radius: 5px 5px 0 0;
          }

          .item-header h2 {
            font-size: 1rem;
            font-weight: bold;
            
          }
          .item-body {
            display: flex;
            flex-direction: column;
            max-height: 0;
            width: 100%;
            margin: .5rem 0 1rem 0;
            gap: 1rem;
            overflow: hidden;
            transition: height 0.5s;
          }

          .item.active .item-body{
            max-height: max-content;
          }

          .item-body h2, p {
            color: hsla(0, 0%, 0%, 1);
            padding: 0 1rem;
          }

          .button-bar {
            display: flex;
            justify-content: right;
            height: 2rem;
            padding: 0 2rem;
            background-color: hsla(0, 50%, 50%, 1);
          }

          button {
            display: none;
            border: none;
            background-color: hsla(0, 50%, 50%, 1);
            color: hsla(0, 100%, 100%, 1);
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
          }

          button.active {
            display: block
          }

        </style>
        
        <div class="list"></div>
      `

    const itemsList = this.shadow.querySelector('.list')

    this.data.forEach(element => {
      const item = document.createElement('div')
      item.classList.add('item')
      item.dataset.name = element.name
      itemsList.appendChild(item)

      const itemHeader = document.createElement('div')
      itemHeader.classList.add('item-header')
      item.appendChild(itemHeader)

      const headerTitle = document.createElement('h2')
      headerTitle.innerText = element.name
      itemHeader.appendChild(headerTitle)

      const closeButton = document.createElement('button')
      closeButton.innerText = '< Volver'
      itemHeader.appendChild(closeButton)

      const itemBody = document.createElement('div')
      itemBody.classList.add('item-body')
      item.appendChild(itemBody)

      const itemDescription = document.createElement('div')
      itemDescription.classList.add('item-description')
      itemBody.appendChild(itemDescription)

      const descriptionElement = document.createElement('p')
      descriptionElement.innerText = element.goals
      itemDescription.appendChild(descriptionElement)

      const itemLocation = document.createElement('div')
      itemLocation.classList.add('item-location')
      itemBody.appendChild(itemLocation)

      const locationElement = document.createElement('p')
      locationElement.innerText = element.address
      itemLocation.appendChild(locationElement)

      item.addEventListener('click', () => {
        const items = itemsList.querySelectorAll('.item')
        items.forEach(item => {
          item.classList.remove('active')
          const closeButton = item.querySelector('button')
          if (closeButton) {
            closeButton.classList.remove('active')
          }
        })

        item.classList.add('active')
        const closeButton = item.querySelector('button')
        if (closeButton) {
          closeButton.classList.add('active')
        }

        item.scrollIntoView({ behavior: 'smooth', block: 'start' })

        store.dispatch(setPinElement(element))
      })

      closeButton.addEventListener('click', () => {
        item.remove()
        closeButton.remove()
        document.querySelector('map-component').resetMap()
      })
    })
  }
}

customElements.define('list-component', List)
