class Row extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.columns = this.getAttribute('columns') || 1
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .row{
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(${this.columns}, 1fr);
          }
        </style>
        <div class="row">
          <slot></slot>
        </div>
      `
  }
}

customElements.define('row-component', Row)
