const rules = {
  employe: {
    static: ['report:list']
  },
  admin: {
    static: ['user:list', 'clocking:create']
  }
};

export default rules;
