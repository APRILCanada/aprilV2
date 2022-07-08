import { ScullyConfig, registerPlugin, HandledRoute } from '@scullyio/scully';
import { niches, products, articles, direct } from './src/data/routes.js'
import '@scullyio/scully-plugin-puppeteer';

// plugin to create all niches/* routes
async function nichePlugin(route: any, config: any): Promise<HandledRoute[]> {
  const routes: any = [];

  niches.forEach((nicheId: any) => {
    routes.push({ route: `/niches/${nicheId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all produits/* routes
async function produitPlugin(route: any, config: any): Promise<HandledRoute[]> {
  const routes: any = [];

  products.forEach((productId: any) => {
    routes.push({ route: `/produits/${productId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all actualites/* routes
async function actualitePlugin(route: any, config: any): Promise<HandledRoute[]> {
  const routes: any = [];

  articles.forEach((articleId: any) => {
    routes.push({ route: `/actualites/${articleId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all direct/* routes
async function directPlugin(route: any, config: any): Promise<HandledRoute[]> {
  const routes: any = [];

  direct.forEach((dId: any) => {
    routes.push({ route: `/direct/${dId}` })
  })

  return Promise.resolve(routes)
}

registerPlugin('router', 'niche', nichePlugin)
registerPlugin('router', 'actualite', actualitePlugin)
registerPlugin('router', 'produit', produitPlugin)
registerPlugin('router', 'direct', directPlugin)

export const config: ScullyConfig = {
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