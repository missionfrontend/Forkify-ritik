import icons from '../../img/icons.svg'

export default class View {
    render(data) {
        this._data = data
        const markup = this.generateMarkup()
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }



    Renderspinner = function (parentEl) {
        const markup = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div> `
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }


    renderError(message) {
        const markup = `<div class="error">
               <div>
                 <svg>
                   <use href="${icons}#icon-alert-triangle"></use>
                 </svg>
               </div>
               <p>${message}</p>
             </div>`
        this._parentElement.innerHTML = ''
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}