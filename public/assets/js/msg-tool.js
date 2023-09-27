/* MESSAGE TOOL JS */

document.addEventListener("DOMContentLoaded", function () {
  let msgList = document.querySelectorAll(".message-item");

  async function showMessage(messageItem) {
    if (messageItem && messageItem.textContent.trim().length > 0) {
      messageItem.addEventListener("click", clickHandler);
      messageItem.style.display = "block";
      await delay(5000);
      removeMessage(messageItem);
    }
  }

  function removeMessage(messageItem) {
    if (messageItem) {
      messageItem.removeEventListener("click", clickHandler);
      messageItem.remove();
    }
  }

  function clickHandler(e) {
    e.preventDefault();
    removeMessage(e.currentTarget);
  }

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  function initMessages(list) {
    for (let i = 0; i < list.length; i++) {
      showMessage(list[i]);
    }
  }

  initMessages(msgList);

});
