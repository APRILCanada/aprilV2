import { ScullyConfig, registerPlugin, HandledRoute } from '@scullyio/scully';
import { niches, products, articles, direct } from './src/data/routes'

// plugin to create all niches/* routes
function nichePlugin(route: string, config = {}): Promise<HandledRoute[]> {
  const routes = [];

  niches.forEach(nicheId => {
    routes.push({ route: `/niches/${nicheId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all produits/* routes
function produitPlugin(route: string, config = {}): Promise<HandledRoute[]> {
  const routes = [];

  products.forEach(productId => {
    routes.push({ route: `/produits/${productId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all actualites/* routes
function actualitePlugin(route: string, config = {}): Promise<HandledRoute[]> {
  const routes = [];

  articles.forEach(articleId => {
    routes.push({ route: `/actualites/${articleId}` })
  })

  return Promise.resolve(routes)
}

// plugin to create all direct/* routes
function directPlugin(route: string, config = {}): Promise<HandledRoute[]> {
  const routes = [];

  direct.forEach(dId => {
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
    '/direct/:id': {
      type: 'direct'
    }
  }
};