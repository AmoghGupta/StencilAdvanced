import {Component, h} from "@stencil/core";


@Component({
  tag: 'uc-embedded-content',
  shadow: true
})
export class UcEmbeddedContent{


  render(){
    return [
     <div>
       <p>embedded component</p>
     </div>
    ];
  }
}
