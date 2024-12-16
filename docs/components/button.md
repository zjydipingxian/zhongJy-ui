# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

<demo source-code="button/basic">
  <template v-slot:default>
    <jy-button>默认按钮</jy-button>
    <jy-button type="primary">主要按钮</jy-button>
    <jy-button type="success">成功按钮</jy-button>
    <jy-button type="warning">警告按钮</jy-button>
    <jy-button type="danger">危险按钮</jy-button>
  </template>

  <template v-slot:source>

</demo>

## API

### 属性

| 属性名  | 说明     | 类型    | 默认值  |
| ------- | -------- | ------- | ------- |
| type    | 按钮类型 | string  | default |
| size    | 按钮大小 | string  | medium  |
| loading | 加载状态 | boolean | false   |

</rewritten_file>
