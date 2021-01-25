const ValidateForm = (name, email, message) => {
  if (!name) return { msg: 'But... what should I call you?', type: 'name' };

  if (!email) return { msg: 'How about an email?', type: 'email' };

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return { msg: "I don't think that one will work.", type: 'email' };
  }

  if (!message)
    return {
      msg: "Ok I'll guess. You want to talk about...",
      type: 'message',
    };
};

export default ValidateForm;
