<template>
  <button
    type="button"
    class="btn rounded-md text-white text-sm font-medium add-btn flex items-center justify-center shadow-2xl outline-none"
    :class="secondary ? `bg-red-500` : 'bg-blue-500'"
  >
    <transition name="v-btn-label" mode="out-in">
      <div v-if="loading">
        <span class="spinner"></span>
      </div>
      <span
        v-else
        :class="icon ? 'flex ' : 'flex-none'"
        class="btn-text w-full justify-center"
      >
        <div v-if="icon" class="icon flex w-1/4 items-center justify-center">
          <img :src="icon" alt="" />
        </div>
        <slot></slot>
      </span>
    </transition>
  </button>
</template>
<script>
export default {
  name: 'Mybutton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.spinner {
  display: inline-block;
  margin: 0 8px;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  border: 0.215em solid transparent;
  vertical-align: middle;
  font-size: 16px;
  border-top-color: white;
  animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
}
img {
  width: 22px;
}

.btn {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  outline: none;

  &:hover {
    transition: 0.1s ease-in;
    transform: scale(1.02);
  }
}

.v-btn-label-enter-active {
  animation: slide-in-down 260ms cubic-bezier(0, 0, 0.2, 1);
}

.v-btn-label-leave-active {
  animation: slide-out-down 260ms cubic-bezier(0.4, 0, 1, 1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes slide-in-down {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out-down {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  40% {
    opacity: 0.2;
  }

  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
