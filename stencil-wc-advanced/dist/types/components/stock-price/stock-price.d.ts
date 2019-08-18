export declare class StockPrice {
    fetchedPrice: any;
    el: HTMLElement;
    stockInput: HTMLInputElement;
    stockUserInput: string;
    default: string;
    onUserInput(event: any): void;
    onStockSymbolSelected(event: CustomEvent): void;
    componentDidLoad(): void;
    onFetchStockPrice(event: Event): void;
    render(): any[];
}
