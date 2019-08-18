import { EventEmitter } from "../../stencil.core";
export declare class StockFinder {
    stockNameInput: HTMLInputElement;
    searchResult: {
        symbol: string;
        name: string;
    }[];
    symbolSelected: EventEmitter<string>;
    onFindStocks(event: any): void;
    onSelectSymbol(event: any): void;
    render(): any[];
}
