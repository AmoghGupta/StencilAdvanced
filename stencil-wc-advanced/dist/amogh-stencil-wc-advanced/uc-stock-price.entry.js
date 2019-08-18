import { r as registerInstance, h, d as getElement } from './chunk-83491137.js';
import { G as Globals } from './chunk-77eba278.js';

class StockPrice {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit" }, "Fetch")),
            h("div", null, h("p", null, "Search String: ", this.stockUserInput), h("p", null, "Price: ", this.fetchedPrice)),
            h("div", null, h("uc-embedded-content", null))
        ];
    }
    get el() { return getElement(this); }
    static get style() { return ":host {\n  font-family: sans-serif;\n  border: 2px solid purple;\n  margin: 2rem;\n  padding: 1rem;\n  display: block;\n  width: 20rem;\n  max-width: 100%;\n}\n\nform input{\n  font: inherit;\n  color: purple;\n  padding: 0.1rem 0.25rem;\n  display: block;\n  margin-bottom: 0.5rem;\n\n}\n\nform input:focus,\nform button:focus{\n  outline: none;\n}\n\nform button{\n  font:inherit;\n  padding: 0.25rem 0.5rem;\n  border: 1px solid purple;\n  background-color: purple;\n  color: white;\n  cursor: pointer;\n}\n\nform button:hover,\nform button:active{\n  background-color: #750175\n}"; }
}

export { StockPrice as uc_stock_price };
