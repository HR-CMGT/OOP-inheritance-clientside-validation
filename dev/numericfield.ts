/// <reference path="inputfield.ts" />
class NumericField extends InputField{
    
    constructor() {
        // Normaal is het type van dit input element "number"
        // Het verschil is dan niet zichtbaar, want je kan geen letters invoeren
        // in een input element met type "number"
        super("NuMeRiC") 
        
    }

    /**
     * Dit veld is valide als de input een number bevat
     * Dit wordt gecontroleerd met (NOT(!) isNotANumber)
     */
    protected isValid() : boolean {
        let value : any = this.input.value
        return !isNaN(value)
    }

    // Valideren of het veld "text" bevat
    public validate() {
        this.errorMessage = "Dit is geen nummer"
        super.validate()
    }
    
}