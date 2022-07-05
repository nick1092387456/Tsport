<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? 'Published' : 'Pending' }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>
    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'

export default {
  name: 'edit-tutorial',
  data() {
    return {
      currentTutorial: null,
      message: '',
    }
  },
  methods: {
    async getTutorial(id) {
      try {
        const res = await TutorialDataService.get(id)
        this.currentTutorial = res.data
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updatePublished(status) {
      try {
        const data = {
          id: this.currentTutorial.id,
          title: this.currentTutorial.title,
          description: this.currentTutorial.description,
          published: status,
        }
        const res = TutorialDataService.update(this.currentTutorial.id, data)
        console.log(res.data)
        this.currentTutorial.published = status
        this.message = 'The status was updated successfully!'
      } catch (error) {
        console.log(error)
      }
    },
    async updateTutorial() {
      try {
        const res = await TutorialDataService.update(
          this.currentTutorial.id,
          this.currentTutorial
        )
        console.log(res.data)
        this.message = 'The tutorial was updated successfully!'
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTutorial() {
      try {
        const res = await TutorialDataService.delete(this.currentTutorial.id)
        console.log(res.data)
        this.$router.push({ name: 'tutorials' })
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.message = ''
    this.getTutorial(this.$route.params.id)
  },
}
</script>

<style>
.edit-form {
  min-width: 300px;
  margin: auto;
}
</style>
