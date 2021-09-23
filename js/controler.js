class CalcControler{
    constructor(){
        this._oprerator = [];
        this._locale = "pt-br";
        this._displayEl = document.querySelector(".display");
        this._displayHoraEl = document.querySelector(".hora");
        this._displayDataEl = document.querySelector(".data");
        this._dataAtual;
        this.inicializandor();
    }
    inicializandor(){
        this.deteTimeUp();
        setInterval(()=>{
            this.deteTimeUp();
        },1000)
        this.selectButtons()
        this.setNumberDisplay()
    }
    clearAll(){
        this.operadores = []
        this.setNumberDisplay()
    }
    cancelEntry(){
        this.operadores.pop();
        this.setNumberDisplay()
    }
    Error(){
        this.display = "ERROR"
    }
    getLastOperation(){
        return this.operadores[this.operadores.length-1]
    }
    isOperation(value){
        return (["+","-","*","%","/",].indexOf(value) > -1)
    }
    setLastOperation(value){
        this.operadores[this.operadores.length-1] = value;
    }
    calc(){
        let last = "";
        if(this.operadores.length > 3){
            last = this.operadores.pop()
        }
        let result = eval(this.operadores.join(""));
        if(last == "%"){
            result /= 100;
            this.operadores[result]
        }else{
            this.operadores = [result];
            if(last)this.operadores.push(last)
        }
        this.setNumberDisplay()
        console.log(this.operadores)
    }
    pushOperation(value){
        this.operadores.push(value)
        if(this.operadores.length > 3){
            this.calc()
        }
    }
    setNumberDisplay(){
        let lastNumber;
        for(let i = this.operadores.length-1; i >= 0; i--){
            if(!this.isOperation(this.operadores[i])){
                lastNumber = this.operadores[i];
                break;
            }
        }
        if(!lastNumber) lastNumber = 0
        this.display = lastNumber
    }
    addOperation(value){
        // console.log("A",value ,isNaN(this.getLastOperation()));
        if(isNaN(this.getLastOperation())){
            if(this.isOperation(value)){
                // this.operadores[this.operadores.length -1] = value;
                this.setLastOperation(value)
            }else if(isNaN(value)){
                // outras coisas
                console.log("isOperation", value)
            }else{
                // this.operadores.push(value)
                this.pushOperation(value);
                this.setNumberDisplay()
            }
        }else{
            if(this.isOperation(value)){
                // this.operadores.push(value)
                this.pushOperation(value);

            }else{
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(newValue)
                this.setNumberDisplay()
            }
        }
        console.log(this.operadores)
    }
    execBtn(value){
        switch(value){
            case "ac":
                this.clearAll();
            break;
            case "ce":
                this.cancelEntry()
            break;
            case "porcento":
                this.addOperation("%");
            break;
            case "dividir":
                this.addOperation("/");
            break;
            case "vezes":
                this.addOperation("*");
            break;
            case "menos":
                this.addOperation("-");
            break;
            case "somar":
                this.addOperation("+");
            break;
            case "ponto":
                this.addOperation(".");
            break;
            case "igual":
                this.calc()
            break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
            break;
            default:
                this.Error()
            break;
        }
    }
    selectButtons(){
        const buttons = document.querySelectorAll("button");
        buttons.forEach(btn=>{
            this.addEventListenerAll(btn,"click drag", e=>{
                const textBn = btn.className.replace("btn-","")
                this.execBtn(textBn);
            });
            this.addEventListenerAll(btn, "mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });
        });
    }
    addEventListenerAll(element,event,fn){
        event.split(" ").forEach(ev =>{
            element.addEventListener(ev, fn, false)
        })
    }
    deteTimeUp(){
        this.data = this.dataAtualizada.toLocaleDateString(this.localizacao);
        this.hora = this.dataAtualizada.toLocaleTimeString(this.localizacao);
    }
    get display(){
        return this._displayEl.textContent;
    }
    set display(value){
        this._displayEl.textContent = value
    }
    get data(){
        return this._displayDataEl.textContent;
    }
    set data(value){
        this._displayDataEl.textContent = value;
    }
    get hora(){
        return this._displayHoraEl.textContent;
    }
    set hora(value){
        this._displayHoraEl.textContent = value;
    }
    get dataAtualizada(){
        return new Date();
    }
    set dataAtualizada(value){
        this._dataAtual = value;
    }
    get localizacao(){
        return this._locale;
    }
    set localizacao(value){
        this._locale = value;
    }
    get operadores(){
        return this._oprerator;
    }
    set operadores(value){
        this._oprerator = value;
    }
}// fim do construtor