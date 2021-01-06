- views文件夹里面主要放路由视图组件，router管理项目路由，components中主要放公共组件，api将所有接口封装成模块，在需要的地方加载调用，utils主要放工具模块，styles放全局样式
- axios去发请求的时候，默认设置的content-type就是application/json 一般请求头中这个不用特意去设置

<img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 上午11.18.57.png" alt="截屏2021-01-06 上午11.18.57" style="zoom:33%;" />

- 对于代码中的请求操作：
  - 接口请求可能需要重用
  - 实际工作中，接口非常容易变动，改起来麻烦
  -  建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理，这样做的好处就是：管理维护更方便，也好重用

## 用户登录

<img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 上午11.20.03.png" alt="截屏2021-01-06 上午11.20.03" style="zoom:40%;" />

1. 使用了element-ui中的Form表单组件，message消息提示组件，用于主动操作后的消息提示

2. 实现基本登录功能

   - 给登录按钮注册点击事件
   - 获取表单数据
   - 请求登录
   - 处理后端响应结果
     - 成功：
     - 失败：

3. <img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 上午11.37.45.png" alt="截屏2021-01-06 上午11.37.45" style="zoom:40%;" />

   <img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 上午11.38.19.png" alt="截屏2021-01-06 上午11.38.19" style="zoom:40%;" />

---

- 对于请求体中的mobile和code两个参数，可以直接在vue的data方法中设置user对象，里面存储这两个参数

<img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 上午11.22.19.png" alt="截屏2021-01-06 上午11.22.19" style="zoom:40%;" />

- 假设在慢速网络下，用户点击登录按钮后会因为响应不及时而多次点击登录按钮，造成发起多次请求，所以应该在登录请求期间，把按钮禁用或者展示一个loading状态，以防出现网络过慢造成多点的现象，使用button加载中组件
  - 防止网络请求慢出现用户多次点击触发登录请求
    - 一种方式是在请求期间把交互按钮禁用不允许被点击
    - 一种方式就是展示loading不允许被点击
  - 交互反馈

### 表单验证

- **手动触发表单验证**：手机号和密码都没有输入的情况下点击登录按钮没有触发表单验证，即便都没有输入的情况下也会发送请求.**但是我们希望只有等表单验证通过之后，才将请求发送出去。也就是在点击登录按钮的时候，强制触发一下表单验证**

<img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 下午3.32.40.png" alt="截屏2021-01-06 下午3.32.40" style="zoom:40%;" />

<img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 下午3.36.40.png" alt="截屏2021-01-06 下午3.36.40" style="zoom:45%;" />

- 点击复选框同意条款才会发送请求，需要使用到自定义验证规则：

  <img src="/Users/maolu/Library/Application Support/typora-user-images/截屏2021-01-06 下午7.25.14.png" alt="截屏2021-01-06 下午7.25.14" style="zoom:40%;" />

- 