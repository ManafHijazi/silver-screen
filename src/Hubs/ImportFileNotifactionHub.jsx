import { config } from '../config/config';

const signalR = require('@aspnet/signalr');

export const ProcessStatusMethod = 'ProcceseStatus';

export function ImportFileNotificationHub() {
  return new signalR.HubConnectionBuilder()
    .withUrl(
      `${config.ws_address}/WsFileManager/ImportNotificationHub?userId=${
        JSON.parse(localStorage.getItem('session')).userId
      }`,
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      }
    )
    .build();
}
