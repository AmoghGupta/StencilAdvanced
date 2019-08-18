import { r as registerInstance, c as createEvent, h } from './chunk-4500e99a.js';
import { G as Globals } from './chunk-77eba278.js';

class StockFinder {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchResult = [];
        this.symbolSelected = createEvent(this, "symbolSelected", 7);
    }
    onFindStocks(event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${Globals.API_KEY}`)
            .then(res => res.json()).then(parsedJSON => {
            this.searchResult = parsedJSON['bestMatches'].map(match => {
                return { name: match["2. name"], symbol: match["1. symbol"] };
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    onSelectSymbol(event) {
        let symbolValue = event.target.getAttribute('data-symbol') || "";
        this.symbolSelected.emit(symbolValue);
    }
    render() {
        let result = (h("tr", null, h("td", null, "null"), h("td", null, "null")));
        if (this.searchResult.length > 0) {
            result = (this.searchResult.map(match => h("tr", null, h("td", null, match.name, " "), h("td", { "data-symbol": match.symbol }, match.symbol))));
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), h("button", { type: "submit" }, "Find!")),
            h("table", { onClick: this.onSelectSymbol.bind(this) }, h("tr", null, h("th", null, "Name"), h("th", null, "Symbol")), result)
        ];
    }
    static get style() { return ":host {\n  font-family: sans-serif;\n  border: 2px solid purple;\n  margin: 2rem;\n  padding: 1rem;\n  display: block;\n  width: 20rem;\n  max-width: 100%;\n}\n\n\nform input{\n  font: inherit;\n  color: purple;\n  padding: 0.1rem 0.25rem;\n  display: block;\n  margin-bottom: 0.5rem;\n\n}\n\nform input:focus,\nform button:focus{\n  outline: none;\n}\n\nform button{\n  font:inherit;\n  padding: 0.25rem 0.5rem;\n  border: 1px solid purple;\n  background-color: purple;\n  color: white;\n  cursor: pointer;\n}\n\nform button:hover,\nform button:active{\n  background-color: #750175\n}"; }
}

export { StockFinder as uc_stock_finder };
