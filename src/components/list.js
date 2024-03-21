class List extends HTMLElement {
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
            height: 0;
            max-height: 0;
            width: 100%;
            margin: .5rem 0 1rem 0;
            gap: 1rem;
            overflow: hidden;
            transition: height 0.5s;
          }

          .item.active .item-body{
            height: max-content;
          }

          .item-content {
            display: flex;
            flex-direction: column;
            padding: 1rem 0;
            gap: 1rem
          }

          .item-content h2, p {
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
      descriptionElement.innerText = element.goal
      itemDescription.appendChild(descriptionElement)

      const itemLocation = document.createElement('div')
      itemLocation.classList.add('item-location')
      itemBody.appendChild(itemLocation)

      const locationElement = document.createElement('p')
      locationElement.innerText = element.address
      itemLocation.appendChild(locationElement)

      item.addEventListener('click', () => {
        this.shadow.querySelector('.item.active')?.classList.remove('active')
        item.classList.add('active')
        closeButton.classList.add('active')

        const activeButton = this.shadow.querySelector('.close-button.active')

        if (!activeButton) {
          this.shadow.closest('.item').querySelector('.close.button')
          closeButton.classList.remove('active')
        }
      })
    })

    // this.shadow.querySelector('.list').scrollTo(0, 0)
    // item.scrollIntoView({ behavior: 'smooth' })
  }
}

customElements.define('list-component', List)
