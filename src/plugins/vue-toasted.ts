import vueToasted from 'vue-toasted';
import Vue from 'vue';
Vue.use(vueToasted, {
  duration: 5000,
  iconPack: 'mdi',
});

// options to the toast
const customErrorOptions = {
  type: 'error',
  icon: 'mdi-alert-circle',
};

// register the toast with the custom message
Vue.toasted.register(
  'custom_error',
  payload => {
    // if there is no message passed show default message
    if (!payload.message) {
      return '알수없는 에러 발생';
    }

    // if there is a message show it with the message
    return payload.message;
  },
  customErrorOptions,
);

const customInfoOptions = {
  type: 'info',
  icon: 'mdi-information',
};

Vue.toasted.register(
  'custom_info',
  payload => {
    // if there is no message passed show default message
    if (!payload.message) {
      return '메세지를 받지못했습니다';
    }

    // if there is a message show it with the message
    return payload.message;
  },
  customInfoOptions,
);

const customSuccessOptions = {
  type: 'success',
  icon: 'mdi-check-circle',
};

Vue.toasted.register(
  'custom_success',
  payload => {
    // if there is no message passed show default message
    if (!payload.message) {
      return '성공!';
    }

    // if there is a message show it with the message
    return payload.message;
  },
  customSuccessOptions,
);
