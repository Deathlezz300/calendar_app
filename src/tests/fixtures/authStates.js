export const initialState={
    status:'checking',
    user:{},
    errorMessage:undefined
  }


  export const AuthenticatedState={
    status:'authenticated',
    user:{
        uid:'abc',
        name:'Alejandro'
    },
    errorMessage:undefined
  }

  export const notAuthenticatedState={
    status:'not-authenticated',
    user:{},
    errorMessage:undefined
  }