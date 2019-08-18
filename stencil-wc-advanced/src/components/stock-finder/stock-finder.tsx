import {Component, h, State, EventEmitter, Event} from "@stencil/core";
import {Globals} from "../global/global";


@Component({
  tag: 'uc-stock-finder',
  styleUrl: "./stock-finder.css",
  shadow: true
})
export class StockFinder{

  stockNameInput: HTMLInputElement;
  @State() searchResult: {symbol: string, name: string}[] = [];

  @Event({bubbles: true, composed: true}) symbolSelected: EventEmitter<string>;


  onFindStocks(event){
    event.preventDefault();

    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${Globals.API_KEY}`)
    .then(
      res => res.json()
    ).then(
      parsedJSON =>{
        this.searchResult = parsedJSON['bestMatches'].map(match => {
          return {name: match["2. name"], symbol: match["1. symbol"]}
        })
      }
    ).catch((err)=>{
      console.log(err);
    });


  }


  onSelectSymbol(event){
    let symbolValue = event.target.getAttribute('data-symbol') || "";
    this.symbolSelected.emit(symbolValue);
  }





  render(){
    let result = (<tr><td>null</td><td>null</td></tr>);
    if(this.searchResult.length>0){
      result = (
        this.searchResult.map(match=>
          <tr>
            <td>{match.name} </td>
            <td data-symbol={match.symbol}>{match.symbol}</td>
          </tr>
        )
      )
    }



    return [

      <form onSubmit={this.onFindStocks.bind(this)}>
          <input id="stock-symbol"
          ref={el => (this.stockNameInput = el)}
         />

          <button type="submit">Find!</button>
      </form>,
      <table onClick={this.onSelectSymbol.bind(this)}>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
        </tr>
        {result}
      </table>
    ];
  }
}
