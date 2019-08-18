import { h } from "@stencil/core";
import { Globals } from "../global/global";
export class StockFinder {
    constructor() {
        this.searchResult = [];
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
        let result = (h("tr", null,
            h("td", null, "null"),
            h("td", null, "null")));
        if (this.searchResult.length > 0) {
            result = (this.searchResult.map(match => h("tr", null,
                h("td", null,
                    match.name,
                    " "),
                h("td", { "data-symbol": match.symbol }, match.symbol))));
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) },
                h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }),
                h("button", { type: "submit" }, "Find!")),
            h("table", { onClick: this.onSelectSymbol.bind(this) },
                h("tr", null,
                    h("th", null, "Name"),
                    h("th", null, "Symbol")),
                result)
        ];
    }
    static get is() { return "uc-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-finder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get states() { return {
        "searchResult": {}
    }; }
    static get events() { return [{
            "method": "symbolSelected",
            "name": "symbolSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
