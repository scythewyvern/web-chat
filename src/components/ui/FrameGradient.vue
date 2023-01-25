<template>
  <div class="frame-gradient">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.frame-gradient {
  --opacity: 0;
  --opacity-transition: opacity 0.2s ease;

  height: 100vh;
  width: 100vw;
  opacity: var(--opacity);
  transition: var(--opacity-transition);

  &:hover {
    --opacity: 1;
  }

  &::before,
  &::after {
    display: block;
    opacity: var(--opacity);
    transition: var(--opacity-transition);
    content: "";
    background: var(--frame-gradient);
    width: 100%;
    height: 130px;
    position: absolute;
    left: 0;
    z-index: 12;
  }

  &::before {
    transform: rotate(180deg);
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}
</style>
