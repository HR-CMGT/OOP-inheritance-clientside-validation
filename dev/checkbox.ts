/// <reference path="inputfield.ts" />
class CheckBox extends InputField{
    constructor() {
        super("checkbox")
        this.input.type = "checkbox"

        // Als een checkbox wordt aangevinkt moet een eventuele foutmelding verdwijnen.
        // Vandaar ook een check bij "change" van het input element
        this.input.addEventListener("change", () => this.checkRequired())
    }

    protected checkRequired() {
        // standaard gedrag (tonen van de span) moet sowieso uitgevoerd worden door parent
        super.checkRequired()

        if(this.isEmpty()) {
            // voorbeeld van ander gedrag t.o.v. de parent
            // Deze regel overschrijft dus het standaard gedrag van de "innerHTML" uit de parent
            this.span.innerHTML     = "U heeft de algemene voorwaarden niet geaccepteerd"
        }
    }

    /**
     * Deze functie overschrijft de standaard functionaliteit van de parent
     */
    protected isEmpty() : boolean {
        return (!this.input.checked)
    }

    /**
     * Een checkbox is altijd valide. 
     * Er wordt niks ingevuld, dus daar zit ook geen voorwaarde aan.
     */
    protected isValid() : boolean {
        return true
    }
}