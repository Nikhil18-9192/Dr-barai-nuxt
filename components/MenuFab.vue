<template>
  <div id="menu-fab">
    <div class="navs">
      <div :class="{ active: active }" class="flex flex-col-reverse nv-wrap">
        <div
          v-for="(item, i) in links"
          :key="item.title"
          :style="{ transitionDelay: `${i / 10}s` }"
          class="nv inline-flex items-center justify-end bg-blue-500 my-2 rounded-2xl text-white pl-4 py-1"
          @click="
            item.navigate()
            active = false
          "
        >
          <p class="text-right">{{ item.title }}</p>
          <img class="text-white" :src="item.icon" />
        </div>
      </div>
    </div>
    <img
      src="/plus-solid-circle.svg"
      class="controller w-16 h-16 rounded-full"
      :style="{ transform: `rotate(${active ? '135deg' : '0deg'})` }"
      @click="active = !active"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuFab',
  data() {
    return {
      active: false,
      links: [
        {
          title: 'Appointment',
          icon: '/plus-solid-white.svg',
          navigate: () => {
            this.$router.push('/appointments/new')
          },
        },
        {
          title: 'Patient',
          icon: '/plus-solid-white.svg',
          navigate: () => {
            this.$emit('click-add-patient')
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scopped>
#menu-fab {
  position: fixed;
  right: 32px;
  bottom: 32px;

  @include for-phone-only {
    right: 16px;
    bottom: 16px;
  }

  .controller {
    position: relative;
    transition: 0.3s ease all;
    float: right;
  }

  .navs {
    position: relative;

    .nv-wrap {
      max-height: 0;
      overflow: hidden;
      padding: 0 8px;
      transition: 0.5s ease all;
      .nv {
        opacity: 0;
        transform: translateY(5px);
      }
    }

    .active {
      max-height: 500px;

      .nv {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .nv {
      cursor: pointer;
      transition: 0.3s ease all;
      position: relative;
      img {
        padding: 4px;
        width: 32px;
        height: 32px;
        object-fit: contain;
      }

      &:hover {
        box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.219);
        transform: scale(1.02);
      }
    }
  }
}
</style>
