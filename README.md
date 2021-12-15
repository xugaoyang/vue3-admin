# vue3-admin
vue3 + element-plus.自研用.

### vue3 api

1. ref，reactive, toRef, toRefs区别？
    1. ref可用任何类型的数据创建响应式，reactive只用于创建引用类型数据的响应式
    2. ref创建响应式不影响原始值,reactive会影响原始数据
    3. ref返回一个对象，非模板中使用.value访问，模板中不用，内部做了自动展开
    4. ref,reactive会触发试图更新，toRef、toRefs只触发数据更新
    5. toRef 用于创建对象指定的属性响应式，换句话说就是只能控制一个对象中的一个属性,toRefs 用于创建对象响应式
    6. 只有toRefs 返回的对象能够解构

2. 如何在setup函数内通过ref获取表单dom元素
```
// 注意loginForm同步
<el-form ref="loginForm" :model="form" :rules="formRules"></el-form>
setup() {
    const loginForm = ref()
    const formDom = unref(loginForm)
    formDom.validate(() => {})
    return {
        loginForm
    }
}

```

#### 代码提交约束

1. 提交格式
```
<gitmoji> <commit type>: <description>

// eg
:sparkles: feat: add theme change
```

#### 功能

- [x] 在线配置
- [x] tags
- [ ] with ts
- [ ] axios封装
- [ ] mock
- [x] i18n
- [x] login background with threejs
- [ ] vite

#### 提示

1. 使用依赖`commitlint-config-gitmoji`提交代码需要将[gitmoji.json](https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json)添加至`node_modules/commitlint-plugin-gitmoji/lib` folder

```
# if you meet the below error. It means that you failed to fetch the gitmojis.json file.
Failed to fetch gitmoji JSON, please refer to https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/plugin#fetch-error for help.

```



参考框架：

1. [vue-admin-beautiful-pro](https://chu1204505056.gitee.io/admin-pro/#/index)
2. [iview](https://adminpro.iviewui.com)
3. [vbenAdmin](https://vvbin.cn/next/#/dashboard/analysis)
4. [MDN--var](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var())
5. [css变量教程](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)
6. [threejs example](https://threejs.org/examples/webgl_points_dynamic.html)
