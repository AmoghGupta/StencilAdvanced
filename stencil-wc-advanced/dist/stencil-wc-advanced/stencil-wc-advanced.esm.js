import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-4500e99a.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["uc-stock-finder",[[1,"uc-stock-finder",{"searchResult":[32]}]]],["uc-embedded-content",[[1,"uc-embedded-content"]]],["uc-stock-price",[[1,"uc-stock-price",{"default":[1537],"fetchedPrice":[32],"stockUserInput":[32]},[[32,"symbolSelected","onStockSymbolSelected"]]]]]], { resourcesUrl });
});
