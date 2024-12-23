import View from "./View"
import icons from '../../img/icons.svg'

class bookmarkview extends View {
   
    _parentElement = document.querySelector('.bookmarks__list')
    
    generateMarkup(){
        return this._data.map(this.generateMarkupPreview).join('')
    }
   addHandlerBookmarks(handler){
    window.addEventListener('load',handler)
   }
  generateMarkupPreview(result){
      return`<li class="preview">
              <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
            `
     }
}

export default new bookmarkview();