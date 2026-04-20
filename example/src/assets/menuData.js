export const menuData = [
  {
    title: '首页',
    index: '/home',
    icon: '🏠'
  },
  {
    title: '系统管理',
    index: '/system',
    icon: '⚙️',
    children: [
      {
        title: '用户管理',
        index: '/system/user',
        icon: '👤',
        children: [
          {
            title: '添加用户', index: '/system/user/addx', icon: '➕',
            children: [
              {
                title: '添加用户2', index: '/system/user/add2', icon: '➕',
                children: [
                  { title: '添加用户4', index: '/system/user/add', icon: '➕' },
                  {
                    title: '添加用户5', index: '/system/user/add5', icon: '➖',
                    children: [
                      {
                        title: '添加用户6', index: '/system/user/add6', icon: '➕',
                        children: [
                          {
                            title: '添加用户8', index: '/system/user/add8', icon: '➕',
                          },
                          {
                            title: '添加用户9', index: '/system/user/add9', icon: '➖',
                          }
                        ]
                      },
                      {
                        title: '添加用户7', index: '/system/user/add7', icon: '➖',
                      }
                    ]
                  }
                ]
              },
              {
                title: '删除用户3', index: '/system/user/add3', icon: '➖',
              },
            ]
          },
          {
            title: '删除用户', index: '/system/user/delx', icon: '➖',
            children: [
              {
                title: '删除用户2', index: '/system/user/del2', icon: '➕',
                children: [
                  { title: '删除用户4', index: '/system/user/del', icon: '➕' },
                  { title: '删除用户5', index: '/system/user/del5', icon: '➖', }
                ]
              },
              {
                title: '删除用户3', index: '/system/user/del3', icon: '➖',
              },
            ]
          }
        ]
      },
      {
        title: '角色配置',
        index: '/system/role',
        icon: '🛡️',
        children: [
          { title: '添加角色', index: '/system/role/add', icon: '➕' },
          { title: '删除角色', index: '/system/role/del', icon: '➖' }
        ]
      }
    ]
  },
  {
    title: '内容管理',
    index: '/content',
    icon: '📄',
    children: [
      { title: '文章列表', index: '/content/articleList', icon: '📝' },
      { title: '发布文章', index: '/content/publishArticle', icon: '✍️' }
    ]
  }
]
