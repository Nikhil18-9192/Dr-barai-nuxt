<template>
  <div id="search">
    <div class="search-input relative">
      <input
        type="text"
        class="search-input border outline-none rounded-lg p-2"
        placeholder="Search Patient"
        v-model="search"
        @input="runSearch"
      />
      <img
        v-if="search"
        class="absolute right-2 top-3 cursor-pointer"
        src="/delete_btn.svg"
        alt=""
        @click="clearSearch"
      />
    </div>

    <div
      v-if="searchPatients.length"
      class="result sm:fixed bg-white border rounded-lg"
    >
      <div
        class="search-patient flex p-4"
        v-for="patient in searchPatients"
        :key="patient.id"
        @click="$router.push(`/patients/${patient.id}`)"
      >
        <div class="profile">
          <img
            v-if="patient.profile"
            class="image"
            :src="patient.profile ? patient.profile.url : ''"
            alt=""
          />
          <img v-else class="image" src="/profile-placeholder.jpg" alt="" />
        </div>
        <div class="info pl-8">
          <p>{{ patient.name }}</p>
          <p>{{ patient.mobile }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/apollo/queries/patient/search.gql'
export default {
  data() {
    return {
      search: '',
      searchPatients: [],
    }
  },
  methods: {
    async runSearch() {
      if (this.search == '') {
        this.searchPatients = []
        return
      }
      const { data } = await this.$apollo.query({
        query: search,
        variables: {
          search: this.search,
        },
      })
      this.searchPatients = data.patients
    },
    clearSearch() {
      this.search = ''
      this.searchPatients = []
    },
  },
}
</script>

<style lang="scss" scoped>
#search {
  .search-input {
    width: 400px;
    @include for-phone-only {
      width: 300px;
    }
  }
  .result {
    width: 400px;
    max-height: 400px;
    overflow-y: scroll;
    @include for-phone-only {
      width: 300px;
    }
    .search-patient {
      border-bottom: 0.5px solid #f4f4f4;
      cursor: pointer;
      .image {
        height: 45px;
        width: 45px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }
}
</style>
