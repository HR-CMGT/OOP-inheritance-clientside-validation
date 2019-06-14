/// <reference path="inputfield.ts" />

class TextField extends InputField{
    constructor() {
        super("text")
    }

    protected isValid() : boolean {
        let value : any = this.input.value
        return isNaN(value)
    }
    
    // Valideren of het veld "text" bevat
    public validate() {
        this.errorMessage = "Dit is geen text"
        super.validate()
    }
}