import View from "./View";
import icons from '../../img/icons.svg'

class PaginationView extends View{
    _parentElement =  document.querySelector('.pagination')
    
    clickHandler(handler){
        this._parentElement.addEventListener('click',function(e){
            e.preventDefault()
            const btn = e.target.closest('.btn--inline')
            const goto =   +btn.dataset.goto;
            
            handler(goto)
        })
    }
    generateMarkup(){
     const numPages = Math.ceil(this._data.results.length / 10)
     
     let currentPage =  this._data.page
     
     if(currentPage === 1 && numPages > 1){
        return ` <button class="btn--inline pagination__btn--next" data-goto ="${currentPage+1}">
        <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
     }


     if(currentPage === numPages){
        return ` <button class="btn--inline pagination__btn--prev" data-goto="${currentPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>`
     }


     if(currentPage < numPages){
        return ` <button class="btn--inline pagination__btn--prev" data-goto="${currentPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
           <button class="btn--inline pagination__btn--next" data-goto="${currentPage+1}">
           <span>Page ${currentPage+1}</span>
           <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
     }


     
    }
}

export default new PaginationView()