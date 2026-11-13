const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');
const { After, AfterAll, BeforeAll, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);
let browser;
BeforeAll(async () => { browser = await chromium.launch(); });
After(async function () { if (this.page) await this.page.close(); });
AfterAll(async () => { if (browser) await browser.close(); });

Then('the {string} bundle works with Leaflet {string}', async function (bundle, version) {
        const suffix = bundle === 'minified' ? '.min' : '';
        const page = this.page = await browser.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.setContent('<div id="map" style="height:400px"></div>');
        const dist = `https://unpkg.com/leaflet@${version}/dist`;
        await page.addStyleTag({ url: `${dist}/leaflet.css` });
        await page.addScriptTag({ url: `${dist}/${version === '1.9.4' ? 'leaflet.js' : 'leaflet-global.js'}` });
        await page.addScriptTag({ path: path.join(__dirname, '..', '..', `leaflet-control-layers-inline${suffix}.js`) });
        const result = await page.evaluate(() => {
          const map = new (L.LeafletMap || L.Map)('map', { center: [0, 0], zoom: 2 });
          const Layers = L.LayersControl || L.Control.Layers;
          const normal = new Layers().addTo(map);
          const inline = new Layers({}, {}, { inline: true, collapsed: true, className: 'one two' }).addTo(map);
          const actual = {
            version: L.version,
            normal: normal.options.collapsed,
            inline: inline.options.collapsed,
            expanded: inline.getContainer().classList.contains('leaflet-control-layers-expanded'),
            classes: ['leaflet-control-layers-inline', 'one', 'two'].every(name => inline.getContainer().classList.contains(name)),
          };
          inline.remove();
          inline.addTo(map);
          map.remove();
          return actual;
        });
        assert.equal(result.version, version);
        assert.deepEqual({ ...result, version: undefined }, { version: undefined, normal: true, inline: false, expanded: true, classes: true });
        assert.deepEqual(errors, []);
});
