<template>
  <div id="inventory-summary">
    <div class="list relative border border-gray-300 rounded-xl mt-14">
      <div class="container py-3">
        <div class="title py-4">
          <p class="text-black text-center font-semibold">Quantity Low</p>
          <p class="qty-low text-center text-gray-400">
            {{ itemsToBeStocked.length }} products need to be restocked!
          </p>
        </div>
        <div class="container-1">
          <div class="header flex py-3 justify-between">
            <p class="pl-6">Product</p>
            <p class="pr-3">Quantity</p>
          </div>
        </div>
        <div
          v-for="(item, i) in itemsToBeStocked"
          :key="i"
          class="items py-5 mx-6 flex justify-between"
        >
          <p class="text-lg mb-1">{{ item.product }}</p>
          <h2 class="qty text-lg capitalize font-normal pr-3">
            {{ item.qty }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsToBeStocked: [
        {
          product: 'Pain Killer',
          qty: 5,
        },
        {
          product: 'Pain Killer',
          qty: 4,
        },
        {
          product: 'Pain Killer',
          qty: 3,
        },
        {
          product: 'Pain Killer',
          qty: 2,
        },
        {
          product: 'Pain Killers',
          qty: 2,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#inventory-summary {
  .list {
    width: 350px;
    min-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @include for-phone-only {
      width: 300px;
    }
  }
  .title {
    padding-bottom: 24px;
    border-bottom: 1px solid #c4c4c4;
  }
  .items {
    padding-bottom: 10px;
    border-bottom: 1px solid #c4c4c4;
  }
}
</style>
