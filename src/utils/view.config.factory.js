/* utils/view.config.factory.js */

//REQUIRES
const ViewConfig = require('../configs/view.config');


class ViewConfigFactory {
 
    createConfig(viewName, viewTemplate, data, content) {
        let response;
        const viewData = {
            content: content,
            title: viewTemplate.title || "",
            header: viewTemplate.header || "",
            template: viewName || "",
            messages: data.messages || [],
            isAuthenticated: data.isAuthenticated || false,
            profile: data.profile || [],
            userId: data.userId || null,
            userRole: data.userRole || null,
            userActive: data.userActive || null,
            user: data.user || [],
            post: data.post || [],
            users: data.users || [],
            posts: data.posts || []
        };
        
        const viewConfig = new ViewConfig(viewData);
        if(viewConfig.isComplete) {
            response = viewConfig;
        } else { 
            response = null; 
        }

        return response;
    }
}

//EXPORTA LA INSTANCIA DE LA CLASE FABRICA DE CONFIGURACIÓN VISTAS
module.exports = new ViewConfigFactory();