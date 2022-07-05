<template>
  <div class="submit-from">
    <div v-if="!submitted">
      <div class="from-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="from-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>
      <div class="from-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'

export default {
  name: 'add-tutorial',
  data() {
    return {
      tutorial: {
        id: null,
        title: '',
        description: '',
        published: false,
      },
      submitted: false,
    }
  },
  methods: {
    async saveTutorial() {
      try {
        const data = {
          title: this.tutorial.title,
          description: this.tutorial.description,
        }
        const res = await TutorialDataService.create(data)
        this.tutorial.id = res.data.id
        console.log(res.data)
        this.submitted = true
      } catch (error) {
        console.log(error)
      }
    },
    newTutorial() {
      this.submitted = false
      this.tutorial = {}
    },
  },
}
</script>

<style>
.submit-form {
  min-width: 300px;
  margin: auto;
}
</style>
