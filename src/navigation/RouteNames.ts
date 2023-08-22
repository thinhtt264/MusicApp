export enum NavigationStackNames {
    AuthStack = 'AuthStack',
    MainStack = 'MainStack',
    HomeStack = 'HomeStack',
    HomeTab = 'HomeTab',
  }
  
  export enum AuthStack {
    LoginScreen = 'LoginScreen',
    RegisterScreen = 'RegisterScreen',
    OtpScreen = 'OtpScreen',
    CreatePassword = 'CreatePassword',
  }
  const routeNames = {
    Stacks: NavigationStackNames,
    AuthStack: AuthStack,
  };
  
  export default routeNames;
  