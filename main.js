class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
        this.weight = +element.dataset['weight'];
    }
}
class Burger {
    constructor(size, cotlet, ingridients, sauce) {
        this.size = new Param(this._getIntupForRadio(size));
        this.cotlet = this._getInputsForCheckbox(cotlet);
        this.ingridients = this._getInputsForCheckbox(ingridients);
        this.sauce = this._getInputsForCheckbox(sauce);
    }
    _getIntupForRadio(name){
       return document.querySelector(`input[name=${name}]:checked`)
    }
    _getInputsForCheckbox(name){
        let checkedInputsArr = [];
        this._selectedInputs(name).forEach(el => {
            let obj = new Param(el);
            checkedInputsArr.push(obj)
        })
        return checkedInputsArr
    }
    _selectedInputs(name){
      return [...document.querySelectorAll(`input[name=${name}]:checked`)]
    }
    showBurger(){
        const burgerImgPickles = document.querySelector('.burgerImg__pickles');
        const burgerImgSalad = document.querySelector('.burgerImg__salad');
        const burgerImgTomato = document.querySelector('.burgerImg__tomato');
        const burgerImgCheese = document.querySelector('.burgerImg__cheese');
        const burgerImgCotlet = document.querySelector('.burgerImg__cotlet');
        const burgerImgOnion = document.querySelector('.burgerImg__onion');
        const burgerImgBecon = document.querySelector('.burgerImg__becon');

        let arr = []
        this.ingridients.forEach(el => {
            arr.push(el.name)
        });
        this.sauce.forEach(el => {
            arr.push(el.name)
        })
        this.cotlet.forEach(el => {
            arr.push(el.name)
        })
       arr.forEach(elem => {
        switch(elem) {
            case 'Becon': burgerImgBecon.classList.remove('displayNone');
            break
            case 'Onion': burgerImgOnion.classList.remove('displayNone');
            break
            case 'Salad': burgerImgSalad.classList.remove('displayNone');
            break
            case 'Beef__Cotlet':
            case 'Pork__Cotlet':
            case 'Chicken__Cotlet':    
                burgerImgCotlet.classList.remove('displayNone');
                break
            case 'Tomato': burgerImgTomato.classList.remove('displayNone');
            break
            case 'Pickles': burgerImgPickles.classList.remove('displayNone');
            break
            case 'Cheese': burgerImgCheese.classList.remove('displayNone');
            break
        }
       })
    }
    getSum(arr){
        let result = arr.reduce((sum, elem) => sum + elem
        )
        return result
    }
    getTotalPrice(){
        let pricesArr = [];
        this.cotlet.forEach(elem => {
            pricesArr.push(elem.price)
        })
        this.ingridients.forEach(elem => {
            pricesArr.push(elem.price)
        })
        this.sauce.forEach(elem => {
            pricesArr.push(elem.price)
        })
        return this.getSum(pricesArr) + this.size.price
    }
    getTotalCalories(){
        let sumCalories = 0;
        let caloriesArr = [];
        this.cotlet.forEach(elem => {
            caloriesArr.push(elem.calories)
        })
        this.ingridients.forEach(elem => {
            caloriesArr.push(elem.calories)
        })
        this.sauce.forEach(elem => {
            caloriesArr.push(elem.calories)
        })
        return this.getSum(caloriesArr) + this.size.calories
    }
    getTotalWeight(){
        let weightArr = [];
        this.cotlet.forEach(elem => {
            weightArr.push(elem.weight)
        })
        this.ingridients.forEach(elem => {
            weightArr.push(elem.weight)
        })
        this.sauce.forEach(elem => {
            weightArr.push(elem.weight)
        })
        return this.getSum(weightArr) + this.size.weight
    }
    getComment(){
        let form = document.querySelector('#createBurgerForm')
        let formData = new FormData(form);
        let comment = formData.get('comment');
        return comment
    }
    showInfo(totalPrice, totalCaloreis, totalWeight){
        document.querySelector(totalPrice).textContent = `${this.getTotalPrice()} рублей`;
        document.querySelector(totalCaloreis).textContent = `${this.getTotalCalories()} ГКалл`;
        document.querySelector(totalWeight).textContent = `${this.getTotalWeight()} гр`;
        document.querySelector('.totalComment').textContent = `${this.getComment()}`
        if(this.getComment() !== '') {
            document.querySelector('.totalComment').classList.remove('displayNone')
        }
    }
}  
const createBurgerBtn = document.querySelector('.createBurgerBtn');
createBurgerBtn.addEventListener('click', () => {
    let burger = new Burger('size','cotlet', 'ingridients', 'sauce');
    console.log(burger);
    burger.showBurger();
    console.log(burger.getComment())
    burger.showInfo('#totalPrice', '#totalCalories', '#totalWeight')
})
