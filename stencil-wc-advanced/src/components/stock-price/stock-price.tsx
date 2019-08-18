import {Component, h, State, Element, Prop, Listen} from "@stencil/core";
import {Globals} from "../global/global";


@Component({
  tag: 'uc-stock-price',
  styleUrl: "./stock-price.css",
  shadow: true
})
export class StockPrice{

  @State() fetchedPrice:any;
  @Element() el: HTMLElement;
  stockInput: HTMLInputElement;
  @State() stockUserInput:string;
  @Prop({reflectToAttr: true, mutable:true}) default:string;


  onUserInput(event){
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
  @Listen('body:symbolSelected')
  onStockSymbolSelected(event: CustomEvent){
    if(event.detail && event.detail != this.default){
      fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+event.detail+'&apikey='+Globals.API_KEY).then(
        (res)=>{
          return res.json();
        }
      ).then(
        (parsedJSON)=>{
          this.fetchedPrice = JSON.stringify(parsedJSON);
        }
      ).catch(
        (err)=>{
          console.log(err);
        }
      );
    }
  }


  // lifecycle hook
  // once DOM Loaded
  componentDidLoad(){

    if(this.default){
      fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+this.default+'&apikey='+Globals.API_KEY).then(
      (res)=>{
        return res.json();
      }
    ).then(
      (parsedJSON)=>{
        this.fetchedPrice = JSON.stringify(parsedJSON);
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    );
    }

  }


  onFetchStockPrice(event:Event){
  event.preventDefault();
  //accessing  host element shadow dom root
  // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
  // OR 2nd way is using references i.e the ref attribute in the jsx
  // const stockSymbol = this.stockInput.value;
  // OR 3rd two way binding
  const stockSymbol =this.stockUserInput;


    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stockSymbol+'&apikey='+Globals.API_KEY).then(
      (res)=>{
        return res.json();
      }
    ).then(
      (parsedJSON)=>{
        this.fetchedPrice = JSON.stringify(parsedJSON);
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    );
  }


  render(){
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
          <input id="stock-symbol"
          ref={el => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput = {this.onUserInput.bind(this)}/>

          <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Search String: {this.stockUserInput}</p>
        <p>Price: {this.fetchedPrice}</p>
      </div>,
      <div>
        <uc-embedded-content></uc-embedded-content>
      </div>
    ];
  }
}
