<script setup lang="ts">
import type { Post } from '@/api'

const props = defineProps<{
  post: Post
  content: string | undefined
  title: string | undefined
  changeMode: boolean
  editedId: number | string | undefined | null
}>()

const emit = defineEmits<{
  (e: 'clicked', id: number | string): void
  (e: 'change', post: Post): void
  (e: 'deletePost', id: number | string): void
}>()
</script>

<template>
  <div class="post">
    <div class="post__top">
      <h2>{{ props.post.title }}</h2>
      <div class="post__buttons">
        <button @click="emit('clicked', props.post.id!)" class="post__btn">
          {{ props.post.opened ? 'Close' : 'Open' }}
        </button>
        <button @click="emit('change', props.post)" class="post__btn">
          {{ changeMode ? (editedId === post.id ? 'Cancel' : 'Edit') : 'Edit' }}
        </button>
        <button @click="emit('deletePost', props.post.id!)" class="post__btn">Delete</button>
      </div>
    </div>
    <div class="post__bottom" :class="{ 'post_bottom--opened': props.post.opened }">
      <p>{{ props.post.content }}</p>
    </div>
  </div>
</template>
