const rules = {
  employe: {
    static: ['report:list']
  },
  admin: {
    static: ['report:list', 'user:list', 'clocking:create']
  }
};

export default rules;
