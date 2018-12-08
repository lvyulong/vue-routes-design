# vue-routes-design


###一、Introduction

该插件是为了在写vue框架的路由配置时能更加简洁方便。<br>
使用该插件前后的代码对比，如下（此处我们默认路由组件都放在views目录下，先不要介意路径加载问题）：

#####使用该插件前的写法

```javascript
    // 加载路由组件
    import foo from 'views/foo';
    import bar from 'views/bar';
    // 路由懒加载
    const baz = () => import('views/baz');
    const routes = [
      { path: '/foo', component: foo },
      { path: '/bar', component: bar },
      { path: '/baz', component: baz },
    ];
    
    const router = new VueRouter({routes});
    const app = new Vue({
      router
    }).$mount('#app')
   
```

这样看下来，好像没有什么问题。但是没有一个真正的项目只有三个路由，更何况真正做业务时更多的会有父子路由嵌套。<br>
再看下面代码，你会明白点什么...

```javascript
        import foo from 'views/foo';
        import foo1 from 'views/foo1';
        import foo11 from 'views/foo11';
        import foo12 from 'views/foo12';
        import foo2 from 'views/foo2';
        import foo21 from 'views/foo21';
        import foo22 from 'views/foo22';
        import bar from 'views/bar';
        // 路由懒加载
        const baz = () => import('views/baz');
        ...
        
        const foo = {
          template: `
             <router-view></router-view>
          `
        }
        const routes = [
          { 
              path: '/foo',
              component: foo,
              children:[
                  {
                      path:'foo1',
                      component: foo1,
                      children:[
                          {
                              path:'foo11',
                              component: foo11,
                              children:[
                                  // 可以自己想象，不再列举
                                  ...
                              ]
                          },
                          {
                              path:'foo12',
                              component: foo12,  
                              children:[
                                  // 可以自己想象，不再列举
                                  ...
                              ]
                          }
                      ]
                  },
                  {
                      path:'foo2',
                      component: foo2,
                      children:[
                          {
                              path:'foo21',
                              component: foo21,
                              children:[
                                  // 可以自己想象，不再列举
                                  ...
                              ]
                          },
                          {
                              path:'foo22',
                              component: foo22,  
                              children:[
                                  // 可以自己想象，不再列举
                                  ...
                              ]
                          }
                      ]
                  },
              ]
          },
          { path: '/bar', component: bar },
          { path: '/baz', component: baz },
          ...
        ];
        
        const router = new VueRouter({routes});
        const app = new Vue({
          router
        }).$mount('#app')
```
脾气不好的我，写到这儿,已经有点想砸电脑了。但是，真实的业务场景，小项目也至于就这几个路由吧.....

#####使用该插件后的写法

```javascript
const config = {
    // 进入应用的默认路由
    default: 'app.foo.foo1',
    routes: [
        // 容器路由
        {state: 'foo', type: 'blank'},
        // 父子用‘.’分割
        {state: 'foo.foo1'},
        {state: 'foo.foo1.foo11'},
        {state: 'foo.foo1.foo12'},
        {state: 'foo.foo2'},
        {state: 'foo.foo2.foo21'},
        {state: 'foo.foo2.foo22'},
        {state: 'bar', type: 'blank'},
        {state: 'baz', type: 'blank'},
    ]
};
```

上面的代码就是使用该插件之后的路由配置文件，有没有发现一个路由只用了一行，真的是只有一行，不能再多了。

