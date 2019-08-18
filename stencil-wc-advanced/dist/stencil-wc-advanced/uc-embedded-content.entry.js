import { r as registerInstance, h } from './chunk-4500e99a.js';

class UcEmbeddedContent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return [
            h("div", null, h("p", null, "embedded component"))
        ];
    }
}

export { UcEmbeddedContent as uc_embedded_content };
