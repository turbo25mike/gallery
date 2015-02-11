'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'scotts-app-secret'
    },

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    
    app: {
        name: process.env.APP_NAME || 'My App'
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'cloud',
        api_key: process.env.CLOUDINARY_KEY || 'key',
        api_secret: process.env.CLOUDINARY_SECRET || 'secret'
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback',
        page: (process.env.FACEBOOK_PAGE_URL || 'http://facebook.com')
    },

    google: {
        analytics_id: process.env.GOOGLE_ANALYTICS_ID || 'UA-XXXXX-X',
        map_id: process.env.GOOGLE_MAP_ID || 'mapID'        
    },
    
    paypal: {
        merchantID: process.env.PAYPAL_MERCHANT_ID || 'id'   
    },
    
    postmark: {
      api_key: process.env.POSTMARK_KEY || 'key'  
    }

};



// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});