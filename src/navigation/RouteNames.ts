export enum NavigationStackNames {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
  HomeStack = 'HomeStack',
  HomeTab = 'HomeTab',
  PlayerStack = 'PlayerStack',
}

export enum AuthStack {
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
  OtpScreen = 'OtpScreen',
  CreatePassword = 'CreatePassword',
}

export enum PlayerStack {
  PlayerScreen = 'PlayerScreen',
}
const routeNames = {
  Stacks: NavigationStackNames,
  AuthStack,
  PlayerStack,
};

export default routeNames;
