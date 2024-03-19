class Prompt extends HTMLElement {
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
          .prompt{
            
          }
        </style>
        
        <div class="prompt">
          <form>
          </form>
        </div>
      `
  }
}

customElements.define('prompt-component', Prompt)
