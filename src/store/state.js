const state = {
  user: {},
  article: {
    data: {
      typeValue: '',
      techTypeValue: '',
      title: '',
      topic_id: ''
    }
  },
  isEdit: false,
  myLinks: [
    { text: '我的信息', url: 'userinfo' },
    { text: '修改密码', url: 'resetpwd' },
    { text: '我的帖子', url: 'mynote' },
    { text: '我的收藏', url: 'mycollection' },
    { text: '我的消息', url: 'myinfo' },
    { text: '我的任务', url: 'mytask' }
  ],
  type: [
    { value: '1', label: '经验分享' },
    { value: '2', label: '入门学习' },
    { value: '3', label: '成果分享' }
  ],
  techType: [
    { value: '1', label: 'html' },
    { value: '2', label: 'javascript' },
    { value: '3', label: 'vue' }
  ],
}

export default state