class Searchview {
   _parentEl = document.querySelector('.search')

   getQuery(){
    return this._parentEl.querySelector('.search__field').value;
   }

   addhandlerSearch(handler){
    this._parentEl.addEventListener('click',function(e){
        e.preventDefault()
        handler()
    })
   }
}

export default new Searchview()