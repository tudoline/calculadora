class CalcControler{
    constructor(){
        this.local = "pt-br"
        this._dataEl = document.querySelector(".data");
        this._horaEl = document.querySelector(".hora");
        this._displayEl = document.querySelector(".display");
        this._dataAtual;
        this.iniciando()
        this.iniciaEventosButtons()
    }
    iniciando(){
        this.display = "20"
        this.setDisplayDateTime()
        setInterval(()=>{
            this.setDisplayDateTime()
        },1000)
    }
    executarBtn(){//configuração de buttons no suwite

    }
    iniciaEventosButtons(){//evento nos butons
        const butons = document.querySelectorAll("button");
        console.log([...butons])
        butons.forEach(btn =>{
            this.addEventListenerAll(btn, "click drag", e=>{
                let textBtn = btn.className.replace("btn-","");
                this.executarBtn()
                console.log(textBtn)
            })
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            })
        });
    }
    addEventListenerAll(el,ev,fn){
        ev.split(" ").forEach(events =>{
            el.addEventListener(events, fn, false);
        })
    }
    setDisplayDateTime(){
        this.displayDate = this.dataAtual.toLocaleDateString("pt-br")
        this.displayTime = this.dataAtual.toLocaleTimeString("pt-br")
    }
    get display(){// display onde acontecera o calculo
        return this._displayEl.textContent;
    }
    set display(value){
        this._displayEl.textContent = value;
    }
    get dataAtual(){// onde esta recebendo o date
        return new Date();
    }
    set dataAtual(value){
        this._dataAtual = value;
    }
    get displayTime(){//aplicando no html a hora
        return this._horaEl.textContent;
    }
    set displayTime(value){
        this._horaEl.textContent = value
    }
    get displayDate(){// aplicando no htmt a data
        return this._dataEl.textContent;
    }
    set displayDate(value){
        this._dataEl.textContent = value
    }

} // fim do calcControle