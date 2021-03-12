interface Message {
    type: string;
    data?: Maybe<Record<string, any>>;
    error?: any;
}
declare let history: Array<Message>;
declare let sendAction: (type: string, data?: Message['data']) => Promise<void>;
export { sendAction, history, };
