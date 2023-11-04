const { CoreClass } = require("@bot-whatsapp/bot");

class ChatGPTClass extends CoreClass {
  queue = [];
  optionsGPT = { model: "gpt-3.5-turbo" };
  openai = undefined;

  constructor(_database, _provider) {
    super(null, _database, _provider);
    this.init().then();
  }

  // inicitando funcion

  init = async () => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI({

    });
  };

  handleMsg = async (ctx) => {
    const { from, body } = ctx;

    const completion = await this.openai.sendMessage(body, {
      conversationId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });


    this.queue.push(completion)
    const parseMessage={
        ...completion,
        answer:completion.text
    }
    this.sendFlowSimple([parseMessage],from)
  };
}

module.exports = ChatGPTClass;
