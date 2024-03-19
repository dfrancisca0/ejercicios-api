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
