class InputField {
    protected input : HTMLInputElement
    protected span  : HTMLSpanElement
    protected errorMessage : string = ""

    constructor(type : string) {
        this.generateInputBlock(type)

        // Tijdens het typen valideren of de input juist is
        this.input.addEventListener("input", () => this.validate()) 
        // Na verlaten van het veld, controleren of er iets is ingevuld (en nog valide)
        this.input.addEventListener("blur", () => this.checkRequired())
    }

    // valideren gebeurt op basis van het type, dat moet de child zelf doen
    protected validate() {
        // Als NIET (!) valide, dan error weergeven
        if(!this.isValid()) { 
            this.showError()
            console.log("niet valide")
        }
        else this.hideError()
    }

    /**
     * Bij het verlaten van een veld (blur) moet zowel
     * required gecheckt worden en of het veld valide is
     */
    protected checkRequired() {
        if(this.isEmpty() || !this.isValid()) {
            if(this.isEmpty()) {
                this.errorMessage = "Dit is een required field"
                this.showError() 
            }
            else {
                this.validate()
            }
        } 
        else this.hideError()
    }

    protected isValid() : boolean {
        // code wordt bepaald door child
        // InputField weet niet wanneer een child element valide is
        // InputField kent de child niet
        return null // standaard gedrag
    }

    protected isEmpty() : boolean {
        return (this.input.value == "")
    }

    private showError() : void {
        // error message overschrijven. Reden voor error kan van alles zijn.
        this.span.innerHTML = this.errorMessage
        this.span.style.display = "inline-block"
    }

    private hideError() : void {
        this.span.style.display = "none"
    }

    private generateInputBlock(type:string) {
        // wrapper for label, input and error span
        let div = document.createElement("div")

        // create label
        let label : HTMLLabelElement = document.createElement("label")
        label.innerHTML = type
        
        div.appendChild(label)

        // create input
        this.input      = document.createElement("input")
        this.input.type = type

        div.appendChild(this.input)

        // Zorg dat er een span is voor de error. 
        // met "show" en "hide" wordt de error wel/niet getoond
        this.span = document.createElement("span")
        
        // styling in stylesheet (color, default hide)
        this.span.className = "error"
        
        div.appendChild(this.span)

        let form = document.getElementsByTagName("form")[0]
        let submit = document.getElementById("submit")

        // Div altijd voor de submit plaatsen
        form.insertBefore(div, submit.parentNode)
    }
}