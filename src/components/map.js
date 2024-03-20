class Map extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .map{
            height: 100vh;
            width: 100%;
            background-color: hsla(0, 50%, 50%, 1)
          }
        </style>
        
        <div class="map">
          <div class="block">
          </div>
        </div>
      `
  }
}

customElements.define('map-component', Map)
