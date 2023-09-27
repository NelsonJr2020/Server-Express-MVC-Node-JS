/* utils/views.factory.js */

//REQUIRES
const viewConfigFactory = require("./view.config.factory");
const templatesConfig = require("../configs/templates.config.json");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");

//CLASE VIEWS FACTORY
class ViewFactory {
  constructor() {
    this.templatesConfig = templatesConfig;
    this.viewConfigFactory = viewConfigFactory;
  }

  generateView(viewName, data) {
    const content = this.createViewContentTemplate(viewName);
    const viewTemplate = this.templatesConfig.views[viewName];
    const viewConfig = this.viewConfigFactory.createConfig(
      viewName,
      viewTemplate,
      data,
      content
    );
    const finalRender = ejs.render(this.combineTemplate(viewConfig));
  
    return finalRender;
  }

  getPartial(partialName) {
    const partialJson = templatesConfig.partials[partialName];
    const partialPath = path.join(__dirname,`../views/partials/${partialJson}.ejs`);
    return partialPath;
  }

  createViewContentTemplate(viewName) {
    const contentTemplateEjs = path.join(__dirname, `../views/${viewName}.ejs`);
    const contentTemplate = fs.readFileSync(contentTemplateEjs, "utf8");
    return contentTemplate;
  }

  combineTemplate(viewConfig) {
    const baseName = this.templatesConfig.baseTemplate;
    const baseTemplatePath = path.join(__dirname, `../views/base/${baseName}.ejs`);
    const baseTemplate = fs.readFileSync(baseTemplatePath, "utf8");
    const partials = {
      head: this.getPartial("head"),
      msg: this.getPartial("msg"),
      navbar: this.getPartial("navbar"),
      footer: this.getPartial("footer"),
    };
    let { content, template, title, header, messages, isAuthenticated, user, post, users, posts, profile, userId, userRole, userActive } = viewConfig;
    const preCombinedView = ejs.render(content, {
      isAuthenticated,
      userId,
      userRole,
      userActive,
      profile,
      user, 
      post, 
      users, 
      posts,
    });
    content = preCombinedView;
    const combinedView = ejs.render(baseTemplate, {
      title,
      header,
      messages,
      isAuthenticated,
      template,
      partials,
      content, 
    });
    return combinedView;
  }
}

//EXPORTA LA INSTANCIA DE LA CLASE FABRICA DE VISTAS
module.exports = new ViewFactory();
