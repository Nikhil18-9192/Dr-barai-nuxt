<template>
  <div
    id="add-drugs"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading h-14">
        <h1 class="text-lg font-medium text-center mb-4 sm:mb-8">Add Drugs</h1>
      </div>
      <div class="form px-4 sm:px-12 md:px-8 flex-grow overflow-y-scroll">
        <label for="name" class="text-sm font-normal text-gray-400">Name</label>
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Elon musk"
          autocomplete="on"
        />
        <label for="drug type" class="text-sm font-normal text-gray-400"
          >Drug Type</label
        >
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" :loading="loading">Submit</MyButton>
        <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddDrugsModal',
  data() {
    return {
      name: '',
      loading: false,
    }
  },
}
</script>

<style lang="scss" scopped></style>
