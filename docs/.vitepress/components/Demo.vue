<template>
  <div class="demo-container">
    <div class="demo-wrapper">
      <div class="demo-content">
        <slot></slot>
      </div>
    </div>
    <div class="demo-source">
      <div class="source-code" :class="{ 'is-expanded': isExpanded }">
        <div class="language-vue">
          <slot name="source"></slot>
        </div>
      </div>
      <div class="source-action" @click="toggleCode">
        {{ isExpanded ? '收起' : '展开' }}
        <svg class="icon" :class="{ expanded: isExpanded }" viewBox="0 0 1024 1024">
          <path d="M512 714.666667L128 330.666667h768z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({
    name: 'ExampleDemo',
  })

  const isExpanded = ref(false)
  const toggleCode = () => {
    isExpanded.value = !isExpanded.value
  }
</script>

<style scoped>
  .demo-container {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    margin: 16px 0;
  }

  .demo-wrapper {
    padding: 24px;
  }

  .demo-source {
    border-top: 1px solid var(--vp-c-divider);
  }

  .source-code {
    height: 0;
    overflow: hidden;
    transition: height 0.25s;
  }

  .source-code.is-expanded {
    height: auto;
    padding: 16px;
    background-color: var(--vp-code-block-bg);
  }

  .source-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: 0.2s;
  }

  .source-action:hover {
    color: var(--vp-c-text-1);
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    transition: transform 0.2s;
  }

  .icon.expanded {
    transform: rotate(180deg);
  }

  :deep(.language-vue) {
    margin: 0;
  }
</style>
