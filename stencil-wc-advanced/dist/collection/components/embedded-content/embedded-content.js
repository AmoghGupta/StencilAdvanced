import { h } from "@stencil/core";
export class UcEmbeddedContent {
    render() {
        return [
            h("div", null,
                h("p", null, "embedded component"))
        ];
    }
    static get is() { return "uc-embedded-content"; }
    static get encapsulation() { return "shadow"; }
}
