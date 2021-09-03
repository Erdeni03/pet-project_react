const initialState = {
  isOpen: false,
  text: '',
  variant: 'danger',
  autoHideTime: 2000,
};

export const alertReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
