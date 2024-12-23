import View from "./View.js";


class AddRecipe extends View{
   _parentElement = document.querySelector('.upload')
   _message = "Recipe is added sucessfully :)"

   _window = document.querySelector('.add-recipe-window')
   _overlay = document.querySelector('.overlay')
   _btnOpen = document.querySelector('.nav__btn--add-recipe')
   _btnClose = document.querySelector('.btn--close-modal')
   
   constructor(){
     super()
     this.addHandlerShowWindow()
     this.addHandlerHideWindow()
   }

   toggleWindow = function(){
     this._window.classList.toggle('hidden')
     this._overlay.classList.toggle('hidden')

   }
   addHandlerShowWindow(){
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
   }

   addHandlerHideWindow(){
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
    this._overlay.addEventListener('click',this.toggleWindow.bind(this))
   }

   addHandlerUploadRecipe(handler){
      this._parentElement.addEventListener('click',function(e){
        e.preventDefault()
        const dataArr = [...new FormData(this)]
        const data = Object.fromEntries(dataArr)
        handler(data)
      })
      
   }
   generateMarkup(){
    
   }
}

export default new AddRecipe();
