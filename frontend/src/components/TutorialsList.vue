<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? 'Published' : 'Pending' }}
        </div>
        <router-link
          :to="'/tutorials/' + currentTutorial.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'

export default {
  name: 'tutorials-list',
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: '',
    }
  },
  methods: {
    async retrieveTutorials() {
      try {
        const res = await TutorialDataService.getAll()
        this.tutorials = res.data
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveTutorials()
      this.currentTutorial = null
      this.currentIndex = -1
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial
      this.currentIndex = tutorial ? index : -1
    },
    async removeAllTutorials() {
      try {
        const res = await TutorialDataService.deleteAll()
        console.log(res)
        this.refreshList()
      } catch (error) {
        console.log(error)
      }
    },
    async searchTitle() {
      try {
        const res = await TutorialDataService.findByTitle(this.title)
        this.tutorials = res.data
        this.setActiveTutorial(null)
      } catch (error) {
        console.log(error)
      }
    },
    mounted() {
      this.retrieveTutorials()
    },
  },
}
</script>
<style>
.list {
  text-align: left;
  min-width: 750px;
  margin: auto;
}
</style>
