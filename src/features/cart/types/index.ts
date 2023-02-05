export enum IEventCode {
  EVENT_CODE_WAITING_CARD = '0', // Código de evento indicando que o leitor está aguardando o usuário inserir o cartão
  EVENT_CODE_CUSTOM_MESSAGE = '-2', // Código de evento indicando mensagem customizada pela PlugPag.
  EVENT_CODE_INSERTED_CARD = '1', // Código de evento indicando que o cartão foi inserido.
  EVENT_CODE_PIN_REQUESTED = '2', // Código de evento indicando que o leitor está aguardando o usuário digitar a senha.
  EVENT_CODE_PIN_OK = '3', // Código de evento indicando que a senha digitada foi validada com sucesso.
  EVENT_CODE_AUTHORIZING = '5', // Código de evento indicando que o terminal está aguardando autorização da senha digitada para prosseguir com a transação.
  EVENT_CODE_WAITING_REMOVE_CARD = '7', // Código de evento indicando que o terminal está aguardando o usuário remover o cartão.
}

export enum IEventMessage {
  EVENT_CODE_WAITING_CARD = 'APROXIME, INSIRA OU PASSE O CARTAO',
  EVENT_UPDATING_TABLES = 'ATUALIZANDO TABELAS',
  EVENT_PASSWORD_LOCKED = 'SENHA BLOQUEADA',
  EVENT_PASSWORD_CHECKED = 'SENHA VERIFICADA',
  EVENT_PAYMENT_CANCELLED = 'OPERACAO CANCELADA',
  EVENT_PROCESSING = 'PROCESSANDO',
}
