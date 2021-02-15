<template>
  <div
    id="confirm"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50 overflow-y-scroll"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-6 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading">
        <h1 class="text-lg font-medium text-center mb-2 sm:mb-4">
          Confirm Delete
        </h1>
      </div>
      <div class="message">
        <p class="text-center">Are you sure you want to delete this entry?</p>
      </div>
      <div class="btns flex justify-center items-center mt-6">
        <MyButton @click.native="$emit('confirm')">Yes</MyButton>
        <MyButton class="cancel-btn ml-4" @click.native="$emit('dismiss')"
          >No</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmationModal',
}
</script>

<style lang="scss" scoped>
#confirm {
  .add-btn {
    width: 180px;
    height: 37px;
    @include for-phone-only {
      width: 135px;
    }
  }
  .cancel-btn {
    background: #f3f4f6;
    color: #000;
  }
}
</style>
