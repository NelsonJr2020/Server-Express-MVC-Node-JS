/* configs/model.config.js */

//CLASE CONFIGURACIÓN DE VISTAS
class ViewConfig {

    constructor(viewConfigData) {
        this.content = viewConfigData.content;
        this.title = viewConfigData.title;
        this.header = viewConfigData.header;
        this.template = viewConfigData.template;
        this.messages = viewConfigData.messages,
        this.users = viewConfigData.users,
        this.user = viewConfigData.user,
        this.posts = viewConfigData.posts,
        this.post = viewConfigData.post,
        this.profile = viewConfigData.profile,
        this.isAuthenticated = viewConfigData.isAuthenticated,
        this.userId = viewConfigData.userId,
        this.userRole = viewConfigData.userRole,
        this.userActive = viewConfigData.userActive
    }

    // Método para verificar si la instancia está completa
    isComplete() {
        //Devuelve true si las propiedades obligatorias la vista están presentes y no son nulas
        return !!this.content && !!this.title && !!this.header && !!this.template && !!this.messages && !!this.isAuthenticated;
    }
    
    // Convierte un objeto de configuración en un objeto plano
    toObject() {
        return {
            content: this.content,
            title: this.title || "",
            header: this.header || "",
            template: this.template,
            messages: this.messages || [],
            isAuthenticated: this.isAuthenticated || false
        };
    }
}

//EXPORTA LA CLASE CONFIGURACIÓN DE VISTAS
module.exports = ViewConfig;