import { h } from "@stencil/core";
import { Globals } from "../global/global";
export class StockPrice {
    onUserInput(event) {
        this.stockUserInput = event.target.value;
    }
    // lifecycle hooks
    // componentWillLoad (right before render is executed, dom isn't populated)
    // componentDidLoad (component loaded)
    // componentWillUpdate (right before re rendering , bcoz some state or prop changed)
    // componentDidUpdate (once re rendered)
    // componentDidUnload
    // Listening to custom event triggered from other component
    // symbolSelected is the event name from another comp
    onStockSymbolSelected(event) {
        if (event.detail && event.detail != this.default) {
            fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + event.detail + '&apikey=' + Globals.API_KEY).then((res) => {
                return res.json();
            }).then((parsedJSON) => {
                this.fetchedPrice = JSON.stringify(parsedJSON);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    // lifecycle hook
    // once DOM Loaded
    componentDidLoad() {
        if (this.default) {
            fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + this.default + '&apikey=' + Globals.API_KEY).then((res) => {
                return res.json();
            }).then((parsedJSON) => {
                this.fetchedPrice = JSON.stringify(parsedJSON);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    onFetchStockPrice(event) {
        event.preventDefault();
        //accessing  host element shadow dom root
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // OR 2nd way is using references i.e the ref attribute in the jsx
        // const stockSymbol = this.stockInput.value;
        // OR 3rd two way binding
        const stockSymbol = this.stockUserInput;
        fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockSymbol + '&apikey=' + Globals.API_KEY).then((res) => {
            return res.json();
        }).then((parsedJSON) => {
            this.fetchedPrice = JSON.stringify(parsedJSON);
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
                h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }),
                h("button", { type: "submit" }, "Fetch")),
            h("div", null,
                h("p", null,
                    "Search String: ",
                    this.stockUserInput),
                h("p", null,
                    "Price: ",
                    this.fetchedPrice)),
            h("div", null,
                h("uc-embedded-content", null))
        ];
    }
    static get is() { return "uc-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-price.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-price.css"]
    }; }
    static get properties() { return {
        "default": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "default",
            "reflect": true
        }
    }; }
    static get states() { return {
        "fetchedPrice": {},
        "stockUserInput": {}
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "symbolSelected",
            "method": "onStockSymbolSelected",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
