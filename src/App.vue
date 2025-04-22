<template>
  <div class="create__post__block">
    <h4>Create post</h4>
    <form action="" class="create__post__form" @submit.prevent="handelSubmit">
      <input @input="checkInputs" v-model="title" type="text" placeholder="Title" />
      <input @input="checkInputs" v-model="content" type="text" placeholder="Content" />
      <button>{{ changeMode ? 'Save' : 'Create' }}</button>
    </form>
  </div>
  <div class="posts__block">
    <PostComp
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :title="title"
      :content="content"
      :changeMode="changeMode"
      :editedId="editedId"
      @clicked="handelClick"
      @change="fillInputEditedPost"
      @deletePost="handelDeletePost"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createPost, deletePost, editPost, getPosts, type Post } from './api'
import PostComp from '@/components/PostComp.vue'

const posts = ref<Post[]>([])
const title = ref<string>()
const content = ref<string>()
const changeMode = ref<boolean>(false)
const editedId = ref<number | string | null>()
onMounted(async () => {
  const data = await getPosts()
  posts.value = data.map((item) => ({
    ...item,
    opened: false,
  }))
})

async function handelSubmit() {
  if (changeMode.value) {
    if (title.value && content.value) {
      await editPost({
        title: title.value,
        content: content.value,
        id: editedId.value!,
      })
    } else {
      console.log(alert('Fill all inputs!'))
      const post = posts.value.find((post) => post.id === editedId.value)
      title.value = post?.title
      content.value = post?.content
    }
  } else {
    if (title.value && content.value) {
      await createPost({
        title: title.value,
        content: content.value,
      })
      title.value = ''
      content.value = ''
    } else {
      console.log(title.value, content.value)
    }
  }
  const data = await getPosts()
  posts.value = data.map((item) => ({
    ...item,
    opened: false,
  }))
}

function handelClick(id: number | string) {
  const post = posts.value.find((p) => p.id === id)
  if (post) post.opened = !post.opened
}

async function handelDeletePost(id: number | string) {
  await deletePost(id)
  const data = await getPosts()
  posts.value = data.map((item) => ({
    ...item,
    opened: false,
  }))
}

async function fillInputEditedPost(post: Post) {
  if (editedId.value === post.id && changeMode.value === true) {
    changeMode.value = false
    title.value = ''
    content.value = ''
    editedId.value = null

    return
  }
  changeMode.value = true
  title.value = post.title
  content.value = post.content
  editedId.value = post.id
  console.log(editedId.value)
}

function checkInputs() {
  if (!title.value && !content.value) {
    changeMode.value = false
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: bisque;
  color: rgb(112, 63, 0);
  font-family: Arial, Helvetica, sans-serif;
}

.posts__block {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.post {
  border: 1px solid rgb(196, 142, 77);
  padding: 10px;
  border-radius: 10px;
}

.post__buttons {
  display: flex;
  justify-content: start;
  gap: 10px;
}

.post__btn {
  padding: 4px;
  border: 1px solid rgb(196, 142, 77);
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.post__btn:hover {
  background-color: rgb(255, 241, 223);
  transition: all 0.3s ease;
}

.post__bottom {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.post_bottom--opened {
  max-height: 300px;
  opacity: 1;
}

.create__post__block {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.create__post__block h4 {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  font-size: 23px;
}

.create__post__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  gap: 10px;
}

.create__post__form input {
  border: 1px solid rgb(196, 142, 77);
  padding: 4px;
  border-radius: 4px;
}

.create__post__form input:focus {
  outline: 0;
}

.create__post__form button {
  border: 1px solid rgb(196, 142, 77);
  width: fit-content;
  padding: 3px;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
.create__post__form button:hover {
  background-color: rgb(255, 241, 223);
  transition: all 0.3s ease;
}
</style>
