const getters = {
  siderOpen: state => state.setting.siderOpen,
  selectFlag:state=>state.infoView.selectFlag,
  assignFlag:state=>state.infoView.assignFlag,
  name: state=>state.user.name,
  role: state => state.user.role,
  token: state => state.token,
  avatar: state => state.user.avatar,
  sidebarRouters:state => state.permission.sidebarRouters,
  userSelectOption:state => state.options.userSelectOption,
  resSelectOption:state => state.options.resSelectOption,
  expSelectOption:state => state.options.expSelectOption,
}
export default getters
