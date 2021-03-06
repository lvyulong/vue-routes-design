# vue-routes-design


### 一、Introduction

该插件是为了在写vue框架的路由配置时能更加简洁方便。<br>
使用该插件前后的代码对比，如下（此处我们默认路由组件都放在views目录下）：

##### 使用该插件前的写法

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
##### 使用该插件后的写法

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

上面的代码就是使用该插件之后的路由配置文件，一个路由只用了一行。

### 二、Usage
本插件的用法需要对项目做出以下调整。

#### 1、下载
```javascript
    npm install vue-routes-design --save
```

#### 2、webpack配置文件
本插件对webpack的配置有一个特殊要求，即在webpack配置文件中对src目录定义一个别名。在webpack配置文件的相应位置加上这行代码。
```javascript
        ...
      resolve:{
        alias: {
          app: path.resolve(__dirname, '../src/'),  // 请在自己的webpack配置文件中的对应位置加上此行代码,src的相对路径请根据实际情况做调整
        }
      },
      ...
```
#### 3、main.js中引用
```javascript
    import Vue from 'vue';
    import Router from 'vue-router';
    import routesDesign from 'vue-routes-design';
    import main from 'app/main.vue';
    Vue.use(Router);
    
    // config其实应该独立为一个配置文件，import进来，此处只是为了方便演示才写到此处
    const config = {
        default: 'app.user.index',
        routes: [
            // 登陆
            {state: 'login'},
    
            // 应用主体
            {state: 'app', defaultLink: 'app.user.index'},
    
            // 我的账户
            {state: 'app.user', type: 'blank', defaultLink: 'app.user.index'},
            {state: 'app.user.index'},
            {state: 'app.user.new'},
            {state: 'app.user.edit', params: '/:id'},
    
            // demo1
            {state: 'app.demo1', type: 'blank'},
            // demo1.1
            {state: 'app.demo1.demo11', type: 'blank'},
            {state: 'app.demo1.demo11.index'},
            {state: 'app.demo1.demo11.new'},
            {state: 'app.demo1.demo11.edit', params: '/:id'},
            // demo1.2
            {state: 'app.demo1.demo12', type: 'blank'},
            {state: 'app.demo1.demo12.index'},
    
        ]
    };
    // 调用create方法，则会把config的配置转换成vue-router要求的格式
    const routes = routesDesign.create(config);
    
    const router = new Router({routes});
    // 挂载dom
    const root = document.createElement('div');
    document.body.appendChild(root);
    const vm = new Vue({
        render: (h) => {
            return h(main)
        },
        router,
    });
    vm.$mount(root);
```

#### 4、目录结构
本插件要求所有的路由组件必须放置在src/views文件夹下，并需按照父子路由的名称进行放置组件文件。

### 三、演示demo

请看演示[demo](https://github.com/lvyulong/vue-system)。
