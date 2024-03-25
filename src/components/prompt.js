class Prompt extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()

    const sendButton = this.shadow.querySelector('.send-button button')
    sendButton.addEventListener('click', () => {
      this.sendForm()
    })
  }

  async render () {
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
            margin: .5rem 1.5rem 0.5rem 0;
            padding: .5rem;
            border-radius: 5px;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem
          }

          .send-button {
            display: flex;
            justify-content: flex-end
          }

          button {
            padding: .5rem;
            background-color: hsla(0, 50%, 50%, 1);
            color: hsla(0, 100%, 100%, 1);
            font-weight: bold;
            border: none;
            border-radius: 5px;
            cursor: pointer
          }

          button:hover {
            background-color: hsla(0, 50%,50%, .7)
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
          <div class="send-button">
            <button> Enviar </button>
          </div>
        </div>
      `
  }

  async sendForm () {
    const form = this.shadow.querySelector('form')
    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())

    const response = await fetch('http://localhost:5173', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataJson)
    })

    if (response.ok) {
      console.log('Form data sent successfully:', formDataJson)
    } else {
      console.error('Failed to send form data:', response.statusText)
    }
  }

  catch (error) {
    console.error('Error sending form data:', error)
  }
}

customElements.define('prompt-component', Prompt)
