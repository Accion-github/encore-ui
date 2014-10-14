var pkg = require('../../package.json');
var appName = pkg.config.appName;
var prism = require('connect-prism');
var appLocalRewrite = {};
appLocalRewrite[appName] = '';

module.exports = function prismInit(prismMode) {
    prismMode = prismMode || 'proxy';

    prism.create({
        name: 'login',
        prismMode: prismMode,
        context: '/login',
        host: 'staging.encore.rackspace.com',
        port: 443,
        https: true,
        changeOrigin: false,
        rewrite: {
            // Routes all login dependencies
            'login/*': '/login/',
            // Route login to index to avoid redirects
            'login/?$': '/login/index.html'
        }
    });

    prism.create({
        name: 'app',
        prismMode: prismMode,
        context: '/' + appName,
        host: 'localhost',
        port: 9000,
        rewrite: appLocalRewrite
    });

    if (prismMode === 'stubbed') {

        prism.create({ // Default catch all for all stubbed out API's
            name: 'default',
            context: '/api',
            host: 'localhost',
            port: 3000,
            https: false,
            changeOrigin: false
        });

    } else {

        prism.create({
            name: 'identity',
            context: '/api/identity',
            prismMode: prismMode,
            // Point to the identity host relevant to the project
            host: 'staging.identity-internal.api.rackspacecloud.com',
            port: 443,
            https: true,
            changeOrigin: true,
            rewrite: {
                'api/identity': '/v2.0'
            }
        });

        prism.create({
            name: 'cas',
            mode: prismMode,
            context: '/api/customer-admin',
            host: 'customer-admin.staging.ord1.us.ci.rackspace.net',
            port: 443,
            https: true,
            changeOrigin: true,
            rewrite: {
                'api/customer-admin': '/v3'
            }
        });

        prism.create({
            name: 'bsl',
            mode: prismMode,
            context: '/api/billing',
            host: 'staging.billingv2.api.rackspacecloud.com',
            port: 443,
            https: true,
            changeOrigin: true,
            rewrite: {
                'api/billing': '/v2/accounts',
            }
        });

        prism.create({
            name: 'payment',
            mode: prismMode,
            context: '/api/payment',
            host: 'staging.system.payment.api.rackspacecloud.com',
            port: 443,
            https: true,
            changeOrigin: true,
            rewrite: {
                'api/payment': '/v1'
            }
        });

        prism.create({
            name: 'support',
            mode: prismMode,
            context: '/api/support',
            host: 'staging.dfw.support.encore.rackspace.com',
            port: 443,
            https: true,
            changeOrigin: true,
            rewrite: {
                'api/support': '/api'
            }
        });

    }

};