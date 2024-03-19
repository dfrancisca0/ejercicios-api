class CloseButton extends HTMLElement {
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
          .close-button{
            
          }
        </style>
        
        <div class="close-button">
          <button>
          </button>
        </div>
      `
  }
}

customElements.define('close-button-component', CloseButton)
