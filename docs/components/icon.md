# Icon 图标

提供了一套常用的图标集合。

## 基础用法

使用 `size` 和 `color` 属性来设置图标的大小和颜色。

<example-demo>
  <template v-slot:default>
    <jy-icon>默认图标</jy-icon>
    <jy-icon size="20px" color="red">红色图标</jy-icon>
    <jy-icon size="24px" color="#409EFF">蓝色图标</jy-icon>
    <jy-icon size="28px" color="#67C23A">绿色图标</jy-icon>
  </template>

  <template v-slot:source>
    <div class="language-vue">
      <pre><code><span class="line"><span style="color: var(--vp-c-green)">&lt;template&gt;</span></span>
  <span class="line">  &lt;jy-icon&gt;默认图标&lt;/jy-icon&gt;</span>
  <span class="line">  &lt;jy-icon size="20px" color="red"&gt;红色图标&lt;/jy-icon&gt;</span>
  <span class="line">  &lt;jy-icon size="24px" color="#409EFF"&gt;蓝色图标&lt;/jy-icon&gt;</span>
  <span class="line">  &lt;jy-icon size="28px" color="#67C23A"&gt;绿色图标&lt;/jy-icon&gt;</span>
<span class="line"><span style="color: var(--vp-c-green)">&lt;/template&gt;</span></span></code></pre>
    </div>
  </template>
</example-demo>
