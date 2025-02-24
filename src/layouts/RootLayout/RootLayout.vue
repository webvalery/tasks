<template>
  <div class="root-layout">
    <div class="root-layout__header">
      <slot name="header">
        <router-link to="/" class="header__logo">
          <img src="@/assets/images/logo.svg" alt="logo" class="header__logo-img" />
          <span class="header__title">Задачник</span>
        </router-link>
      </slot>
    </div>

    <main class="root-layout__main">
      <slot />
    </main>

    <footer class="root-layout__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped lang="less">
.root-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.root-layout__main {
  flex: 1;
}
.root-layout__header,
.root-layout__footer {
  display: flex;
  justify-content: center;
}
.root-layout__header {
  padding: 57px 10px 66px 10px;
}
.header__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header__logo-img {
  display: block;
  margin-bottom: 5px;
}
.header__title {
  color: var(--text-light-gray);
  font-weight: var(--font-weight-semibold);
}
.root-layout__footer {
  padding: 20px 50px 67px 50px;
}
</style>
