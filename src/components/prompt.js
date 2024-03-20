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
            width: 90%;
            right: 0;
            padding: 2rem
          }

          .form-label {
            padding: 0 0 .5rem 0
          }

          .form-label label {
            font-size: 1.2rem;
            font-weight: bold;
          }

          textarea {
            resize: none;
            padding: .5rem;
            border-radius: 5px;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem
          }

        </style>
        
        <div class="prompt">
          <form>
            <div class="form-label">
              <label for="prompt">¿Qué asociaciones estás buscando?</label>
            </div>
            <div class= "form-input">
              <textarea type="text" id="prompt" name="prompt" rows="5" cols="100"></textarea>  
            </div>
          </form>
        </div>
      `
  }
}

customElements.define('prompt-component', Prompt)
