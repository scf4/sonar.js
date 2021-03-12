declare let search: (usernames: string[]) => any;
declare let items: (userId: number) => any;
declare let mute: (userId: number) => any;
declare let unmute: (userId: number) => any;
declare let setNotificationSetting: (userId: number, notificationSetting: NotificationSetting) => any;
export { search, items, mute, unmute, setNotificationSetting, };
