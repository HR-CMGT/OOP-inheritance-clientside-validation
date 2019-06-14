class InputField {
    constructor(type) {
        this.errorMessage = "";
        this.generateInputBlock(type);
        // Tijdens het typen valideren of de input juist is
        this.input.addEventListener("input", () => this.validate());
        // Na verlaten van het veld, controleren of er iets is ingevuld (en nog valide)
        this.input.addEventListener("blur", () => this.checkRequired());
    }
    // valideren gebeurt op basis van het type, dat moet de child zelf doen
    validate() {
        // Als NIET (!) valide, dan error weergeven
        if (!this.isValid()) {
            this.showError();
            console.log("niet valide");
        }
        else
            this.hideError();
    }
    /**
     * Bij het verlaten van een veld (blur) moet zowel
     * required gecheckt worden en of het veld valide is
     */
    checkRequired() {
        if (this.isEmpty() || !this.isValid()) {
            if (this.isEmpty()) {
                this.errorMessage = "Dit is een required field";
                this.showError();
            }
            else {
                this.validate();
            }
        }
        else
            this.hideError();
    }
    isValid() {
        // code wordt bepaald door child
        // InputField weet niet wanneer een child element valide is
        // InputField kent de child niet
        return null; // standaard gedrag
    }
    isEmpty() {
        return (this.input.value == "");
    }
    showError() {
        // error message overschrijven. Reden voor error kan van alles zijn.
        this.span.innerHTML = this.errorMessage;
        this.span.style.display = "inline-block";
    }
    hideError() {
        this.span.style.display = "none";
    }
    generateInputBlock(type) {
        // wrapper for label, input and error span
        let div = document.createElement("div");
        // create label
        let label = document.createElement("label");
        label.innerHTML = type;
        div.appendChild(label);
        // create input
        this.input = document.createElement("input");
        this.input.type = type;
        div.appendChild(this.input);
        // Zorg dat er een span is voor de error. 
        // met "show" en "hide" wordt de error wel/niet getoond
        this.span = document.createElement("span");
        // styling in stylesheet (color, default hide)
        this.span.className = "error";
        div.appendChild(this.span);
        let form = document.getElementsByTagName("form")[0];
        let submit = document.getElementById("submit");
        // Div altijd voor de submit plaatsen
        form.insertBefore(div, submit.parentNode);
    }
}
/// <reference path="inputfield.ts" />
class CheckBox extends InputField {
    constructor() {
        super("checkbox");
        this.input.type = "checkbox";
        // Als een checkbox wordt aangevinkt moet een eventuele foutmelding verdwijnen.
        // Vandaar ook een check bij "change" van het input element
        this.input.addEventListener("change", () => this.checkRequired());
    }
    checkRequired() {
        // standaard gedrag (tonen van de span) moet sowieso uitgevoerd worden door parent
        super.checkRequired();
        if (this.isEmpty()) {
            // voorbeeld van ander gedrag t.o.v. de parent
            // Deze regel overschrijft dus het standaard gedrag van de "innerHTML" uit de parent
            this.span.innerHTML = "U heeft de algemene voorwaarden niet geaccepteerd";
        }
    }
    /**
     * Deze functie overschrijft de standaard functionaliteit van de parent
     */
    isEmpty() {
        return (!this.input.checked);
    }
    /**
     * Een checkbox is altijd valide.
     * Er wordt niks ingevuld, dus daar zit ook geen voorwaarde aan.
     */
    isValid() {
        return true;
    }
}
class Main {
    constructor() {
        let textField = new TextField();
        let numericField = new NumericField();
        let checkBox = new CheckBox();
    }
}
window.addEventListener("load", () => new Main());
/// <reference path="inputfield.ts" />
class NumericField extends InputField {
    constructor() {
        // Normaal is het type van dit input element "number"
        // Het verschil is dan niet zichtbaar, want je kan geen letters invoeren
        // in een input element met type "number"
        super("NuMeRiC");
    }
    /**
     * Dit veld is valide als de input een number bevat
     * Dit wordt gecontroleerd met (NOT(!) isNotANumber)
     */
    isValid() {
        let value = this.input.value;
        return !isNaN(value);
    }
    // Valideren of het veld "text" bevat
    validate() {
        this.errorMessage = "Dit is geen nummer";
        super.validate();
    }
}
/// <reference path="inputfield.ts" />
class TextField extends InputField {
    constructor() {
        super("text");
    }
    isValid() {
        let value = this.input.value;
        return isNaN(value);
    }
    // Valideren of het veld "text" bevat
    validate() {
        this.errorMessage = "Dit is geen text";
        super.validate();
    }
}
//# sourceMappingURL=main.js.map