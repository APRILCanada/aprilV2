"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const scully_1 = require("@scullyio/scully");
const routes_js_1 = require("./src/data/routes.js");
require("@scullyio/scully-plugin-puppeteer");
// plugin to create all niches/* routes
async function nichePlugin(route, config) {
    const routes = [];
    routes_js_1.niches.forEach((nicheId) => {
        routes.push({ route: `/niches/${nicheId}` });
    });
    return Promise.resolve(routes);
}
// plugin to create all produits/* routes
async function produitPlugin(route, config) {
    const routes = [];
    routes_js_1.products.forEach((productId) => {
        routes.push({ route: `/produits/${productId}` });
    });
    return Promise.resolve(routes);
}
// plugin to create all actualites/* routes
async function actualitePlugin(route, config) {
    const routes = [];
    routes_js_1.articles.forEach((articleId) => {
        routes.push({ route: `/actualites/${articleId}` });
    });
    return Promise.resolve(routes);
}
// plugin to create all direct/* routes
async function directPlugin(route, config) {
    const routes = [];
    routes_js_1.direct.forEach((dId) => {
        routes.push({ route: `/direct/${dId}` });
    });
    return Promise.resolve(routes);
}
(0, scully_1.registerPlugin)('router', 'niche', nichePlugin);
(0, scully_1.registerPlugin)('router', 'actualite', actualitePlugin);
(0, scully_1.registerPlugin)('router', 'produit', produitPlugin);
(0, scully_1.registerPlugin)('router', 'direct', directPlugin);
exports.config = {
    projectRoot: "./src",
    projectName: "april",
    outDir: './dist/static',
    routes: {
        '/niches/:id': {
            type: 'niche'
        },
        '/produits/:id': {
            type: 'produit'
        },
        '/actualites/:id': {
            type: 'actualite'
        },
        '/direct/:marketId': {
            type: 'direct'
        }
    }
};
