/**
 * Módulo de servicios relacionados con mensajería de vistas.
 * @module services/message.service
 */

/**
 * Clase para gestionar mensajes.
 */
class MessageService {
  /**
   * Constructor de la clase.
   */
  constructor() {
    this.messages = [];
  }

  /**
   * Agrega un mensaje al servicio de mensajes.
   * @param {string} message - El mensaje a agregar.
   * @param {string} type - El tipo de mensaje (por ejemplo, "success", "error").
   */
  addMessage(message, type) {
    const messageStatus = { text: message, type: type };
    this.messages.push(messageStatus);
  }

  /**
   * Obtiene todos los mensajes y los elimina del servicio de mensajes.
   * @returns {Array} Un array de mensajes.
   */
  getMessages() {
    const messages = [...this.messages];
    this.messages = [];
    return messages;
  }
}

/**
 * Instancia de la clase MessageService.
 * @type {MessageService}
 */
const messageServiceInstance = new MessageService();

//EXPORTA LA INSTANCIA DE LA CLASE SERVICIO DE MENSAJERÍA
module.exports = messageServiceInstance;